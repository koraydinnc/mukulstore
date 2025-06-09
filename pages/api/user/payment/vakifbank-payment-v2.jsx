import { NextApiRequest, NextApiResponse } from 'next';

// VakıfBank Sanal POS Konfigürasyonu
const VAKIFBANK_CONFIG = {
  MERCHANT_ID: process.env.VAKIFBANK_MERCHANT_ID, // 000000041512518
  TERMINAL_ID: process.env.VAKIFBANK_TERMINAL_ID,  // V2263599
  API_URL: process.env.VAKIFBANK_TEST_MODE === 'true' 
    ? 'https://onlineodemetest.vakifbank.com.tr/VirtualPOS.Gateway/Home'
    : 'https://boa.vakifbank.com.tr/VirtualPOS.Gateway/Home',
  SUCCESS_URL: process.env.NEXT_PUBLIC_BASE_URL + '/api/user/payment/vakifbank-callback',
  ERROR_URL: process.env.NEXT_PUBLIC_BASE_URL + '/api/user/payment/vakifbank-callback',
};

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
      use3DSecure = true
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
    
    // VakıfBank için gerekli parametreler (Secure Key olmadan)
    const paymentData = {
      MerchantId: VAKIFBANK_CONFIG.MERCHANT_ID,
      TerminalId: VAKIFBANK_CONFIG.TERMINAL_ID,
      TransactionType: 'Sale',
      Amount: Math.round(amount * 100).toString(), // Kuruş cinsinden string
      CurrencyCode: '949', // TRY
      TransactionId: transactionId,
      OrderId: orderId || `ORDER_${Date.now()}`,
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
        CartDescription: `Mukul Store Sipariş - ${orderId}`,
      })
    };

    console.log('VakıfBank Payment Data:', paymentData);

    if (use3DSecure) {
      // 3D Secure için HTML form döndür
      const htmlForm = generateVakifBank3DForm(paymentData);
      
      return res.status(200).json({
        success: true,
        requires3D: true,
        redirectUrl: 'data:text/html;base64,' + Buffer.from(htmlForm).toString('base64'),
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
  return `
<!DOCTYPE html>
<html>
<head>
    <title>VakıfBank 3D Secure</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .logo {
            width: 120px;
            height: 60px;
            background: #e74c3c;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            font-size: 16px;
        }
        .title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .subtitle {
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #e74c3c;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .security-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 12px;
            color: #6c757d;
        }
        .btn {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
    </style>
</head>
<body onload="document.forms[0].submit();">
    <div class="container">
        <div class="logo">VakıfBank</div>
        <h2 class="title">Güvenli Ödeme</h2>
        <p class="subtitle">3D Secure doğrulama sayfasına yönlendiriliyorsunuz...</p>
        
        <form method="post" action="${VAKIFBANK_CONFIG.API_URL}">
            ${Object.entries(paymentData).map(([key, value]) => 
              `<input type="hidden" name="${key}" value="${value}">`
            ).join('\n')}
            <noscript>
                <input type="submit" value="Devam Et" class="btn">
            </noscript>
        </form>
        
        <div class="spinner"></div>
        
        <div class="security-info">
            <strong>🔒 Güvenlik Bilgisi</strong><br>
            Bu işlem SSL sertifikası ile korunmaktadır.<br>
            Kart bilgileriniz güvenle şifrelenmektedir.
        </div>
    </div>
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
