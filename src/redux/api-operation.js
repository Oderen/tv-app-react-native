import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://api.tvmaze.com";

export const fetchShows = createAsyncThunk("fetch/shows", async (query) => {
  try {
    const response = await fetch(`${baseURL}/search/shows?q=${query}`);

    if (!response.ok) {
      throw new Error("Error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
});

export const fetchShowByID = createAsyncThunk(
  "fetch/showByID",
  async (showID) => {
    try {
      const response = await fetch(`${baseURL}/shows/${showID}`);
      if (!response.ok) {
        return new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
