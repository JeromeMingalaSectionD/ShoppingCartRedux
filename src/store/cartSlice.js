import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, it) => sum + it.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => {
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    return total.toFixed(2);
  }
);

export default cartSlice.reducer;
