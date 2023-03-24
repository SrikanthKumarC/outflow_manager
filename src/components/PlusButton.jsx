import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import "./PlusButton.css";
import { dontShow } from "../app/features/transactions/formSlice";

import TransactionForm from "./utilComponents/TransactionForm";
import { toggleShow } from "../app/features/transactions/formSlice";
// title: 'Payment from 231xxx',
// category: 'Bills',
// date: '12 Mar 2023',
// type: 'income',
// amount: 910

const PlusButton = () => {
  const dispatch = useDispatch();
  const mainRef = useRef();

  const handleClick = () => {
    dispatch(toggleShow({ type: "add" }));
  };

  useEffect(() => {
    console.log("here");
    const handleShow = (e) => {
      if (mainRef && !mainRef.current.contains(e.target)) {
        dispatch(dontShow());
      }
    };
    document.addEventListener("mousedown", handleShow);

    return () => {
      removeEventListener("mousedown", handleShow);
    };
  });

  return (
    <>
      <div className="addTransaction" ref={mainRef}>
        <TransactionForm />
        <div className="plusButton" onClick={handleClick}>
          <span className="pb">+</span>
        </div>
      </div>
    </>
  );
};

export default PlusButton;
