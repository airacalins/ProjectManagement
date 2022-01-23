import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IModeOfPayment } from "../../app/models/modeOfPayment";

export interface IModeOfPaymentState {
  modeOfPayments: IModeOfPayment[];
  modeOfPayment?: IModeOfPayment;
  isFetching: boolean;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: IModeOfPaymentState = {
  modeOfPayments: [],
  isFetching: false,
  modeOfPayment: undefined,
  isFetchingDetails: false,
  isSaving: false
}

export const fetchModeOfPaymentsAsync = createAsyncThunk<IModeOfPayment[]>(
  'modeOfPayments/fetchModeOfPaymentsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchModeOfPaymentDetailsAsync = createAsyncThunk<IModeOfPayment, string>(
  'modeOfPayments/fetchModeOfPaymentDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const createModeOfPaymentAsync = createAsyncThunk<IModeOfPayment, IModeOfPayment>(
  'modeOfPayments/createModeOfPaymentAsync',
  async (modeOfPayment, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.create(modeOfPayment);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const updateModeOfPaymentDetailsAsync = createAsyncThunk<IModeOfPayment, IModeOfPayment>(
  'modeOfPayments/updateModeOfPaymentDetailsAsync',
  async (modeOfPayment, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.update(modeOfPayment);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const deleteModeOfPaymentDetailsAsync = createAsyncThunk<IModeOfPayment, string>(
  'modeOfPayments/deleteModeOfPaymentDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.ModeOfPayment.delete(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const modeOfPaymentSlice = createSlice({
  name: 'modeOfPayment',
  initialState,
  reducers: {},

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

    
    builder.addCase(createModeOfPaymentAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createModeOfPaymentAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createModeOfPaymentAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(updateModeOfPaymentDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(updateModeOfPaymentDetailsAsync.fulfilled, (state, action) => {
      state.modeOfPayment = action.payload;
      state.isSaving = false;
    });
    builder.addCase(updateModeOfPaymentDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(deleteModeOfPaymentDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(deleteModeOfPaymentDetailsAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(deleteModeOfPaymentDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });
  })
})

export const {  } = modeOfPaymentSlice.actions;