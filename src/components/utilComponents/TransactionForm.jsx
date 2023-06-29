import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  addTransaction,
  editTransaction,
} from "../../app/features/transactions/transactionSlice";
import { updateTime } from "../../app/features/transactions/timeSlice";
import { update } from "../../app/features/limit/limitSlice";
import moment from "moment";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.form.transaction;
  });
  const showType = useSelector((state) => {
    console.log("type showtype", state);
    return state.form.type;
  });

  const [showTypeVar, setShowTypeVar] = useState(showType);

  const buttonLabel =
    showTypeVar === "add" ? "Add Transaction" : "Edit Transaction";

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    setShowTypeVar(showType);
  }, [showType]);

  const [formData, setFormData] = useState({
    id: self.crypto.randomUUID(),
    title: "",
    category: "Others",
    date: new Date(),
    type: "income",
    amount: 0,
  });

  const incomesTypes = ["income", "expense"];

  let { amount, category, type, title, date } = formData;
  amount = Number(amount);
  const categories = useSelector((state) => {
    console.log(state);
    return state.category;
  });

  const toShow = useSelector((state) => {
    return state.form.toShow;
  });

  const handleSubmit = () => {
    dispatch(updateTime(new Date()));
    if (showTypeVar === "add") {
      console.log("newly submitted");
      const transformedDate = new Date(date);
      dispatch(
        addTransaction({ title, category, date: transformedDate, type, amount })
      );
    } else {
      console.log("editied", formData);
      dispatch(editTransaction({ ...formData }));
    }
  };

  const formClass = toShow ? "" : "invisible";
  return (
    <form action="" className={formClass}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
      />
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />

      <br />
      <label htmlFor="type">Type</label>
      <select
        name="type"
        value={type}
        onChange={(e) => {
          console.log("type changed to", e.target.value);
          setFormData({ ...formData, type: e.target.value });
        }}
      >
        {incomesTypes.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
      <br />
      <label htmlFor="date">Date</label>

      <input
        name="date"
        type={"date"}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        value={moment(date).format("YYYY-MM-DD")}
      />
      <label htmlFor="category">Category</label>
      <select
        name="category"
        value={category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        {categories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          const date = new Date().toDateString();
          handleSubmit(date);
        }}
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default TransactionForm;
