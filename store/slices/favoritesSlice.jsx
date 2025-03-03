import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  items: Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push(newItem);
        // Cookie güncelleme
        Cookies.set('favorites', JSON.stringify(state.items));
      }
    },
    
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Cookie güncelleme
      Cookies.set('favorites', JSON.stringify(state.items));
    },
    
    clearFavorites: (state) => {
      state.items = [];
      // Cookie temizleme
      Cookies.remove('favorites');
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;