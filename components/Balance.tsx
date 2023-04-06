import { useAppSelector } from "@/redux/Store";
import { ITransactionsType } from "@/redux/transaction/TransactionType";
import React from "react";

const Balance = () => {
  const { transactions } = useAppSelector((state) => state.transaction);

  const calculateIncome = (transactions: ITransactionsType[]) => {
    let income = 0;
    transactions.forEach((element: ITransactionsType) => {
      const { type, amount } = element;
      if (type === "income") income += amount as number;
      else income -= amount as number;
    });
    return income;
  };
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        {transactions.length > 0 ? (
          <span>{calculateIncome(transactions)}</span>
        ) : (
          0
        )}
      </h3>
    </div>
  );
};

export default Balance;
