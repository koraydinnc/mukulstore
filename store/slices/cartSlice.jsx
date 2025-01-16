import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
  totalAmount: Cookies.get('cartTotal') ? Number(Cookies.get('cartTotal')) : 0,
  totalQuantity: Cookies.get('cartQuantity') ? Number(Cookies.get('cartQuantity')) : 0,
  selectedSize: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize } = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.size === selectedSize
      );

      if (!existingItem) {
        state.items.push({
          ...product,
          size: selectedSize,
          quantity: 1,
          totalPrice: product.discountedPrice || product.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = (product.discountedPrice || product.price) * existingItem.quantity;
      }

      state.totalQuantity++;
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.discountedPrice || item.price) * item.quantity,
        0
      );

      // Cookie güncelleme
      Cookies.set('cartItems', JSON.stringify(state.items));
      Cookies.set('cartTotal', state.totalAmount.toString());
      Cookies.set('cartQuantity', state.totalQuantity.toString());
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => !(item.id === id && item.size === size));
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = (existingItem.discountedPrice || existingItem.price) * existingItem.quantity;
      }

      state.totalQuantity--;
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.discountedPrice || item.price) * item.quantity,
        0
      );

      // Cookie güncelleme
      Cookies.set('cartItems', JSON.stringify(state.items));
      Cookies.set('cartTotal', state.totalAmount.toString());
      Cookies.set('cartQuantity', state.totalQuantity.toString());
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      const quantityDiff = quantity - item.quantity;
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;

      state.totalQuantity += quantityDiff;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Cookileri temizle
      Cookies.remove('cartItems');
      Cookies.remove('cartTotal');
      Cookies.remove('cartQuantity');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;