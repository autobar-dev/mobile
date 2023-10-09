import * as React from "react";
import { RefreshControl, Text, View } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { Currency } from "../../types/Currency";
import { moneyDisplayDecimal } from "../../utils/Wallet";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export function WalletScreen() {
  const {
    wallet, setWallet,
    allTransactions, setAllTransactions,
  } = React.useContext(UserContext);
  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [uniqueCurrencies, setUniqueCurrencies] = React.useState<Map<string, Currency>>(new Map());

  const [currenciesLoading, setCurrenciesLoading] = React.useState<boolean>(true);
  const [walletLoading, setWalletLoading] = React.useState<boolean>(true);
  const [transactionsLoading, setTransactionsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setCurrenciesLoading(true);

    const currencyCodes = allTransactions.map(transaction => transaction.currency_code);
    currencyCodes.push(wallet.currency_code);

    const uniqueCurrencyCodes = [...new Set(currencyCodes)];
    const uniqueCurrencies: Map<string, Currency> = new Map();

    const currencyPromises = uniqueCurrencyCodes.map(async currencyCode => {
      try {
        const currency = await providers.currency.getCurrency(tokens, currencyCode);
        uniqueCurrencies.set(currency.code, currency);
      } catch (e) {
        console.log("Error getting currency", e);
      }
    });

    Promise.all(currencyPromises).then(() => {
      setUniqueCurrencies(uniqueCurrencies);
      setCurrenciesLoading(false);
    });
  }, [wallet, allTransactions]);

  const refresh = React.useCallback(async () => {
    setTransactionsLoading(true);

    providers.wallet.getWallet(tokens)
      .then(refreshedWallet => {
        setWallet(refreshedWallet);
      })
      .catch(e => {
        console.log("Error getting wallet", e);
      })
      .finally(() => {
        setWalletLoading(false);
      });

    providers.wallet.getAllTransactions(tokens)
      .then(refreshedAllTransactions => {
        setAllTransactions(refreshedAllTransactions);
      })
      .catch(e => {
        console.log("Error getting wallet", e);
      })
      .finally(() => {
        setTransactionsLoading(false);
      });
  }, [tokens]);

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={walletLoading || transactionsLoading || currenciesLoading}
              onRefresh={refresh}
            />
          }
        >
          {
            (walletLoading || transactionsLoading || currenciesLoading) ? (
              <Text>Loading...</Text>
            ) : (
              <View>
                <View
                  style={{
                    padding: 16,
                  }}
                >
                  <Text>Balance</Text>
                  <Text
                    style={{
                      fontSize: 32,
                      width: "100%",
                      alignContent: "center",
                    }}
                  >
                    {
                      moneyDisplayDecimal(
                        wallet.balance,
                        uniqueCurrencies.get(wallet.currency_code).minor_unit_divisor)
                    } {
                      uniqueCurrencies.get(wallet.currency_code).symbol ?? uniqueCurrencies.get(wallet.currency_code).code
                    }
                  </Text>
                </View>
                {
                  allTransactions
                    .sort((a, b) => {
                      const aCreatedAt = new Date(a.created_at);
                      const bCreatedAt = new Date(b.created_at);

                      return bCreatedAt.getTime() - aCreatedAt.getTime();
                    })
                    .map(transaction => {
                      const transactionCurrency = uniqueCurrencies.get(transaction.currency_code);
                      return (
                        <View
                          key={`transaction-${transaction.id}`}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            width: "100%",
                          }}
                        >
                          <Text>
                            {transaction.id.slice(0, 6)}
                            &nbsp;- {moneyDisplayDecimal(transaction.value, transactionCurrency.minor_unit_divisor)} {transactionCurrency.symbol ?? transactionCurrency.code}
                            &nbsp;- {transaction.type}
                          </Text>
                          <Text>{transaction.created_at}</Text>
                        </View>
                      );
                    })
                }
              </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
