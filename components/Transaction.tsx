import React from "react";

const Transaction = () => {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
        <button className="link">
          <img className="icon" src="/edit.svg" />
        </button>
        <button className="link">
          <img className="icon" src="/delete.svg" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
