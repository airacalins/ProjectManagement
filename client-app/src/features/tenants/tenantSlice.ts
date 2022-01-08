import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { ITenant } from "../../app/models/tenant";

export interface ITenantState {
  id: number;
  tenants: ITenant[];
  status: string;
}

const initialState: ITenantState = {
  id: 1,
  tenants: [],
  status: 'idle'
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

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchTenantsAsync.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchTenantsAsync.fulfilled, (state, action) => {
      state.tenants = action.payload;
      state.status = 'idle';
    });
    builder.addCase(fetchTenantsAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
  })
})

export const { setId } = tenantSlice.actions;