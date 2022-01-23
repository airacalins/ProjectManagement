import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { IAnnouncement } from "../../app/models/announcement";

export interface IAnnouncementState {
  announcements: IAnnouncement[];
  isFetching: boolean;
  announcement?: IAnnouncement;
  isFetchingDetails: boolean;
  isSaving: boolean;
}

const initialState: IAnnouncementState = {
  announcements: [],
  isFetching: false,
  announcement: undefined,
  isFetchingDetails: false,
  isSaving: false
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

export const createAnnouncementAsync = createAsyncThunk<IAnnouncement, IAnnouncement>(
  "announcements/createAnnouncementAsync", 
  async (announcement, thunkAPI) => {
    try {
      return await agent.Announcement.create(announcement);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const updateAnnouncementDetailsAsync = createAsyncThunk<IAnnouncement, IAnnouncement>(
  'announcements/updateAnnouncementDetailsAsync',
  async (announcement, thunkAPI) => {
    try {
      return await agent.Announcement.update(announcement);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const deleteAnnouncementDetailsAsync = createAsyncThunk<IAnnouncement, string>(
  'announcements/deleteAnnouncementDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Announcement.delete(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {},

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


    builder.addCase(createAnnouncementAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createAnnouncementAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createAnnouncementAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(updateAnnouncementDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(updateAnnouncementDetailsAsync.fulfilled, (state, action) => {
      state.announcement = action.payload;
      state.isSaving = false;
    });
    builder.addCase(updateAnnouncementDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });


    builder.addCase(deleteAnnouncementDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(deleteAnnouncementDetailsAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(deleteAnnouncementDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });
  })
})

export const { } = announcementSlice.actions;