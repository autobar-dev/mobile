import * as React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "../../types/Product";
import { TextInputWithSection } from "../molecules/TextInputWithSection";
import { SearchProductResult } from "../organisms/SearchProductResult";

export function SearchScreen() {
  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [searchLoading, setSearchLoading] = React.useState<boolean>(false);

  const [term, setTerm] = React.useState<string>("");
  const [products, setProducts] = React.useState<Product[]>([]);

  const search = React.useCallback(async (searchTerm: string) => {
    setSearchLoading(true);

    providers.product.search(tokens, searchTerm)
      .then(products => {
        setProducts(products);
      })
      .catch(e => {
        console.log("Error performing search", e);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  }, [tokens]);

  React.useEffect(() => {
    if (term.length > 1) {
      search(term);
    } else {
      setProducts([]);
    }
  }, [term]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <TextInputWithSection
            style={{
              width: "100%",
              height: 35,
              paddingLeft: 15,
              paddingRight: 40,
            }}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={term}
            onChangeText={setTerm}
            section={searchLoading ? (
              <ActivityIndicator size={"small"} />
            ) : undefined}
          />
          <ScrollView
            style={{
              marginTop: 10,
              flex: 1,
              width: "100%",
            }}
          >
            {products.map((product, id) => (
              <TouchableOpacity
                key={`search-result-${id}`}
                onPress={() => console.log(product.id)}
              >
                <SearchProductResult
                  product={product}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
