import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  changeTransaction,
  createTransaction,
  editInActive,
} from "@/redux/transaction/TransactionSlice";
import { create } from "domain";
import React, { useEffect, useState } from "react";

const Form = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector((state) => state.transaction);
  const editing = useAppSelector((state) => state.transaction.editing);
  const [name, setName] = useState<string | undefined>(editing?.name);
  const [type, setType] = useState<string | undefined>(editing?.type);
  const [amountNumber, setAmount] = useState<string | undefined>();
  useEffect(() => {
    if (editing?.id) {
      setEditMode(true);
      setName(editing.name);
      let newAmount = editing.amount;
      let editAmount = newAmount?.toString();
      setAmount(editAmount);
      setType(editing.type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

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

  const cancelEditMode = () => {
    setEditMode(false);
    dispatch(editInActive());
  };

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let amount: number = Number(amountNumber);
    dispatch(
      changeTransaction({ data: { name, amount, type }, id: editing?.id })
    );
    reset();
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
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

        {editMode && (
          <button className="btn" type="submit" disabled={isLoading}>
            Update Transaction
          </button>
        )}
        {!editMode && (
          <button className="btn" type="submit" disabled={isLoading}>
            Add Transaction
          </button>
        )}
        {isError && <p className="error">Something is wrong!</p>}
        {editMode && (
          <button
            className="btn cancel_edit_button"
            style={{ backgroundColor: "#e6425e" }}
            onClick={cancelEditMode}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
