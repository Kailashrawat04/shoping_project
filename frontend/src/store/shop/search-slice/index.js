import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchQuery: "",
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "/search/getSearchResults",
  async (query) => {
    const response = await axios.get(
      `/api/shop/search/${query}`
    );
    return response.data;
  }
);

export const resetSearchResults = createAsyncThunk(
  "/search/resetSearchResults",
  async () => {
    return [];
  }
);

const searchSlice = createSlice({
  name: "shopSearch",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload.data;
      })
      .addCase(resetSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
