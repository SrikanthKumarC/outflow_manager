import React from "react";
import { BiUserCircle, BiBell, BiMoney, BiLogOut } from "react-icons/bi";
import { BsFillGearFill, BsGearFill } from "react-icons/bs";

import { TbCategory } from "react-icons/tb";

import "./Menu.css";

import { Outlet, Link } from "react-router-dom";

const Menu = ({selected}) => {
    const highlight = 'highlight';
  return (
    <>
      <div className="menu">
        <Link to="/" >
          <BiUserCircle  className={selected === 'home' ? highlight : ''}/>
        </Link>
        <Link to="/categories" >
          {" "}
          <TbCategory className={selected === 'category' ? highlight : ''} />
        </Link>
        <Link to="/transactions" >
          {" "}
          <BiMoney  className={selected === 'transaction' ? highlight : ''}/>
        </Link>
        <Link to="/settings">
          {" "}
          <BsGearFill className={selected === 'settings' ? highlight : ''}/>
        </Link>
        <Link to="/" >
          {" "}
          <BiLogOut />
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Menu;
