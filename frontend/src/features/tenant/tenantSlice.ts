import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { ITenant } from "../../app/models/tenant";

export interface ITenantState {
  tenants: ITenant[];
  isFetching: boolean;
  tenant?: ITenant;
  isFetchingDetails: boolean;
}

const initialState: ITenantState = {
  tenants: [],
  isFetching: false,
  tenant: undefined,
  isFetchingDetails: false
}

export const fetchTenantsAsync = createAsyncThunk<ITenant[]>(
  'tenants/fetchTanantsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Tenant.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchTenantDetailsAsync = createAsyncThunk<ITenant, string>(
  'announcements/fetchTenantDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Tenant.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)


export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
  },
  extraReducers: (builder => {
    builder.addCase(fetchTenantsAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchTenantsAsync.fulfilled, (state, action) => {
      state.tenants = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchTenantsAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchTenantDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchTenantDetailsAsync.fulfilled, (state, action) => {
      state.tenant = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchTenantDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });
  })
})

export const { } = tenantSlice.actions;