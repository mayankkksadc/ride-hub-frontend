
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import customerReducer from './slices/customerSlice';
import driverReducer from './slices/driverSlice';
import rideReducer from './slices/rideSlice';
import billingReducer from './slices/billingSlice';
import fareReducer from './slices/fareSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    customer: customerReducer,
    driver: driverReducer,
    ride: rideReducer,
    billing: billingReducer,
    fare: fareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
