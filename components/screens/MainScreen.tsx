import * as React from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { Text } from "react-native";

export function MainScreen() {
  const { session, accountEmail } = React.useContext(SessionContext);

  return (
    <>
      <Text>Session: {session}</Text>
      <Text>Email: {accountEmail}</Text>
    </>
  );
}
