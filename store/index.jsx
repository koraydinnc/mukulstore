import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';
import adminSlice from './slices/adminSlice';
import { categoryApi } from './services/admin/categoryApi';
import { productApi } from './services/admin/productApi';
import { authApi } from './services/admin/authApi';
import { productUserApi } from './services/user/productUserApi';
import { categoryUserApi } from './services/user/categoryUserApi';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorites: favoritesSlice,
    admin: adminSlice,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productUserApi.reducerPath]: productUserApi.reducer,
    [categoryUserApi.reducerPath]: categoryUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware,
      authApi.middleware,
      productUserApi.middleware,
      categoryUserApi.middleware
    ),
});

export default store;
