import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from '../features/ShopCart/productSlice';
import cartReducer from '../features/ShopCart/cartSlice';
import filterReducer from "../features/filterSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});