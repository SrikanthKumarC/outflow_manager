import React from "react";
import { BiUserCircle, BiBell, BiMoney, BiLogOut } from "react-icons/bi";
import { BsFillGearFill, BsGearFill } from "react-icons/bs";

import { TbCategory } from "react-icons/tb";
import { useAuth0 } from "@auth0/auth0-react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import "./Menu.css";

import { Outlet, Link } from "react-router-dom";

const Menu = ({ selected }) => {
  const highlight = "highlight";
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const userImage = isAuthenticated && (
    // <div>
    <img className="display_image" src={user.picture} alt={user.name} />
  );
  const userFallBack = () => (
    <BiUserCircle className={selected === "home" ? highlight : ""} />
  );

  return (
    <>
      <div className="menu">
        <Link to="/home">{isAuthenticated ? userImage : userFallBack}</Link>
        <Link to="/categories">
          {" "}
          <TbCategory className={selected === "category" ? highlight : ""} />
        </Link>
        <Link to="/transactions">
          {" "}
          <BiMoney className={selected === "transaction" ? highlight : ""} />
        </Link>
        <Link to="/settings">
          {" "}
          <BsGearFill className={selected === "settings" ? highlight : ""} />
        </Link>
        <Link to="/debt">
          {" "}
          <RiMoneyDollarCircleFill />
        </Link>
        <Link
          to="/"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          {" "}
          <BiLogOut />
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Menu;
