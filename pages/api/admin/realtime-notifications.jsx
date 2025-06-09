import { NextApiRequest, NextApiResponse } from 'next';

// SSE bağlantılarını saklamak için
const connections = new Map();

export default function handler(req, res) {
  if (req.method === 'GET') {
    // SSE bağlantısı kur
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    const clientId = Date.now().toString();
    connections.set(clientId, res);

    // İlk bağlantı mesajı
    res.write(`data: ${JSON.stringify({ type: 'connected', clientId })}\n\n`);

    // Bağlantı koptuğunda temizle
    req.on('close', () => {
      connections.delete(clientId);
    });

    // Heartbeat - her 30 saniyede bir ping gönder
    const heartbeat = setInterval(() => {
      if (connections.has(clientId)) {
        res.write(`data: ${JSON.stringify({ type: 'ping', timestamp: Date.now() })}\n\n`);
      } else {
        clearInterval(heartbeat);
      }
    }, 30000);

  } else if (req.method === 'POST') {
    // Yeni satış bildirimi gönder
    const { type, data } = req.body;

    // Tüm bağlı istemcilere bildirim gönder
    connections.forEach((connection, clientId) => {
      try {
        connection.write(`data: ${JSON.stringify({ type, data, timestamp: Date.now() })}\n\n`);
      } catch (error) {
        console.error(`Client ${clientId} connection error:`, error);
        connections.delete(clientId);
      }
    });

    res.status(200).json({ success: true, sentTo: connections.size });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
