import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { ICreateTenantInput, ITenant, IUpdateTenantInput } from "../../app/models/tenant";
import { ITenantContractPhotoInput } from "../../app/models/tenantContract";

export interface ITenantState {
  tenants: ITenant[];
  isFetching: boolean;
  tenant?: ITenant;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: ITenantState = {
  tenants: [],
  isFetching: false,
  tenant: undefined,
  isFetchingDetails: false,
  isSaving: false
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
  'tenants/fetchTenantDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Tenant.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)


export const createTenantsAsync = createAsyncThunk<ITenant, ICreateTenantInput>(
  'tenants/createTenantsAsync',
  async (tenant, thunkAPI) => {
    try {
      return await agent.Tenant.create(tenant);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const uploadTenantContractPhoto = createAsyncThunk<any, ITenantContractPhotoInput>(
  'tenants/uploadTenantContractPhoto',
  async (model, thunkAPI) => {
    try {
      return await agent.Tenant.uploadContract(model);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)


export const updateTenantDetailsAsync = createAsyncThunk<ITenant, IUpdateTenantInput>(
  'tenants/updateTenantDetailsAsync',
  async (tenant, thunkAPI) => {
    try {
      return await agent.Tenant.update(tenant);
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
    
    
    builder.addCase(createTenantsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createTenantsAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createTenantsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });
  })
})

export const { } = tenantSlice.actions;