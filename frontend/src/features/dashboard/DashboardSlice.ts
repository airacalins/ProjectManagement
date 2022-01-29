import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { IDashboard } from "../../app/models/dashboard";

export interface IDashboardState {
  dashboard: IDashboard[];
  isFetching: boolean;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: IDashboardState = {
  dashboard: [],
  isFetching: false,
  isFetchingDetails: false,
  isSaving: false
}

export const fetchDashboardAsync = createAsyncThunk<IDashboard[]>(
  'dashboard/fetchDashboardAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Dashboard.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchDashboardAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchDashboardAsync.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchDashboardAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

  })
})

export const { } = dashboardSlice.actions;