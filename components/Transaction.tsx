import { useAppDispatch } from "@/redux/Store";
import {
  editActive,
  removeTransaction,
} from "@/redux/transaction/TransactionSlice";
import { ITransactionsType } from "@/redux/transaction/TransactionType";
import React from "react";

interface props {
  transaction: ITransactionsType;
}
const Transaction = ({ transaction }: props) => {
  const { id } = transaction;
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id as number));
  };

  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src="/edit.svg" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src="/delete.svg" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
