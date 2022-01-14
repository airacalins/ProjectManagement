import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IModeOfPayment } from "../../app/models/modeOfPayment";

export interface IModeOfPaymentState {
  modeOfPayments: IModeOfPayment[];
  isFetching: boolean;
  modeOfPayment?: IModeOfPayment;
  isFetchingDetails: boolean;
}

const initialState: IModeOfPaymentState = {
  modeOfPayments: [],
  isFetching: false,
  modeOfPayment: undefined,
  isFetchingDetails: false
}

export const fetchModeOfPaymentsAsync = createAsyncThunk<IModeOfPayment[]>(
  'tenants/fetchModeOfPaymentsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchModeOfPaymentDetailsAsync = createAsyncThunk<IModeOfPayment, string>(
  'announcements/fetchModeOfPaymentDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const modeOfPaymentSlice = createSlice({
  name: 'modeOfPayment',
  initialState,
  reducers: {
  },
  extraReducers: (builder => {
    builder.addCase(fetchModeOfPaymentsAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchModeOfPaymentsAsync.fulfilled, (state, action) => {
      state.modeOfPayments = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchModeOfPaymentsAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    
    builder.addCase(fetchModeOfPaymentDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchModeOfPaymentDetailsAsync.fulfilled, (state, action) => {
      state.modeOfPayment = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchModeOfPaymentDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });
  })
})

export const {  } = modeOfPaymentSlice.actions;