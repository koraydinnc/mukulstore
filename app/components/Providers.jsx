"use client";

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export function Providers({ children }) {
  useEffect(() => {
    // Sayfa yüklendiğinde cookie'leri kontrol et
    const cartItems = Cookies.get('cartItems');
    const favorites = Cookies.get('favorites');

    if (!cartItems) {
      Cookies.set('cartItems', '[]');
    }
    if (!favorites) {
      Cookies.set('favorites', '[]');
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
