import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "Fri Mar 24 2023 15:32:52 GMT+0530 (India Standard Time)",
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    updateTime: (action) => {
      return { time: action.payload };
    },
  },
});

export const { updateTime } = timeSlice.actions;

export default timeSlice.reducer;
