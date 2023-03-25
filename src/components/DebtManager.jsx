import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import "./debt.css";
import { addDebt, removeDebt } from "../app/features/transactions/debtSlice";
import Currency from "./utilComponents/Currency";

const DebtManager = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [amt, setAmt] = useState();
  const [interest, setInterest] = useState();
  const [period, setPeriod] = useState();

  const debtsObj = useSelector((state) => {
    console.log("debts", state.debt);
    return state.debt;
  });

  const [debts, setDebts] = useState([]);

  useEffect(() => {
    setDebts(debtsObj);
  }, [debtsObj]);

  const handleClick = () => {
    dispatch(addDebt({ name, amt, interest, period }));
  };

  const handleRemove = (debtId) => {
    dispatch(removeDebt(debtId));
  }

  return (
    <>
      <div className="main_debt">
        <Menu />
        <div className="manager">
        <h1>Debt Management</h1>
          <form action="">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
              placeholder="Ex: Edu Loan"
            />

            <label htmlFor="amt">Amount</label>
            <input
              type="number"
              name="amt"
              value={amt}
              required={true}
              onChange={(e) => setAmt(e.target.value)}
              placeholder="Ex: 21000"
            />

            <label htmlFor="interest">Interest</label>
            <input
              type="number"
              value={interest}
              required={true}
              name="interest"
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Example 5%"
            />

            <label htmlFor="period">Period</label>
            <input
              type="number"
              name="period"
              required={true}
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="in months"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              Add
            </button>
          </form>
          <div className="inner">
            <h1>Debt Details</h1>
            <div className="debt_inner">
              <label>Amount</label>
              <label>Name</label>
              <label>Interest</label>
              <label>Period</label>
              <label>Remove</label>
            </div>
            <div className="">
              {debts.map((debt) => {
                return (
                  <div className="debt_inner" key={debt.id}>
                    <p>
                      <Currency value={debt.amt} />
                    </p>
                    <p>{debt.name}</p>
                    <p>{debt.interest}%</p>
                    <p>{debt.period}</p>
                    <button
                      onClick={() => {
                        handleRemove(debt.id);
                      }}
                    >Remove</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DebtManager;
