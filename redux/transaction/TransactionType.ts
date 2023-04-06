export interface IInitialState {
  transactions: ITransactionsType[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  editing?: ITransactionsType | undefined;
}

export interface ITransactionsType {
  id?: number;
  name?: string;
  type?: string;
  amount?: number;
}
