import React, { useEffect } from "react";
import "./Transactions.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeTransaction } from "../app/features/transactions/transactionSlice";
import { toggleShow } from "../app/features/transactions/formSlice";

import Currency from "./utilComponents/Currency";
import moment from "moment";
// id: self.crypto.randomUUID(),
// title: "Payment from 231xxx",
// category: "Bills",
// date: "12 Mar 2023",
// type: "income",
// amount: 910,

const SingleTransaction = ({ transaction, showCategory }) => {
  const dispatch = useDispatch();

  const { id, title, category, date, type, amount } = transaction;

  const transactionId = id;
  const transactionTypeSymbol =
    type === "expense" ? "symbol-expense" : "symbol-income";

  const [showOptions, setShowOptions] = useState(false);
  const optionRef = useRef();

  const handleRemove = (id) => {
    console.log("inside componenet", id);
    dispatch(removeTransaction(id));
  };

  const handleEdit = () => {
    setShowTransactions(true);
  };

  useEffect(() => {
    const handleOptions = (e) => {
      if (optionRef && !optionRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleOptions);

    // clean up
    return () => {
      document.removeEventListener("mousedown", handleOptions);
    };
  });

  return (
    <>
      <div className="transaction" ref={optionRef}>
        <span className={transactionTypeSymbol}>
          {type === "expense" ? "-" : "+"}
        </span>
        <div className="transaction_content">
          <p>{title}</p>
          {showCategory ? <span>{category}</span> : ""}
        </div>

        <time>{moment(date).format('Do MMM yy')}</time>
        <span content="966" className="price">
          {<Currency value={amount} />}
        </span>
        <span
          className={`edit ${showOptions ? "selected" : ""}`}
          onClick={() => setShowOptions(!showOptions)}
        >
          {<BiDotsVerticalRounded />}
        </span>
        <div className={`options ${showOptions ? "" : "invisible"}`}>
          <p
            onClick={() => {
              dispatch(toggleShow({ transaction, type: "edit" }));
            }}
          >
            Edit
          </p>
          <p onClick={() => handleRemove(transactionId)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default SingleTransaction;
