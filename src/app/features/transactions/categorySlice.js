import { createSlice } from "@reduxjs/toolkit";


const initialState = [
  "Others",
  "Bills",
  "Transport",
  "Entertainment"
];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    removeCategory: (state, action) => {
        return state.filter((category) => {
           return category != action.payload
        })
    }
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;


export default categorySlice.reducer;
