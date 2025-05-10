
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerState, Customer } from '@/types';

// Assume these are in your services folder
import { 
  registerCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer 
} from '@/services/customerService';

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

export const registerCustomerThunk = createAsyncThunk(
  'customer/register',
  async (customerData: Partial<Customer>, { rejectWithValue }) => {
    try {
      const response = await registerCustomer(customerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCustomersThunk = createAsyncThunk(
  'customer/getCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCustomers();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCustomerByIdThunk = createAsyncThunk(
  'customer/getCustomerById',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await getCustomerById(customerId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCustomerThunk = createAsyncThunk(
  'customer/updateCustomer',
  async ({ id, customerData }: { id: string; customerData: Partial<Customer> }, { rejectWithValue }) => {
    try {
      const response = await updateCustomer(id, customerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCustomerThunk = createAsyncThunk(
  'customer/deleteCustomer',
  async (customerId: string, { rejectWithValue }) => {
    try {
      await deleteCustomer(customerId);
      return customerId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(registerCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCustomersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCustomerByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(getCustomerByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map(customer => 
          customer.id === action.payload.id ? action.payload : customer
        );
        if (state.selectedCustomer && state.selectedCustomer.id === action.payload.id) {
          state.selectedCustomer = action.payload;
        }
      })
      .addCase(updateCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
        if (state.selectedCustomer && state.selectedCustomer.id === action.payload) {
          state.selectedCustomer = null;
        }
      })
      .addCase(deleteCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
