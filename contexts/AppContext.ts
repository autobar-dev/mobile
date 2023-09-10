import { createContext } from "react";
import { AuthProvider } from "../providers/Auth";
import { CurrencyProvider } from "../providers/Currency";
import { ModuleProvider } from "../providers/Module";
import { UserProvider } from "../providers/User";
import { WalletProvider } from "../providers/Wallet";
import { ProductProvider } from "../providers/Product";

export type AppContextType = {
  providers: {
    auth: AuthProvider,
    user: UserProvider,
    wallet: WalletProvider,
    currency: CurrencyProvider,
    module: ModuleProvider,
    product: ProductProvider,
  },
};

export const AppContext = createContext<AppContextType>(undefined);
