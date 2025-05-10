
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RideState, Ride } from '@/types';

// Assume these are in your services folder
import { 
  requestRide, 
  getRides, 
  getRideById, 
  updateRide, 
  cancelRide,
  completeRide,
  assignDriver
} from '@/services/rideService';

const initialState: RideState = {
  rides: [],
  selectedRide: null,
  loading: false,
  error: null,
};

export const requestRideThunk = createAsyncThunk(
  'ride/requestRide',
  async (rideData: Partial<Ride>, { rejectWithValue }) => {
    try {
      const response = await requestRide(rideData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRidesThunk = createAsyncThunk(
  'ride/getRides',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRides();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRideByIdThunk = createAsyncThunk(
  'ride/getRideById',
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await getRideById(rideId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRideThunk = createAsyncThunk(
  'ride/updateRide',
  async ({ id, rideData }: { id: string; rideData: Partial<Ride> }, { rejectWithValue }) => {
    try {
      const response = await updateRide(id, rideData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelRideThunk = createAsyncThunk(
  'ride/cancelRide',
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await cancelRide(rideId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeRideThunk = createAsyncThunk(
  'ride/completeRide',
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await completeRide(rideId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const assignDriverThunk = createAsyncThunk(
  'ride/assignDriver',
  async ({ rideId, driverId }: { rideId: string; driverId: string }, { rejectWithValue }) => {
    try {
      const response = await assignDriver(rideId, driverId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedRide: (state) => {
      state.selectedRide = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestRideThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRideThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides.push(action.payload);
        state.selectedRide = action.payload;
      })
      .addCase(requestRideThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getRidesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRidesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload;
      })
      .addCase(getRidesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getRideByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRideByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRide = action.payload;
      })
      .addCase(getRideByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRideThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRideThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = state.rides.map(ride => 
          ride.id === action.payload.id ? action.payload : ride
        );
        if (state.selectedRide && state.selectedRide.id === action.payload.id) {
          state.selectedRide = action.payload;
        }
      })
      .addCase(updateRideThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelRideThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelRideThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = state.rides.map(ride => 
          ride.id === action.payload.id ? action.payload : ride
        );
        if (state.selectedRide && state.selectedRide.id === action.payload.id) {
          state.selectedRide = action.payload;
        }
      })
      .addCase(cancelRideThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeRideThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeRideThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = state.rides.map(ride => 
          ride.id === action.payload.id ? action.payload : ride
        );
        if (state.selectedRide && state.selectedRide.id === action.payload.id) {
          state.selectedRide = action.payload;
        }
      })
      .addCase(completeRideThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(assignDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = state.rides.map(ride => 
          ride.id === action.payload.id ? action.payload : ride
        );
        if (state.selectedRide && state.selectedRide.id === action.payload.id) {
          state.selectedRide = action.payload;
        }
      })
      .addCase(assignDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedRide } = rideSlice.actions;
export default rideSlice.reducer;
