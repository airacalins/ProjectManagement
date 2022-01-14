import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { ISlot } from "../../app/models/slot";

export interface ISlotState {
  slots: ISlot[];
  isFetching: boolean;
  slot?: ISlot;
  isFetchingDetails: boolean;
}

const initialState: ISlotState = {
  slots: [],
  isFetching: false,
  slot: undefined,
  isFetchingDetails: false
}

export const fetchSlotsAsync = createAsyncThunk<ISlot[]>(
  'tenants/fetchSlotsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Slot.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchSlotDetailsAsync = createAsyncThunk<ISlot, string>(
  'announcements/fetchSlotDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Slot.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)


export const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
  },
  extraReducers: (builder => {
    builder.addCase(fetchSlotsAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchSlotsAsync.fulfilled, (state, action) => {
      state.slots = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchSlotsAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchSlotDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchSlotDetailsAsync.fulfilled, (state, action) => {
      state.slot = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchSlotDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });
  })
})

export const {  } = slotSlice.actions;