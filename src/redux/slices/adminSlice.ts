
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AdminState } from '@/types';

// Assume these are in your services folder
import { addDriver, addCustomer, reviewDriver } from '@/services/adminService';

const initialState: AdminState = {
  admins: [],
  loading: false,
  error: null,
};

export const addDriverThunk = createAsyncThunk(
  'admin/addDriver',
  async (driverData: any, { rejectWithValue }) => {
    try {
      const response = await addDriver(driverData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCustomerThunk = createAsyncThunk(
  'admin/addCustomer',
  async (customerData: any, { rejectWithValue }) => {
    try {
      const response = await addCustomer(customerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const reviewDriverThunk = createAsyncThunk(
  'admin/reviewDriver',
  async ({ driverId, review }: { driverId: string; review: any }, { rejectWithValue }) => {
    try {
      const response = await reviewDriver(driverId, review);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDriverThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(reviewDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewDriverThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reviewDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
