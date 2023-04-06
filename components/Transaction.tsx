import { useAppDispatch } from "@/redux/Store";
import { editActive } from "@/redux/transaction/TransactionSlice";
import { ITransactionsType } from "@/redux/transaction/TransactionType";
import React from "react";

interface props {
  transaction: ITransactionsType;
}
const Transaction = ({ transaction }: props) => {
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>
        <button className="link" onClick={handleEdit}>
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
