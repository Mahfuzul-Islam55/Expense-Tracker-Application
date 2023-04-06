import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, ITransactionsType } from "./TransactionType";
import {
  addTransactions,
  deleteTransactions,
  editTransactions,
  getTransactions,
} from "./TransactionAPI";

const initialState: IInitialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await getTransactions();

    return response;
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data: ITransactionsType) => {
    const response = await addTransactions(data);

    return response;
  }
);
interface param {
  data?: ITransactionsType | undefined;
  id?: number;
}
export const changeTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ data, id }: param) => {
    const response = await editTransactions(data, id);

    return response;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: number) => {
    const response = await deleteTransactions(id);

    return response;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.transactions = [];
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(changeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.transactions.findIndex(
          (i) => i.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (i) => i.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
