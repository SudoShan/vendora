// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/api';
import axios from 'axios';

const userFromStorage = localStorage.getItem('user');
const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;

const initialState = {
  isAuthenticated: !!initialUser,
  user: initialUser,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, userData);
      const data = response.data;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify({ id: data.id, role: data.role }));
      localStorage.setItem('accessToken', data.accessToken);

      return { id: data.id, role: data.role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try{
      await axiosInstance.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return;
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
