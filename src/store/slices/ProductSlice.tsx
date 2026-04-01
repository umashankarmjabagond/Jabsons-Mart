import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { setProducts, clearProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
