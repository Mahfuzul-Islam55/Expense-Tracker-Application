export interface IInitialState {
  transactions: ITransactionsType[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}

export interface ITransactionsType {
  id?: number;
  name: string;
  type: string;
  amount: number;
}
