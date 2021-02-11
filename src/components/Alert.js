import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

// class Alert extends React.Component {
//   render() {
//     return <h1>Class</h1>;
//   }
// }

export default Alert;
