
// Basit in-memory store - gerçek uygulamada Redis veya benzer bir çözüm kullanın
let activeConnections = [];

// Tüm aktif bağlantılara mesaj yayınla
function broadcastToAll(message) {
  const messageStr = JSON.stringify(message);
  
  activeConnections.forEach((connection, index) => {
    try {
      if (connection && connection.write) {
        connection.write(`data: ${messageStr}\n\n`);
      }
    } catch (error) {
      console.log('Connection error, removing from list:', error.message);
      activeConnections.splice(index, 1);
    }
  });
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
      orderId,
      status,
      amount,
      customerInfo,
      items,
      paymentMethod,
      transactionId
    } = req.body;

    // Sipariş durumunu gerçek zamanlı olarak yayınla
    broadcastToAll({
      type: 'order_update',
      data: {
        orderId,
        status,
        amount,
        customerInfo: {
          name: customerInfo?.name || 'Anonim',
          city: customerInfo?.city || 'Bilinmiyor'
        },
        itemCount: items?.length || 0,
        paymentMethod,
        transactionId,
        timestamp: new Date().toISOString()
      }
    });

    // Genel satış istatistiklerini güncelle ve yayınla
    const today = new Date().toISOString().split('T')[0];
    
    // Bu kısmı gerçek veritabanınızla entegre edin
    // Örnek veriler
    const salesStats = {
      today: {
        totalSales: 15420,
        orderCount: 23,
        averageOrder: 670
      },
      thisWeek: {
        totalSales: 89350,
        orderCount: 156,
        averageOrder: 573
      },
      thisMonth: {
        totalSales: 234560,
        orderCount: 432,
        averageOrder: 543
      }
    };

    broadcastToAll({
      type: 'sales_stats_update',
      data: salesStats
    });

    return res.status(200).json({
      success: true,
      message: 'Order update broadcasted successfully'
    });

  } catch (error) {
    console.error('Error broadcasting order update:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
