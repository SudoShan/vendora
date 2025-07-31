import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/api';

// Initial State
const initialState = {
    orders: [],
    loading: false,
    error: null,
};

// Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/orders/user-orders', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
                },
            });
            return response.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to add a new order
export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/orders/add', orderData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});



export default orderSlice.reducer;