import { createContext } from "react";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";
import { Wallet } from "../types/Wallet";

export const UserContext = createContext<{
  user?: User,
  setUser: Function,

  wallet?: Wallet,
  setWallet: Function,

  allTransactions?: Transaction[],
  setAllTransactions: Function,
}>(undefined);
