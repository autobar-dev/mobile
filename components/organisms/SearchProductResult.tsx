import * as React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { Product } from "../../types/Product";

export function SearchProductResult({ product }: {
  product: Product,
}) {
  const { providers } = React.useContext(AppContext);

  const name = React.useMemo(() => {
    let name = "";
    for (const n in product.names) {
      name = product.names[n];
    }

    return name;
  }, [product.names]);

  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [imageLoading, setImageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setImageLoading(true);

    const resizedImageUrl = providers.image.resize(product.cover.url, 400, 400);
    setImageUrl(resizedImageUrl);
  }, [product.cover]);

  return (
    <View
      style={{
        width: "100%",
        height: 85,
        backgroundColor: "#fff",
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 5,
            marginRight: 10,
            backgroundColor: "#eee",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageLoading && (
            <ActivityIndicator
              size="small"
              style={{
                position: "absolute",

              }}
            />
          )}
          {imageUrl && (
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 5,
                opacity: imageLoading ? 0 : 1,
              }}
              source={{
                uri: imageUrl,
              }}
              onLoadStart={() => {
                setImageLoading(true);
              }}
              onLoadEnd={() => {
                setImageLoading(false);
              }}
            />
          )}
        </View>
        <View
          style={{
            marginLeft: 5,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >{name}</Text>
        </View>
      </View>
    </View>
  );
}
