import React from "react";

function Currency(props) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return <>{formatter.format(props.value)}</>;
}

export default Currency;
