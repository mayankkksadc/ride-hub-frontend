
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DriverState, Driver } from '@/types';

// Assume these are in your services folder
import { 
  registerDriver, 
  getDrivers, 
  getDriverById, 
  updateDriver, 
  deleteDriver,
  updateDriverLocation,
  updateDriverStatus
} from '@/services/driverService';

const initialState: DriverState = {
  drivers: [],
  selectedDriver: null,
  loading: false,
  error: null,
};

export const registerDriverThunk = createAsyncThunk(
  'driver/register',
  async (driverData: Partial<Driver>, { rejectWithValue }) => {
    try {
      const response = await registerDriver(driverData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDriversThunk = createAsyncThunk(
  'driver/getDrivers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDrivers();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDriverByIdThunk = createAsyncThunk(
  'driver/getDriverById',
  async (driverId: string, { rejectWithValue }) => {
    try {
      const response = await getDriverById(driverId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDriverThunk = createAsyncThunk(
  'driver/updateDriver',
  async ({ id, driverData }: { id: string; driverData: Partial<Driver> }, { rejectWithValue }) => {
    try {
      const response = await updateDriver(id, driverData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDriverThunk = createAsyncThunk(
  'driver/deleteDriver',
  async (driverId: string, { rejectWithValue }) => {
    try {
      await deleteDriver(driverId);
      return driverId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDriverLocationThunk = createAsyncThunk(
  'driver/updateLocation',
  async ({ id, location }: { id: string; location: { lat: number; lng: number } }, { rejectWithValue }) => {
    try {
      const response = await updateDriverLocation(id, location);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDriverStatusThunk = createAsyncThunk(
  'driver/updateStatus',
  async ({ id, status }: { id: string; status: 'available' | 'busy' | 'offline' }, { rejectWithValue }) => {
    try {
      const response = await updateDriverStatus(id, status);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedDriver: (state) => {
      state.selectedDriver = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers.push(action.payload);
      })
      .addCase(registerDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDriversThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriversThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(getDriversThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDriverByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDriver = action.payload;
      })
      .addCase(getDriverByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.map(driver => 
          driver.id === action.payload.id ? action.payload : driver
        );
        if (state.selectedDriver && state.selectedDriver.id === action.payload.id) {
          state.selectedDriver = action.payload;
        }
      })
      .addCase(updateDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.filter(driver => driver.id !== action.payload);
        if (state.selectedDriver && state.selectedDriver.id === action.payload) {
          state.selectedDriver = null;
        }
      })
      .addCase(deleteDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDriverLocationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverLocationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.map(driver => 
          driver.id === action.payload.id ? action.payload : driver
        );
        if (state.selectedDriver && state.selectedDriver.id === action.payload.id) {
          state.selectedDriver = action.payload;
        }
      })
      .addCase(updateDriverLocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDriverStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.map(driver => 
          driver.id === action.payload.id ? action.payload : driver
        );
        if (state.selectedDriver && state.selectedDriver.id === action.payload.id) {
          state.selectedDriver = action.payload;
        }
      })
      .addCase(updateDriverStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedDriver } = driverSlice.actions;
export default driverSlice.reducer;
