import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";
const Login = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  const { logout } = useAuth0();

  return (
    <div className="login">
      <div className="inner_login">
        <h1>Expense Outflow Manager</h1>
        <p>Login to continue</p>
        <div className="btn_container">
          <button onClick={loginWithPopup()}>Log In</button>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
