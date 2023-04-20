import React from "react";
import App from "./App";
import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import Category from "./components/Category";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


import DebtManager from "./components/DebtManager";

import persistStore from "redux-persist/es/persistStore";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import Login from "./Login";

const ProtectedApp = withAuthenticationRequired(App);
const ProtectedCategory = withAuthenticationRequired(Category);
const ProtectedSettings = withAuthenticationRequired(Settings);
const ProtectedTransactions = withAuthenticationRequired(Transactions);

const DOMAIN = import.meta.env.VITE_DOMAIN
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

console.log(DOMAIN)
console.log(CLIENT_ID)


let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/home',
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<ProtectedApp />} />
              <Route path="/categories" element={<ProtectedCategory />} />
              <Route path="/transactions" element={<ProtectedTransactions />} />
              <Route path="/settings" element={<ProtectedSettings />} />
              <Route path="/debt" element={<DebtManager />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
