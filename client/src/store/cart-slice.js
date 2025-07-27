import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/api';

// Initial State
const initialState = {
  items: [],
};

// Thunk to get cart items
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async () => {
    const response = await axiosInstance.get('/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    });
    console.log("Cart items fetched:", response.data);
    return response.data;
  }
);

// Thunk to add item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, thunkAPI) => {
    console.log("Adding product to cart:", product);
    try {
      await axiosInstance.post(
        '/cart/add',
        {
          productId: product.id,
          quantity: product.quantity,
          size: product.size,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return thunkAPI.rejectWithValue(error.message);
    }

    console.log("Product added to cart:", product);
    return product;
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, () => {
        console.log("Fetching cart items...");
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.error("Failed to fetch cart items:", action.error.message);
      })
      .addCase(addToCart.pending, () => {
        console.log("Adding product to cart...");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload.cart;
        const existingProduct = state.items.find(item => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity = product.quantity;
        } else {
          state.items.push(product);
        }

        console.log("Product added to local cart state:", product);
      });
  }
});

export default cartSlice.reducer;
