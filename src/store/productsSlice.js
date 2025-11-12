import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: 'Smartphone',
              price: 699.99,
              description: 'Latest model with 5G',
              image: 'https://via.placeholder.com/150',
            },
            {
              id: 2,
              title: 'Laptop',
              price: 1299.99,
              description: 'Powerful laptop for professionals',
              image: 'https://via.placeholder.com/150',
            },
            {
              id: 3,
              title: 'Headphones',
              price: 199.99,
              description: 'Noise-cancelling wireless headphones',
              image: 'https://via.placeholder.com/150',
            },
            {
              id: 4,
              title: 'Smart Watch',
              price: 399.99,
              description: 'Track your fitness and stay connected',
              image: 'https://via.placeholder.com/150',
            },
            {
              id: 5,
              title: 'Tablet',
              price: 549.99,
              description: '10-inch display with stylus support',
              image: 'https://via.placeholder.com/150',
            },
          ],
        });
      }, 800);
    });

    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
