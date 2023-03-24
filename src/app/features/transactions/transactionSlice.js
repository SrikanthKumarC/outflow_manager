import { createSlice, current } from "@reduxjs/toolkit";
// self.crypto.randomUUID();

const initialState = [
  {
    id: "4f3fb469-2607-4394-9010-7f7ff7683f44",
    title: "Payment from 231xxx",
    category: "Bills",
    date: "Fri Mar 24 2023 15:32:52 GMT+0530 (India Standard Time)",
    type: "income",
    amount: 910,
  },
  {
    id: "57550cfd-5a4b-496e-a04f-99d213b763c4",
    title: "Payment from 231xxx",
    category: "Bills",
    date: "Fri Mar 24 2023 15:32:52 GMT+0530 (India Standard Time)",
    type: "expense",
    amount: 200,
  },
];

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      var newArr = state;
      newArr.push({ id: self.crypto.randomUUID(), ...action.payload });
      state = newArr;
    },
    removeTransaction: (state, action) => {
      return state.filter((transaction) => {
        console.log("here asdfasdfsadf");
        return transaction.id != action.payload;
      });
    },
    editTransaction: (state, action) => {
      console.log("inside edit payload", action.payload);
      let objIndex = state.findIndex((obj) => obj.id == action.payload.id);
      const newState = state;
      newState[objIndex] = action.payload;
      return newState;
    },
    syncTransactions: (state, action) => {
      const newState = [ ...state, ...action.payload ];
      return newState;
    },
  },
});

export const {
  addTransaction,
  removeTransaction,
  editTransaction,
  syncTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;

export const selectAllTransactions = (state) => state.transaction;
