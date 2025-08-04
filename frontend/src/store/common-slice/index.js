import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/common/getFeatureImages",
  async () => {
    const response = await axios.get(
      "/api/common/feature/get"
    );
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage",
  async (imageData) => {
    const response = await axios.post(
      "/api/common/feature/add",
      imageData
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonFeature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.featureImageList = action.payload.data;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = [...state.featureImageList, action.payload.data];
      });
  },
});

export default commonSlice.reducer;
