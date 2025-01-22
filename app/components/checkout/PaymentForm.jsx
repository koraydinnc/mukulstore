'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSale } from '@/services/firebase';
import { clearCart } from '@/store/slices/cartSlice';
import { addSale } from '@/store/slices/salesSlice';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const saleData = {
        userId: user.uid,
        items: cartItems.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          size: item.size
        })),
        totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        customerInfo: {
          name: user.displayName,
          email: user.email,
        },
        status: 'completed',
        paymentMethod: 'credit_card',
      };

      const saleId = await createSale(saleData);
      dispatch(addSale({ ...saleData, id: saleId }));
      dispatch(clearCart());
      
      // Başarılı ödeme bildirimi
      notification.success({
        message: 'Ödeme Başarılı',
        description: 'Siparişiniz başarıyla oluşturuldu.',
      });

    } catch (error) {
      notification.error({
        message: 'Ödeme Hatası',
        description: 'İşlem sırasında bir hata oluştu.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      {/* Kredi kartı form alanları */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
          transition duration-300 disabled:opacity-50"
      >
        {loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
      </button>
    </form>
  );
};

export default PaymentForm;
