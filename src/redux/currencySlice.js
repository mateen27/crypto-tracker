import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: 'INR',
    symbol: '₹',
  },
  reducers: {
    setCurrency: (state, action) => {
      const newCurrency = action.payload;
      state.currency = newCurrency;
      state.symbol = newCurrency === 'INR' ? '₹' : '$';
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
