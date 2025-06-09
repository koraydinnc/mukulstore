import { NextApiRequest, NextApiResponse } from 'next';

// Test card numbers
const TEST_CARDS = {
  SUCCESS: '4111111111111111', // Always succeeds
  INSUFFICIENT_FUNDS: '4000000000000002', // Always fails with insufficient funds
  PROCESSING_ERROR: '4000000000000119', // Always fails with processing error
};

export default function handler(req, res) {
  // Only allow POST method
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
      expiryDate,
      cvv,
      amount,
      currency = 'TRY',
      description,
    } = req.body;

    // Basic validation
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Eksik bilgiler. Kart numarası, sahibi, son kullanma tarihi, CVV ve tutar gereklidir.'
      });
    }

    // Simulate processing delay
    setTimeout(() => {
      // Test card validation logic
      if (cardNumber === TEST_CARDS.SUCCESS) {
        // Successful payment
        return res.status(200).json({
          success: true,
          message: 'Ödeme başarıyla gerçekleşti',
          data: {
            transactionId: `TR-${Date.now()}`,
            amount,
            currency,
            paymentDate: new Date().toISOString(),
            status: 'COMPLETED',
            cardInfo: {
              last4: cardNumber.slice(-4),
              cardType: 'VISA',
              expiryDate,
            }
          }
        });
      } else if (cardNumber === TEST_CARDS.INSUFFICIENT_FUNDS) {
        // Insufficient funds error
        return res.status(400).json({
          success: false,
          message: 'Yetersiz bakiye',
          errorCode: 'INSUFFICIENT_FUNDS',
          transactionId: `TR-${Date.now()}`
        });
      } else if (cardNumber === TEST_CARDS.PROCESSING_ERROR) {
        // Processing error
        return res.status(500).json({
          success: false,
          message: 'İşlem sırasında hata oluştu',
          errorCode: 'PROCESSING_ERROR',
          transactionId: `TR-${Date.now()}`
        });
      } else {
        // Generic declined
        return res.status(400).json({
          success: false,
          message: 'Kart reddedildi',
          errorCode: 'CARD_DECLINED',
          transactionId: `TR-${Date.now()}`
        });
      }
    }, 1000); // 1 second delay to simulate processing

  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}