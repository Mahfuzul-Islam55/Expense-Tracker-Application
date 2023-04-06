import { ITransactionsType } from "@/redux/transaction/TransactionType";
import React from "react";

interface props {
  transaction: ITransactionsType;
}
const Transaction = ({ transaction }: props) => {
  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>
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
