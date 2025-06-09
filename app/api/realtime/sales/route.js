import { NextRequest, NextResponse } from 'next/server';

// Aktif bağlantıları tutmak için
const connections = new Map();

export async function GET(request) {
  // Server-Sent Events için uygun headers
  const responseHeaders = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });

  // Readable stream oluştur
  const readable = new ReadableStream({
    start(controller) {
      const clientId = Date.now().toString();
      
      // Bağlantıyı kaydet
      connections.set(clientId, {
        controller,
        lastPing: Date.now()
      });

      // İlk bağlantı mesajı
      controller.enqueue(`data: ${JSON.stringify({
        type: 'connected',
        clientId,
        timestamp: new Date().toISOString()
      })}\n\n`);

      // Ping interval - bağlantıyı canlı tut
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({
            type: 'ping',
            timestamp: new Date().toISOString()
          })}\n\n`);
          
          connections.get(clientId).lastPing = Date.now();
        } catch (error) {
          console.log('Client disconnected:', clientId);
          clearInterval(pingInterval);
          connections.delete(clientId);
        }
      }, 30000); // 30 saniyede bir ping

      // Cleanup function
      request.signal?.addEventListener('abort', () => {
        clearInterval(pingInterval);
        connections.delete(clientId);
        try {
          controller.close();
        } catch (error) {
          console.log('Error closing controller:', error);
        }
      });
    }
  });

  return new NextResponse(readable, {
    headers: responseHeaders
  });
}

// Tüm bağlı istemcilere mesaj gönder
export function broadcastToAll(data) {
  const message = `data: ${JSON.stringify({
    ...data,
    timestamp: new Date().toISOString()
  })}\n\n`;

  connections.forEach((connection, clientId) => {
    try {
      connection.controller.enqueue(message);
    } catch (error) {
      console.log('Error sending to client:', clientId, error);
      connections.delete(clientId);
    }
  });
}

// Belirli bir istemciye mesaj gönder
export function sendToClient(clientId, data) {
  const connection = connections.get(clientId);
  if (connection) {
    try {
      const message = `data: ${JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })}\n\n`;
      
      connection.controller.enqueue(message);
    } catch (error) {
      console.log('Error sending to specific client:', clientId, error);
      connections.delete(clientId);
    }
  }
}
