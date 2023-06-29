import { useEffect, useState } from "react";
import PlusButton from "./components/PlusButton";
import SingleTransaction from "./components/SingleTransaction";
import Menu from "./components/Menu";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { update } from "./app/features/limit/limitSlice";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { selectAllTransactions } from "./app/features/transactions/transactionSlice";

import Currency from "./components/utilComponents/Currency";
import moment from "moment";
import { updateTime } from "./app/features/transactions/timeSlice";

function App() {
  const transactions = useSelector(selectAllTransactions);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // handleMonths();
  console.log("select all", transactions);
  const limit = useSelector((state) => {
    return state.limit.limit;
  });

  console.log("limittlimit", limit);

  const [months, setMonths] = useState([moment(new Date()).format("MMM YYYY")]);
  let [eachMonth, setEachMonth] = useState(months[months.length - 1]);

  const [incomesG, setIncomes] = useState(0);
  const [expenseG, setExpense] = useState(0);

  const [localLimit, setLocalLimit] = useState(0);

  const [showLimitInput, setShowLimitInput] = useState(false);

  const limitClass = showLimitInput ? "" : "invisible";

  const getMinMaxMonths = (objects) => {
    const dates = objects.map((obj) => moment(obj.date));
    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);

    const minMonth = moment(minDate).format();
    const maxMonth = moment(maxDate).format();

    console.log("here month", minMonth, maxMonth);
    return [minMonth, maxMonth];
  };

  const getMonthsArray = (minMonth, maxMonth) => {
    const startDate = moment(minMonth);
    const endDate = moment(maxMonth);

    const months = [];

    let currentDate = startDate.clone();
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      months.push(currentDate.format("MMM YYYY"));
      currentDate.add(1, "month");
    }
    console.log("manths", months);
    setMonths(months);
  };

  const handleMonths = () => {
    const minmax = getMinMaxMonths(transactions);
    getMonthsArray(minmax[0], minmax[1]);
    console.log("months", months);
  };

  useEffect(() => {
    console.log("i saw an update");

    const incomes = filterTxns.filter((transaction) => {
      return transaction.type === "income";
    });

    setIncomes(
      incomes.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0)
    );

    const expenses = filterTxns.filter((transaction) => {
      return transaction.type === "expense";
    });
    setExpense(
      expenses.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0)
    );
    handleMonths();
  }, [transactions]);

  useEffect(() => {
    if (expenseG > limit) {
      axios.post(`https://chapter-couples-extensive-specify.trycloudflare.com/${limit}`);
    }
  }, [limit, expenseG]);

  const filterTxnsByMonth = () => {
    const dateString = eachMonth;
    const dateMoment = moment(dateString, "MMM YYYY");
    const month = dateMoment.month(); // 3 (April is the 4th month, but Moment.js uses 0-indexed months)
    const year = dateMoment.year(); // 2022

    // filter transactions by month and year
    const filteredTxns = transactions.filter((txn) => {
      const txnDate = moment(txn.date);
      const txnMonth = txnDate.month();
      const txnYear = txnDate.year();

      return txnMonth === month && txnYear === year;
    });
    return filteredTxns;
  };
  let filterTxns = filterTxnsByMonth();

  useEffect(() => {
    filterTxns = filterTxnsByMonth();
    const incomes = filterTxns.filter((transaction) => {
      return transaction.type === "income";
    });

    setIncomes(
      incomes.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0)
    );

    const expenses = filterTxns.filter((transaction) => {
      return transaction.type === "expense";
    });
    setExpense(
      expenses.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0)
    );

    console.log("incomessss, ", incomesG);

    filterTxns = filterTxnsByMonth();
    handleMonths();
  }, [eachMonth]);

  let amt = incomesG - expenseG;
  const newDate = useSelector((state) => {
    console.log("state broo", state);
    return state.time.time;
  });

  console.log("moment ", moment(newDate).fromNow());
  useEffect(() => {}, [newDate]);
  const dispatch = useDispatch();

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };
  const formatter = new Intl.DateTimeFormat("en-IN", options);

  return (
    <div className="App">
      <Menu selected="home" />
      <div className="container-main">
        <div className="bg">
          <img className="bg-svg" src="../assets/bg-vector.svg" alt="" />
        </div>
        <section className="header">
          <div className="heading">
            <h1>Expense Outflow Manager</h1>
          </div>
          <div className="tab-group">
            <select
              className="month"
              value={eachMonth}
              onChange={(e) => {
                // setFilterTxns(filterTxnsByMonth());
                setEachMonth(e.target.value);
                console.log("that month", eachMonth);
              }}
            >
              {months.map((month) => {
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <p>Welcome {user.name}</p>
        <div className="container">
          <div className="main">
            <section className="cards">
              <div className="card">
                <span>Income</span>
                <p>{<Currency value={incomesG} />}</p>
              </div>
              <div className="card">
                <span>Expense</span>
                <p>{<Currency value={expenseG} />}</p>
              </div>
            </section>
            <section className="transactions">
              <h3>Transactions ({filterTxns.length})</h3>

              {filterTxns.map((transaction) => {
                return (
                  <SingleTransaction
                    key={transaction.id}
                    showCategory={true}
                    transaction={{ ...transaction }}
                  />
                );
              })}
            </section>
          </div>
          <section className="aside">
            <div className="balance">
              <h2>Balance</h2>
              <span className="balance-amt">{<Currency value={amt} />}</span>
              <time>Updated: {moment(newDate).fromNow()}</time>
            </div>
            <div className="limit">
              Limit: <span>{<Currency value={limit} />}</span>
              <div
                className="limit-edit"
                onClick={() => setShowLimitInput(!showLimitInput)}
              >
                <MdModeEdit />
              </div>
            </div>
            <div className={` ${limitClass}`}>
              <form action="" className="background">
                <input
                  type="number"
                  value={localLimit}
                  onChange={(e) => {
                    setLocalLimit(e.target.value);
                  }}
                  className={`limit-input `}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(update(localLimit));
                    dispatch(updateTime(new Date()));
                  }}
                >
                  Edit
                </button>
              </form>
            </div>
          </section>
        </div>
        <PlusButton />
      </div>
    </div>
  );
}

export default App;
