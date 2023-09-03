import { createContext } from "react";
import { UserExtended } from "../types/User";

export const UserContext = createContext<{
  user?: UserExtended,
  setUser: Function,
}>(undefined);
