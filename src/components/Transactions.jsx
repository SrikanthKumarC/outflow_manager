import React, { useState } from "react";
import Menu from "./Menu";
import "./Transactions.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";
import PlusButton from "./PlusButton";

const Transactions = () => {
  const transactions = useSelector((state) => {
    console.log(state);
    return state.transaction;
  });

  const [tempTransaction, setTempTransaction] = useState({});

  console.log(tempTransaction)

  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowForm = () => {
    setShowEditForm(!showEditForm);
  }

  console.log("change detected in setShowTransactions" , showEditForm);

  return (
    <>
      <div className="container_main">
        <Menu selected="transaction" />
        <div className="container_inside">
          <div className="transaction_container">
            <h1>Transactions</h1>

            {transactions.map((transaction) => {
              return (
                <SingleTransaction
                  key={transaction.id}
                  showCategory={true}
                  transaction={ {...transaction }}
                  getTempTransaction={setTempTransaction}
                  getShowEditForm={setShowEditForm}
                />
              );
            })}
          </div>
        </div>
      </div>
      <PlusButton tempTxn={tempTransaction} isOpen={showEditForm} />
    </>
  );
};

export default Transactions;
