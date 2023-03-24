import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useRef } from "react";

const Modal = (props) => {
  const mainRef = useRef();

  const invisble = props.showing ? "" : "invisible";

  return (
    <div
      ref={mainRef}
      className={`modal ${invisble}`}
      onClick={(e) => {
        e.stopPropagation();
        props.modalFn(false);
      }}
    >
      <div className="wrapper">{props.children}</div>
    </div>
  );
};

export default Modal;
