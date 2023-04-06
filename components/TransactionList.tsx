import React, { Fragment, useEffect } from "react";
import Transaction from "./Transaction";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { fetchTransactions } from "@/redux/transaction/TransactionSlice";

const TransactionList = () => {
  const { transactions, isLoading, isError, error } = useAppSelector(
    (state) => state.transaction
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  else if (!isLoading && isError) <p>Something is wrong</p>;
  else if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No Transaction </p>;
  else if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => {
      return <Transaction transaction={transaction} key={transaction.id} />;
    });
  }

  return (
    <Fragment>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </Fragment>
  );
};

export default TransactionList;
