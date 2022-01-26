import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IUser } from "../../app/models/user";

export interface IUserState {
  users: IUser[];
  user?: IUser;
  isFetching: boolean;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: IUserState = {
  users: [],
  user: undefined,
  isFetching: false,
  isFetchingDetails: false,
  isSaving: false
}

export const fetchUsersAsync = createAsyncThunk<IUser[]>(
  'users/fetchUserssAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Users.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchUserDetailsAsync = createAsyncThunk<IUser, string>(
  'users/fetchUserDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Users.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const createUserAsync = createAsyncThunk<IUser, IUser>(
  "users/createUserAsync", 
  async (user, thunkAPI) => {
    try {
      return await agent.Users.create(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const updateUserDetailsAsync = createAsyncThunk<IUser, IUser>(
  'users/updateUserDetailsAsync',
  async (user, thunkAPI) => {
    try {
      return await agent.Users.update(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const deleteUserDetailsAsync = createAsyncThunk<IUser, string>(
  'users/deleteUserDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Users.delete(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchUsersAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchUserDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchUserDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });


    builder.addCase(createUserAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(updateUserDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(updateUserDetailsAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isSaving = false;
    });
    builder.addCase(updateUserDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(deleteUserDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(deleteUserDetailsAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(deleteUserDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });
  })
})

export const { } = userSlice.actions;