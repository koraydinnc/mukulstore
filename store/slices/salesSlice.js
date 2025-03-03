import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],
  totalRevenue: 0,
  monthlySales: {},
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSale: (state, action) => {
      state.sales.push(action.payload);
      state.totalRevenue += action.payload.totalAmount;
      
      // Aylık satış takibi
      const date = new Date(action.payload.date);
      const monthKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
      state.monthlySales[monthKey] = (state.monthlySales[monthKey] || 0) + action.payload.totalAmount;
    },
    setSales: (state, action) => {
      state.sales = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addSale, setSales, setLoading, setError } = salesSlice.actions;
export default salesSlice.reducer;
