import React from "react";
import Menu from "../components/Menu";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Settings.css";
import {
  BsFillExclamationTriangleFill,
  BsDatabaseFillDown,
} from "react-icons/bs";
import axios from "axios";
import Modal from "./utilComponents/Modal";
import { syncTransactions } from "../app/features/transactions/transactionSlice";

const BANK_URL = "https://api.npoint.io/1d3b444715c1f45b1257/bankData";

function Settings() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const transactions = useSelector((state) => {
    return state.transaction;
  });

  const SyncTransactionsData = () => {
    axios.get(BANK_URL).then((response) => {
      dispatch(syncTransactions(response.data));
    });
  };

  const handleModal = () => {
    setShowModal(true);
    // localStorage.clear();
  };

  const localStorageDialogue = () => {
    return (
      <>
        <h3>Are you sure?</h3>
        <p>
          Do you want to delete local storage? This will remove all saved data.
        </p>
        <div className="btn_groupx">
          <button>No</button>
          <button className="red" onClick={clearStorage}>
            Yes
          </button>
        </div>
      </>
    );
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(transactions)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const clearStorage = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <>
      <div className="settings_flex">
        <Menu selected={"settings"} />
        <div className="settings_main">
          <h1>Settings</h1>
          <div className="btn_group">
            <p htmlFor="Reset Local Storage">Reset Local Storage</p>
            <button className="danger" onClick={handleModal}>
              <BsFillExclamationTriangleFill color="white" /> Reset
            </button>
            <p htmlFor="Reset Local Storage">Download Data</p>
            <button onClick={exportData}>Download</button>
            <p>Sync with Database</p>
            <button className="fetch" onClick={SyncTransactionsData}>
              <BsDatabaseFillDown /> Fetch Data
            </button>
          </div>
        </div>
      </div>
      <Modal showing={showModal} modalFn={setShowModal}>
        {localStorageDialogue()}
      </Modal>
    </>
  );
}

export default Settings;
