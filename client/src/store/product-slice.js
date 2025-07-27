import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/api';

// Thunk: Fetch products by filter
export const fetchProductsbyFilter = createAsyncThunk(
  'product/fetchProductbyFilter',
  async (_, thunkAPI) => {
    
    const { category, minPrice, maxPrice, brands } = thunkAPI.getState().products.filter;
    console.log('Fetching products with filters:', { category, minPrice, maxPrice, brands });
    const params = new URLSearchParams();

    if (category) {
      if (Array.isArray(category)) {
        params.set('category', category.join(','));
      } else {
        params.set('category', category);
      }
    }

    if (brands) {
      if (Array.isArray(brands)) {
        params.set('brand', brands.join(','));
      } else {
        params.set('brand', brands);
      }
    }

    if (minPrice !== undefined) params.set('minPrice', String(minPrice));
    if (maxPrice !== undefined) params.set('maxPrice', String(maxPrice));

    const queryString = params.toString();
    const response = await axiosInstance.get(`products?${queryString}`);
    return response.data;
  }
);

// Thunk: Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  }
);

// Initial state
const initialState = {
  products: [],
  isLoading: false,
  error: null,
  filter: {
    category: [],
    minPrice: undefined,
    maxPrice: undefined,
    brands: []
  }
};

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    clearFilter(state) {
      state.filter = {
        category: [],
        minPrice: undefined,
        maxPrice: undefined,
        brands: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsbyFilter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsbyFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsbyFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const productIndex = state.products.findIndex(p => p._id === action.payload._id);
        if (productIndex !== -1) {
          state.products[productIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch product by ID';
      });
  }
});

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
