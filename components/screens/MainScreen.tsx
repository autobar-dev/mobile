import * as React from "react";
import { Button, Text } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";

export function MainScreen() {
  const { user } = React.useContext(UserContext);
  const { tokens, setTokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  return (
    <>
      <Text>Hello {user.first_name}!</Text>
      <Button title="Logout" onPress={async () => {
        try {
          await providers.auth.logout(tokens.refresh_token);
          setTokens(undefined);
        } catch(e) {
          console.log("Logout error", e);
        }
      }} />
    </>
  );
}
