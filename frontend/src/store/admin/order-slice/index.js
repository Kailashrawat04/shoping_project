import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orders: [],
};

export const getAllOrders = createAsyncThunk(
  "/admin/orders",
  async () => {
    const response = await axios.get(
      "/api/admin/orders/get"
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/admin/updateOrderStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `/api/admin/orders/update/${id}`,
      { status }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default adminOrderSlice.reducer;
