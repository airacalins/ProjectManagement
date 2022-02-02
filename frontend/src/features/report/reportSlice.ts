import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IInvoiceReport, IInvoiceReportInput } from "../../app/models/report";

export interface IReportState {
  report?: IInvoiceReport;
  isFetching: boolean;
}

const initialState: IReportState = {
  report: undefined,
  isFetching: false
}

export const fetchInvoiceReportAsync = createAsyncThunk<IInvoiceReport, IInvoiceReportInput>(
  'report/fetchInvoiceReportAsync',
  async (values, thunkAPI) => {
    try {
      return await agent.Report.getInvoiceReport(values);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const reportSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchInvoiceReportAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchInvoiceReportAsync.fulfilled, (state, action) => {
      state.report = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchInvoiceReportAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
  })
})

export const { } = reportSlice.actions;