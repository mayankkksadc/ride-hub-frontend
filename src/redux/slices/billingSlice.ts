
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BillingState, Bill } from '@/types';

// Assume these are in your services folder
import { 
  createBill, 
  getBills, 
  updateBill, 
  deleteBill 
} from '@/services/billingService';

const initialState: BillingState = {
  bills: [],
  selectedBill: null,
  loading: false,
  error: null,
};

export const createBillThunk = createAsyncThunk(
  'billing/createBill',
  async (billData: Partial<Bill>, { rejectWithValue }) => {
    try {
      const response = await createBill(billData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBillsThunk = createAsyncThunk(
  'billing/getBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBills();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBillThunk = createAsyncThunk(
  'billing/updateBill',
  async ({ id, billData }: { id: string; billData: Partial<Bill> }, { rejectWithValue }) => {
    try {
      const response = await updateBill(id, billData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBillThunk = createAsyncThunk(
  'billing/deleteBill',
  async (billId: string, { rejectWithValue }) => {
    try {
      await deleteBill(billId);
      return billId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedBill: (state, action) => {
      state.selectedBill = action.payload;
    },
    clearSelectedBill: (state) => {
      state.selectedBill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBillThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bills.push(action.payload);
      })
      .addCase(createBillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBillsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(getBillsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBillThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = state.bills.map(bill => 
          bill.id === action.payload.id ? action.payload : bill
        );
        if (state.selectedBill && state.selectedBill.id === action.payload.id) {
          state.selectedBill = action.payload;
        }
      })
      .addCase(updateBillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBillThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = state.bills.filter(bill => bill.id !== action.payload);
        if (state.selectedBill && state.selectedBill.id === action.payload) {
          state.selectedBill = null;
        }
      })
      .addCase(deleteBillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedBill, clearSelectedBill } = billingSlice.actions;
export default billingSlice.reducer;
