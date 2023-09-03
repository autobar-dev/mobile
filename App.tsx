import * as React from "react";
import { LoginScreen } from "./components/screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { MainScreen } from "./components/screens/MainScreen";
import { Tokens } from "./utils/Tokens";
import { AuthProvider } from "./providers/Auth";
import { Meta } from "./types/Meta";
import { TokensContext } from "./contexts/TokensContext";
import { AppContext } from "./contexts/AppContext";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "./utils/Requests";
import { UserProvider } from "./providers/User";
import { UserExtended } from "./types/User";
import { UserContext } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [tokens, setTokens] = React.useState<Tokens | undefined>(undefined);
  const [user, setUser] = React.useState<UserExtended | undefined>(undefined);

  const meta: Meta = {
    version: "0.0.1",
    hash: "no-commit",
  };

  const authProvider = new AuthProvider("https://api.autobar.ovh/auth", meta);

  const apiClient = new ApiClient(authProvider, meta, setTokens);
  const userProvider = new UserProvider("https://api.autobar.ovh/user", apiClient);

  React.useEffect(() => {
    SecureStore.getItemAsync("refresh_token").then(async refreshTokenFromSecureStore => {
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
      }
    });
  }, []);

  React.useEffect(() => {
    // console.log("Tokens changed", tokens);

    if (!tokens) {
      SecureStore.deleteItemAsync("refresh_token").then(() => {
        navigationRef.resetRoot({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }).catch(_e => {});
    } else {
      SecureStore.setItemAsync("refresh_token", tokens.refresh_token)
        .then(async () => {
          const user = await userProvider.whoAmI(tokens);
          setUser(user);

          if (navigationRef.getCurrentRoute()?.name === "Login") {
            navigationRef.resetRoot({
              index: 0,
              routes: [{ name: "Main" }],
            });
          }
        })
        .catch(() => {});
    }
  }, [tokens]);

  return (
    <AppContext.Provider
      value={{
        providers: {
          auth: authProvider,
          user: userProvider,
        },
      }}
    >
      <TokensContext.Provider
        value={{
          tokens: tokens,
          setTokens: setTokens,
        }}
      >
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </TokensContext.Provider>
    </AppContext.Provider>
  );
}
