import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

// Geçici sipariş verilerini tutmak için basit in-memory store
// Üretim ortamında Redis veya database kullanılmalı
const tempOrderStorage = new Map();

// VakıfBank Sanal POS Konfigürasyonu
const VAKIFBANK_CONFIG = {
  MERCHANT_ID: process.env.VAKIFBANK_MERCHANT_ID, // 000000041512518
  TERMINAL_ID: process.env.VAKIFBANK_TERMINAL_ID,  // V2263599
  MERCHANT_NAME: process.env.VAKIFBANK_MERCHANT_NAME, // SÜLEYMAN MUKUL
  MERCHANT_PASSWORD: process.env.VAKIFBANK_MERCHANT_PASSWORD, // Es36RtPn
  SECURE_KEY: process.env.VAKIFBANK_SECURE_KEY, // Es36RtPn
  API_URL: process.env.VAKIFBANK_TEST_MODE === 'true' 
    ? 'https://onlineodemetest.vakifbank.com.tr:4443/VposService/v3/Vposreq.aspx'
    : 'https://onlineodeme.vakifbank.com.tr:4443/VposService/v3/Vposreq.aspx',
  THREEDS_URL: process.env.VAKIFBANK_TEST_MODE === 'true'
    ? 'https://3dsecuretest.vakifbank.com.tr:4443/MPIAPI/MPI_Enrollment.aspx'
    : 'https://3dsecure.vakifbank.com.tr:4443/MPIAPI/MPI_Enrollment.aspx',
  SUCCESS_URL: process.env.NEXT_PUBLIC_BASE_URL + '/api/user/payment/vakifbank-callback',
  ERROR_URL: process.env.NEXT_PUBLIC_BASE_URL + '/api/user/payment/vakifbank-callback',
  TEST_MODE: process.env.VAKIFBANK_TEST_MODE === 'true'
};

// VakıfBank özel hash algoritması
function generateVakifBankHash(data) {
  // VakıfBank hash formatı: MerchantId + TerminalId + CardNumber + Amount + CurrencyCode + TransactionType + InstallmentCount + TransactionId + SecureKey
  const hashData = [
    data.MerchantId || '',
    data.TerminalId || '',
    data.Pan || '',
    data.Amount || '',
    data.CurrencyCode || '',
    data.TransactionType || '',
    data.InstallmentCount || '',
    data.TransactionId || '',
    VAKIFBANK_CONFIG.SECURE_KEY || ''
  ].join('');

  return crypto.createHash('sha1').update(hashData, 'utf8').digest('hex').toUpperCase();
}

// Kart numarası validation (Luhn algoritması)
function validateCardNumber(cardNumber) {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }
  
  let sum = 0;
  let alternate = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let n = parseInt(cleanNumber.charAt(i), 10);
    
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    sum += n;
    alternate = !alternate;
  }
  
  return (sum % 10) === 0;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed' 
    });
  }

  try {
    const {
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
      cvv,
      amount,
      orderId,
      customerInfo,
      installmentCount = 0,
      use3DSecure = true,
      cartItems,
      shippingAddress
    } = req.body;

    // Validasyonlar
    if (!cardNumber || !cardHolderName || !expiryMonth || !expiryYear || !cvv || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Eksik ödeme bilgileri'
      });
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!validateCardNumber(cleanCardNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz kart numarası'
      });
    }

    // Transaction ID oluştur
    const transactionId = `TX${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const finalOrderId = orderId || `ORDER_${Date.now()}`;
    
    // Sipariş bilgilerini geçici olarak sakla
    tempOrderStorage.set(finalOrderId, {
      cartItems: cartItems || [],
      shippingAddress: shippingAddress || {},
      totalAmount: amount,
      customerInfo: customerInfo || {},
      timestamp: Date.now()
    });
    
    console.log(`Temporary order data stored for order: ${finalOrderId}`);
    
    // VakıfBank için gerekli parametreler
    const paymentData = {
      MerchantId: VAKIFBANK_CONFIG.MERCHANT_ID,
      TerminalId: VAKIFBANK_CONFIG.TERMINAL_ID,
      TransactionType: 'Sale',
      Amount: Math.round(amount * 100).toString(), // Kuruş cinsinden string
      CurrencyCode: '949', // TRY
      TransactionId: transactionId,
      OrderId: finalOrderId,
      InstallmentCount: installmentCount.toString(),
      
      // Kart bilgileri
      Pan: cleanCardNumber,
      ExpiryDate: `${expiryMonth.padStart(2, '0')}${expiryYear.slice(-2)}`, // MMYY format
      Cvv: cvv,
      
      // 3D Secure için gerekli alanlar
      ...(use3DSecure && {
        ThreeDSecure: 'true',
        SuccessUrl: VAKIFBANK_CONFIG.SUCCESS_URL,
        ErrorUrl: VAKIFBANK_CONFIG.ERROR_URL,
        // İsteğe bağlı müşteri bilgileri
        BillToName: cardHolderName,
        BillToCompany: '',
        BillToStreet1: customerInfo?.address || '',
        BillToCity: customerInfo?.city || '',
        BillToPostalCode: customerInfo?.postalCode || '',
        BillToCountry: 'TR',
        Email: customerInfo?.email || '',
        
        // Ürün bilgileri (opsiyonel)
        CartType: '0', // Sanal ürün
        CartDescription: `Mukul Store Sipariş - ${finalOrderId}`,
      })
    };

    // Hash oluştur
    paymentData.Hash = generateVakifBankHash(paymentData);

    console.log('VakıfBank Payment Data:', paymentData);

    if (use3DSecure) {
      // Test mode'da direkt başarılı sonuç döndür
      if (VAKIFBANK_CONFIG.TEST_MODE) {
        console.log('TEST MODE: Simulating 3D Secure success');
        
        return res.status(200).json({
          success: true,
          requires3D: false, // Test için 3D Secure'u atla
          message: 'Test mode: Ödeme başarıyla tamamlandı',
          transactionId: transactionId,
          authCode: 'TEST_AUTH_' + Math.random().toString(36).substr(2, 9),
          amount: amount,
          timestamp: new Date().toISOString()
        });
      }
      
      // Production'da 3D Secure için HTML form döndür
      const htmlForm = generateVakifBank3DForm(paymentData);
      
      return res.status(200).json({
        success: true,
        requires3D: true,
        redirectUrl: htmlForm,
        transactionId: transactionId,
        orderId: paymentData.OrderId
      });
    } else {
      // Direkt ödeme için API çağrısı
      const response = await fetch(VAKIFBANK_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(paymentData).toString()
      });

      const result = await response.text();
      
      // VakıfBank yanıtını parse et
      const parsedResult = parseVakifBankResponse(result);
      
      if (parsedResult.success) {
        return res.status(200).json({
          success: true,
          message: 'Ödeme başarıyla tamamlandı',
          transactionId: transactionId,
          authCode: parsedResult.authCode,
          amount: amount,
          timestamp: new Date().toISOString()
        });
      } else {
        return res.status(400).json({
          success: false,
          message: parsedResult.message || 'Ödeme işlemi başarısız',
          errorCode: parsedResult.errorCode
        });
      }
    }

  } catch (error) {
    console.error('VakıfBank Payment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ödeme işlemi sırasında hata oluştu',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// 3D Secure için HTML form oluştur
function generateVakifBank3DForm(paymentData) {
  const hiddenInputs = Object.entries(paymentData)
    .map(([key, value]) => `<input type="hidden" name="${key}" value="${value || ''}">`)
    .join('\n        ');

  return `<!DOCTYPE html>
<html>
<head>
    <title>VakıfBank 3D Secure</title>
    <meta charset="utf-8">
</head>
<body onload="document.forms[0].submit();">
    <form method="post" action="${VAKIFBANK_CONFIG.API_URL}">
        ${hiddenInputs}
        <noscript>
            <input type="submit" value="Devam Et">
        </noscript>
    </form>
    <div style="text-align: center; margin-top: 50px;">
        <p>Güvenli ödeme sayfasına yönlendiriliyorsunuz...</p>
        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
    </div>
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</body>
</html>`;
}

// VakıfBank yanıtını parse et
function parseVakifBankResponse(responseText) {
  try {
    // VakıfBank genellikle XML veya key-value formatında yanıt döner
    const lines = responseText.split('\n');
    const result = {};
    
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    });
    
    return {
      success: result.ResponseCode === '00' || result.ResponseCode === '0000',
      message: result.ResponseMessage || result.Message,
      errorCode: result.ResponseCode,
      authCode: result.AuthCode,
      transactionId: result.TransactionId
    };
  } catch (error) {
    return {
      success: false,
      message: 'Yanıt formatı okunamadı',
      errorCode: 'PARSE_ERROR'
    };
  }
}

// Export temporary storage for callback access
export { tempOrderStorage };
