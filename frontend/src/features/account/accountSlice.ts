import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { IUser } from "../../app/models/user";
import { toast } from "react-toastify";
import history from "../../app/utils/history";

interface AccountState {
  user: IUser | null;
}

const initialState: AccountState = {
  user: null
}

export const signInUserAsync = createAsyncThunk<IUser, FieldValues>(
  'account/signInUserAsync',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchCurrentUserAsync = createAsyncThunk<IUser>(
  'account/fetchCurrentUserAsync',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    }
  }
)

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      history.push('/login');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
      history.push('/login');
    })
    builder.addMatcher(isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signInUserAsync.rejected), (state, action) => {
      console.log(action.payload);
    });

  })
})

export const {signOut, setUser} = accountSlice.actions;