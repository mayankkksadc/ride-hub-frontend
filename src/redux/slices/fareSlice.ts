
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FareState, Fare, FareBreakdown } from '@/types';

// Assume these are in your services folder
import { 
  calculateFare, 
  getFareBreakdown,
  setBaseRate 
} from '@/services/fareService';

const initialState: FareState = {
  fareConfig: {
    baseRate: 2.5,
    perMileRate: 1.5,
    perMinuteRate: 0.3,
    bookingFee: 1.0
  },
  fareBreakdown: null,
  loading: false,
  error: null,
};

export const calculateFareThunk = createAsyncThunk(
  'fare/calculateFare',
  async ({ distance, duration }: { distance: number; duration: number }, { rejectWithValue }) => {
    try {
      const response = await calculateFare(distance, duration);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFareBreakdownThunk = createAsyncThunk(
  'fare/getFareBreakdown',
  async ({ distance, duration }: { distance: number; duration: number }, { rejectWithValue }) => {
    try {
      const response = await getFareBreakdown(distance, duration);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setBaseRateThunk = createAsyncThunk(
  'fare/setBaseRate',
  async ({ 
    baseRate, 
    perMileRate, 
    perMinuteRate,
    bookingFee 
  }: Fare, { rejectWithValue }) => {
    try {
      const response = await setBaseRate({ baseRate, perMileRate, perMinuteRate, bookingFee });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const fareSlice = createSlice({
  name: 'fare',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearFareBreakdown: (state) => {
      state.fareBreakdown = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateFareThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateFareThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the response is just the total fare
        if (state.fareBreakdown) {
          state.fareBreakdown.total = action.payload;
        }
      })
      .addCase(calculateFareThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFareBreakdownThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFareBreakdownThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fareBreakdown = action.payload;
      })
      .addCase(getFareBreakdownThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setBaseRateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setBaseRateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fareConfig = action.payload;
      })
      .addCase(setBaseRateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearFareBreakdown } = fareSlice.actions;
export default fareSlice.reducer;
