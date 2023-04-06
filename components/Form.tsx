import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { createTransaction } from "@/redux/transaction/TransactionSlice";
import { create } from "domain";
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amountNumber, setAmount] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector((state) => state.transaction);

  const reset = () => {
    setName("");
    setAmount("");
    setType("");
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let amount: number = Number(amountNumber);
    dispatch(createTransaction({ name, type, amount }));

    reset();
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="My Salary"
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="string"
            placeholder="300"
            name="amountNumber"
            value={amountNumber}
            onChange={(e) => setAmount(e.currentTarget.value)}
            required
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          Add Transaction
        </button>
        {isError && <p className="error">Something is wrong!</p>}
      </form>
      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
};

export default Form;
