import * as React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { ActivationSession } from "../../types/ActivationSession";
import { Module } from "../../types/Module";
import { Product } from "../../types/Product";

export function ActivatedScreen({ route, navigation }) {
  const { serial_number } = route.params;

  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [module, setModule] = React.useState<Module | undefined>(undefined);
  const [product, setProduct] = React.useState<Product | undefined>(undefined);
  const [activationSession, setActivationSession] = React.useState<ActivationSession | undefined>(undefined);

  const [deactivateLoading, setDeactivateLoading] = React.useState<boolean>(false);

  const [fetchingActivationSession, setFetchingActivationSession] = React.useState<boolean>(false);


  const refreshActivationSession = () => {
    console.log("Refreshing activation session...");

    if (fetchingActivationSession) {
      return;
    }

    setFetchingActivationSession(true);

    providers.module.getActivationSession(tokens)
      .then(session => {
        setActivationSession(session);
      })
      .catch(e => {
        if (!activationSession) {
          navigation.navigate("Main");
        }

        console.log("Error getting activation session", e);
        setActivationSession(undefined);
      })
      .finally(() => setFetchingActivationSession(false));
  }

  React.useEffect(() => {
    const cancel = setInterval(() => {
      refreshActivationSession();
    }, 1000);

    refreshActivationSession();

    return () => {
      clearInterval(cancel);
    };
  }, []);

  React.useEffect(() => {
    providers.module.getModule(tokens, serial_number)
      .then(module => {
        setModule(module);

        providers.product.getProduct(tokens, module.product_id)
          .then(product => {
            setProduct(product);
          })
          .catch(e => console.log("Error getting product", e));
      })
      .catch(e => console.log("Error getting module", e));
  }, []);

  if (!module || !product || !activationSession) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              marginBottom: 16,
            }}
          >
            <Button
              onPress={async () => {
                setDeactivateLoading(true);

                try {
                  await providers.module.deactivate(tokens);
                  navigation.navigate("Main");
                } catch (e) {
                  console.log("Error deactivating module", e);
                }

                setDeactivateLoading(false);
              }}
              title={deactivateLoading ? "Deactivating..." : "Deactivate"}
              disabled={deactivateLoading}
            />
          </View>
          <Text
            style={{
              marginBottom: 8,
            }}
          >Module: {module ? JSON.stringify(module) : ""}</Text>
          <Text
            style={{
              marginBottom: 8,
            }}
          >Product: {product ? JSON.stringify(product) : ""}</Text>
          <Text
            style={{
              marginBottom: 8,
            }}
          >Activation session: {activationSession ? JSON.stringify(activationSession) : ""}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
