import { createContext } from "react";
import { Tokens } from "../utils/Tokens";

export const TokensContext = createContext<{
  tokens?: Tokens,
  setTokens: Function,
}>(undefined);
