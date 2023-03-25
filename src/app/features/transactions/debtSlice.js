import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {
    addDebt: (state, action) => {
      state.push({ id: self.crypto.randomUUID(), ...action.payload });
    },
    removeDebt: (state, action) => {
      return state.filter((debt) => {
        return debt.id != action.payload;
      });
    },
  },
});

export const { addDebt, removeDebt } = debtSlice.actions;

export default debtSlice.reducer;
