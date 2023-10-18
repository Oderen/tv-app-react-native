import { createSlice } from "@reduxjs/toolkit";
import { fetchShows, fetchShowByID } from "./api-operation";

const initialState = {
  shows: [],
  show: {},
  isLoading: false,
  error: null,
  showID: "",
};

const showSlice = createSlice({
  name: "showSlice/fetch",
  initialState,
  reducers: {
    changeID: (state, { payload }) => {
      state.showID = payload;
    },
  },
  extraReducers: (builder) => {
    // fetchShows
    builder.addCase(fetchShows.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShows.rejected, (state) => {
      state.isLoading = false;
    }),
      builder.addCase(fetchShows.fulfilled, (state, { payload }) => {
        state.shows = payload;
        state.isLoading = false;
      });
    // fetchByID
    builder.addCase(fetchShowByID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowByID.rejected, (state) => {
      state.isLoading = false;
    }),
      builder.addCase(fetchShowByID.fulfilled, (state, { payload }) => {
        state.show = payload;
        state.isLoading = false;
      });
  },
});

export const { changeID } = showSlice.actions;

export default showSlice.reducer;
