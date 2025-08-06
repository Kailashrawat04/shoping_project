import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orders: [],
};

export const createNewOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    const response = await axios.post(
      "/api/shop/order/create",
      orderData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const createOrder = createNewOrder;

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "/api/shop/order/capture",
      { paymentId, payerId, orderId },
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "/order/fetchOrders",
  async (userId) => {
    const response = await axios.get(
      `/api/shop/order/get/${userId}`
    );

    return response.data;
  }
);

const orderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
