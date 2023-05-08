import { createContext } from "react";

export const SessionContext = createContext<{
  session?: string,
  setSession: Function,
  accountEmail?: string,
  setAccountEmail: Function,
}>(undefined);
