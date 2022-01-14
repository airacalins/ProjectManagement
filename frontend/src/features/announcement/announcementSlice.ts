import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IAnnouncement } from "../../app/models/announcement";

export interface IAnnouncementState {
  announcements: IAnnouncement[];
  isFetching: boolean;
  announcement?: IAnnouncement;
  isFetchingDetails: boolean;
}

const initialState: IAnnouncementState = {
  announcements: [],
  isFetching: false,
  announcement: undefined,
  isFetchingDetails: false
}

export const fetchAnnouncementsAsync = createAsyncThunk<IAnnouncement[]>(
  'announcements/fetchAnnouncementsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Announcement.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchAnnouncementDetailsAsync = createAsyncThunk<IAnnouncement, string>(
  'announcements/fetchAnnouncementDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Announcement.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder => {
    builder.addCase(fetchAnnouncementsAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAnnouncementsAsync.fulfilled, (state, action) => {
      state.announcements = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchAnnouncementsAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchAnnouncementDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchAnnouncementDetailsAsync.fulfilled, (state, action) => {
      state.announcement = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchAnnouncementDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });
  })
})

export const { } = announcementSlice.actions;