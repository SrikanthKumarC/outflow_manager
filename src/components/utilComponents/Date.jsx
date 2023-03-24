import React from "react";

function Date(date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Kolkata",
  });

  return <>{formatter.format(new Date())}</>;
}

export default Date;
