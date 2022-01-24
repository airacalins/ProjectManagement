import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IInvoice } from "../../app/models/invoice";

export interface IInvoiceState {
  invoices: IInvoice[];
  invoice?: IInvoice;
  isFetching: boolean;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: IInvoiceState = {
  invoices: [],
  isFetching: false,
  invoice: undefined,
  isFetchingDetails: false,
  isSaving: false
}

export const fetchInvoicessAsync = createAsyncThunk<IInvoice[]>(
  'invoice/fetchInvoicessAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Invoice.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchInvoiceDetailsAsync = createAsyncThunk<IInvoice, string>(
  'invoice/fetchInvoiceDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Invoice.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)


export const createInvoiceAsync = createAsyncThunk<IInvoice, IInvoice>(
  "invoice/createInvoiceAsync", 
  async (invoice, thunkAPI) => {
    try {
      return await agent.Invoice.create(invoice);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const updateInvoiceDetailsAsync = createAsyncThunk<IInvoice, IInvoice>(
  'invoice/updateInvoiceDetailsAsync',
  async (invoice, thunkAPI) => {
    try {
      return await agent.Invoice.update(invoice);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchInvoicessAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchInvoicessAsync.fulfilled, (state, action) => {
      state.invoices = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchInvoicessAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchInvoiceDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchInvoiceDetailsAsync.fulfilled, (state, action) => {
      state.invoice = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchInvoiceDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });


    builder.addCase(createInvoiceAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createInvoiceAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createInvoiceAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(updateInvoiceDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(updateInvoiceDetailsAsync.fulfilled, (state, action) => {
      state.invoice = action.payload;
      state.isSaving = false;
    });
    builder.addCase(updateInvoiceDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });

  })
})

export const {  } = invoiceSlice.actions;