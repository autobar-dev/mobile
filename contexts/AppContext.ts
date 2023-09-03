import { createContext } from "react";
import { AuthProvider } from "../providers/Auth";
import { UserProvider } from "../providers/User";

export type AppContextType = {
  providers: {
    auth: AuthProvider,
    user: UserProvider,
  },
};

export const AppContext = createContext<AppContextType>(undefined);
