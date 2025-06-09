'use client'
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function VakifBankTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '4111111111111111', // Test kartı
    cardHolder: 'TEST KART',
    expiryMonth: '12',
    expiryYear: '25',
    cvv: '123',
    amount: '100' // 100 TL test
  });

  const handleTest = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/user/payment/vakifbank-payment-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          orderId: `TEST_ORDER_${Date.now()}`,
          customerInfo: {
            email: 'test@example.com',
            phone: '05551234567'
          },
          use3DSecure: true
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success && data.requires3D) {
        // 3D Secure sayfasını aç
        const newWindow = window.open('', '_blank', 'width=600,height=700');
        newWindow.document.write(atob(data.redirectUrl.split(',')[1]));
      }

    } catch (error) {
      setResult({
        success: false,
        message: 'Test sırasında hata: ' + error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            VakıfBank POS Test Sayfası
          </h1>

          <div className="space-y-4">
            <div>
              <Label>Kart Numarası</Label>
              <Input
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                placeholder="Kart numarası"
              />
            </div>

            <div>
              <Label>Kart Sahibi</Label>
              <Input
                value={formData.cardHolder}
                onChange={(e) => setFormData({...formData, cardHolder: e.target.value})}
                placeholder="Ad Soyad"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Ay</Label>
                <Input
                  value={formData.expiryMonth}
                  onChange={(e) => setFormData({...formData, expiryMonth: e.target.value})}
                  placeholder="MM"
                  maxLength={2}
                />
              </div>
              <div>
                <Label>Yıl</Label>
                <Input
                  value={formData.expiryYear}
                  onChange={(e) => setFormData({...formData, expiryYear: e.target.value})}
                  placeholder="YY"
                  maxLength={2}
                />
              </div>
              <div>
                <Label>CVV</Label>
                <Input
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>

            <div>
              <Label>Tutar (TL)</Label>
              <Input
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="100"
                type="number"
              />
            </div>

            <Button 
              onClick={handleTest} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Test Ediliyor...' : 'VakıfBank POS Test Et'}
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Test Sonucu:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Test Bilgileri:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Merchant ID:</strong> {process.env.NEXT_PUBLIC_VAKIFBANK_MERCHANT_ID || '000000041512518'}</p>
              <p><strong>Terminal ID:</strong> V2263599</p>
              <p><strong>Test Modu:</strong> Aktif</p>
              <p><strong>Test Kart:</strong> 4111111111111111 (Visa)</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
