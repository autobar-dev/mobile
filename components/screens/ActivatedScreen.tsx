import * as React from "react";
import { Button, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { ActivationSession } from "../../types/ActivationSession";
import { Module } from "../../types/Module";
import { Product, ProductBadge } from "../../types/Product";
import { Badge } from "../atoms/Badge";

export function ActivatedScreen({ route, navigation }) {
  const { serial_number } = route.params;

  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [module, setModule] = React.useState<Module | undefined>(undefined);
  const [product, setProduct] = React.useState<Product | undefined>(undefined);
  const [activationSession, setActivationSession] = React.useState<ActivationSession | undefined>(undefined);

  const [coverImage, setCoverImage] = React.useState<string | undefined>(undefined);
  const [productName, setProductName] = React.useState<string | undefined>(undefined);
  const [productDescription, setProductDescription] = React.useState<string | undefined>(undefined);
  const [productBadges, setProductBadges] = React.useState<ProductBadge[] | undefined>(undefined);

  const [deactivateLoading, setDeactivateLoading] = React.useState<boolean>(false);

  const [fetchingActivationSession, setFetchingActivationSession] = React.useState<boolean>(false);

  const refreshActivationSession = () => {
    if (fetchingActivationSession) {
      console.log("Skipping refreshing activation session...");
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
    }, 10000);

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
            console.log(product);
            console.log(product.cover);
            setProduct(product);

            const productCoverUrl = product.cover.url;
            const productName = product.names.values().next().value;
            const productDescription = product.descriptions.values().next().value;

            setCoverImage(
              providers.image.resize(productCoverUrl, 600, 600)
            );
            setProductName(productName);
            setProductDescription(productDescription);
            setProductBadges(productBadges);
          })
          .catch(e => console.log("Error getting product", e));
      })
      .catch(e => console.log("Error getting module", e));
  }, []);

  if (!module || !product || !activationSession || !coverImage || !productName || !productDescription) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: "column",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              marginTop: 16,
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
          <Image
            style={{
              width: 200,
              height: 200,
              marginTop: 25,
              borderRadius: 10,
              backgroundColor: "#eee",
            }}
            source={{
              uri: coverImage,
            }}
          />
          <Text
            style={{
              marginTop: 26,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >{productName}</Text>
        </View>
        <ScrollView
          style={{
            flex: 1,
            marginTop: 16,
          }}
        >
          {product.badges && (
            <ScrollView
              horizontal={true}
            >
              {product.badges.map((badge, i) => (
                <Badge
                  type={badge.type}
                  color="#000"
                  label={badge.label}
                  value={badge.value}
                  key={`product-badge-${i}`}
                  style={{
                    marginLeft: i == 0 ? 16 : 0,
                    marginRight: i == product.badges.length - 1 ? 16 : 8,
                  }}
                />
              ))}
            </ScrollView>
          )}
          <Text
            style={{
              marginTop: 14,
              paddingHorizontal: 16,
              textAlign: "justify",
            }}
          >{productDescription}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
