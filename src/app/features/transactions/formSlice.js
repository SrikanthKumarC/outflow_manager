import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toShow: false,
  type: 'add',
  transaction: {
    id: "",
    title: "",
    category: "",
    date: "",
    type: "",
    amount: 0,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    toggleShow: (state, action) => {
      if (action.payload.type === 'add') {
        return {
          toShow: !state.toShow,
          type: 'add',
          transaction: {
            id: "",
            title: "",
            category: "",
            date: "",
            type: "",
            amount: 0,
          },
        };
      } else if (action.payload.type === 'edit') {
        return {
          ...state,
          toShow: !state.toShow,
          type: 'edit',
          transaction: action.payload.transaction,
        };
      }
    },
    dontShow: (state) => {
      return {
        ...state,
        toShow: false,
      };
    },
  },
});

export const { toggleShow, dontShow } = formSlice.actions;

export default formSlice.reducer;
