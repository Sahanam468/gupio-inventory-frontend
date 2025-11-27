import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import orderReducer from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});
