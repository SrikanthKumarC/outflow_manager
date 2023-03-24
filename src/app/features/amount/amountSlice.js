import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// const transactions = useSelector((state) => state.transaction);

// const total = transactions.reduce( (acc, curr) => acc = curr.amount, 0);


const initialState = {
    amount: 0
}

export const amountSlice = createSlice({
    name: 'amount',
    initialState,
    reducers: {
        increment: (state) => {
            state.amount += 1;
        },
        decrement: (state) => {
            state.amount -= 1;
        },
        incrementByAmt: (state, action) => {
            state.amount += action.payload;
        },
        reset: (state) => {
            state.amount = 0;
        }
    }
})


export const { increment, decrement, incrementByAmt, reset } = amountSlice.actions

export default amountSlice.reducer;