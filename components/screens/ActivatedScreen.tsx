import * as React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { Module } from "../../types/Module";
import { Product } from "../../types/Product";

export function ActivatedScreen({ route, navigation }) {
  const { serial_number } = route.params;

  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [module, setModule] = React.useState<Module | undefined>(undefined);
  const [product, setProduct] = React.useState<Product | undefined>(undefined);

  const [deactivateLoading, setDeactivateLoading] = React.useState<boolean>(false);

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

  if (!module || !product) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <SafeAreaView>
        <View
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
          <Text>Product: {product ? JSON.stringify(product) : ""}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
