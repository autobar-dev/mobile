import 'react-native-gesture-handler';
import * as React from "react";
import { LoginScreen } from "./components/screens/LoginScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { MainScreen } from "./components/screens/MainScreen";
import { WalletScreen } from "./components/screens/WalletScreen";
import { Tokens } from "./utils/Tokens";
import { AuthProvider } from "./providers/Auth";
import { Meta } from "./types/Meta";
import { TokensContext } from "./contexts/TokensContext";
import { AppContext } from "./contexts/AppContext";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "./utils/Requests";
import { UserProvider } from "./providers/User";
import { User } from "./types/User";
import { UserContext } from "./contexts/UserContext";
import { WalletProvider } from './providers/Wallet';
import { CurrencyProvider } from './providers/Currency';
import { Wallet } from './types/Wallet';
import { Transaction } from './types/Transaction';
import { ScanScreen } from './components/screens/ScanScreen';
import { ModuleProvider } from './providers/Module';
import { ProductProvider } from './providers/Product';
import { ActivatedScreen } from './components/screens/ActivatedScreen';

const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [tokens, setTokens] = React.useState<Tokens | undefined | "IGNORE">("IGNORE");

  // Context states
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [wallet, setWallet] = React.useState<Wallet | undefined>(undefined);
  const [allTransactions, setAllTransactions] = React.useState<Transaction[] | undefined>(undefined);

  const [navigatorInitialScreen, setNavigatorInitialScreen] = React.useState<{
    name: string;
  }>({
    name: "Login",
  });
  const [appIsReady, setAppIsReady] = React.useState<boolean>(false);

  const meta: Meta = {
    version: "0.0.1",
    hash: "no-commit",
  };

  const authProvider = new AuthProvider("https://api.autobar.ovh/auth", meta);

  const apiClient = new ApiClient(authProvider, meta, setTokens);
  const userProvider = new UserProvider("https://api.autobar.ovh/user", apiClient);
  const walletProvider = new WalletProvider("https://api.autobar.ovh/wallet", apiClient);
  const currencyProvider = new CurrencyProvider("https://api.autobar.ovh/currency", apiClient);
  const moduleProvider = new ModuleProvider("https://api.autobar.ovh/module", apiClient);
  const productProvider = new ProductProvider("https://api.autobar.ovh/product", apiClient);

  React.useEffect(() => {
    async function prepare() {
      // Only for dev
      try {
        await authProvider.meta();
      } catch (e) {
        console.log("Not connected to dev VPN");
        Alert.alert("Cannot reach Autobar dev servers", "The app is not able to reach api.autobar.ovh. Please check your Zerotier connection", [], {
          cancelable: false,
        });
        return;
      }

      try {
        const refreshTokenFromSecureStore = await SecureStore.getItemAsync("refresh_token");
        // console.log("Refresh token from secure store: " + refreshTokenFromSecureStore);

        if (!!refreshTokenFromSecureStore) {
          try {
            const tokens = await authProvider.refresh(refreshTokenFromSecureStore);
            setTokens(tokens);
            console.log("Successfully refreshed tokens");
          } catch (e) {
            console.log("Failed to refresh tokens: " + e);
            setTokens(undefined);
          }
        } else {
          console.log("No refresh token in secure store");
          setTokens(undefined);
        }
      } catch (e) {
        console.log("Failed to fetch refresh token from secure store: " + e);
      }
    }

    prepare();
  }, []);

  // When tokens refresh, fetch user info and store it in user context. If the screen is Login, redirect to Main, otherwise stay on the current screen.
  React.useEffect(() => {
    if (tokens === "IGNORE") {
      console.log("ignored token change");
      return;
    }

    console.log("Tokens changed");

    if (!tokens) {
      SecureStore.deleteItemAsync("refresh_token")
        .then(() => {
          if (appIsReady) {
            console.log("App is ready, redirecting to login screen");
            navigationRef.resetRoot({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } else {
            console.log("App is not ready, setting initial screen to login screen");
            setNavigatorInitialScreen({
              name: "Login",
            });

            setAppIsReady(true);
          }
        });
    } else {
      SecureStore.setItemAsync("refresh_token", tokens.refresh_token)
        .then(async () => {
          const user = await userProvider.whoAmI(tokens);
          setUser(user);

          const wallet = await walletProvider.getWallet(tokens);
          setWallet(wallet);

          const allTransactions = await walletProvider.getAllTransactions(tokens);
          setAllTransactions(allTransactions);

          if (appIsReady) {
            if (navigationRef.getCurrentRoute()?.name === "Login") {
              console.log("App is ready, redirecting to main screen");
              navigationRef.resetRoot({
                index: 0,
                routes: [{ name: "Main" }],
              });
            }
          } else {
            console.log("App is not ready, setting initial screen to main screen");
            setNavigatorInitialScreen({
              name: "Main",
            });

            setAppIsReady(true);
          }
        });
    }

  }, [tokens]);

  // Hide splash screen after fetching user
  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      console.log("Hiding splash screen");
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        providers: {
          auth: authProvider,
          user: userProvider,
          wallet: walletProvider,
          currency: currencyProvider,
          module: moduleProvider,
          product: productProvider,
        },
      }}
    >
      <TokensContext.Provider
        value={{
          tokens: tokens as Tokens,
          setTokens: setTokens,
        }}
      >
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,

            wallet: wallet,
            setWallet: setWallet,

            allTransactions: allTransactions,
            setAllTransactions: setAllTransactions,
          }}
        >
          <NavigationContainer
            ref={navigationRef}
            initialState={{
              type: "drawer",
              key: "Root",
              routeNames: [navigatorInitialScreen.name],
              routes: [{
                name: navigatorInitialScreen.name,
              }],
              index: 0,
            }}
            onReady={onLayoutRootView}
          >
            <Drawer.Navigator>
              <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={() => ({
                  headerShown: false,
                  swipeEnabled: false,
                  drawerItemStyle: {
                    display: "none",
                  },
                })} />
              <Drawer.Screen
                name="Activated"
                component={ActivatedScreen}
                options={() => ({
                  headerShown: false,
                  swipeEnabled: false,
                  drawerItemStyle: {
                    display: "none",
                  },
                })} />
              <Drawer.Screen name="Main" component={MainScreen} />
              <Drawer.Screen name="Wallet" component={WalletScreen} />
              <Drawer.Screen name="Scan" component={ScanScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </TokensContext.Provider>
    </AppContext.Provider>
  );
}
