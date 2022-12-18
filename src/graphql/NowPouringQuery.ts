import { gql } from "graphql-tag";

export default () => gql`
  query {
    nowPouring {
      module {
        id
        serialNumber
        prices
        unit
        currencyDisplayed
        createdAt

        product {
          id
          name
          description
          image
          type
          additionalData
          createdAt
        }
      }

      priceInfo {
        priceBeforePromos
        price
        currency

        promos {
          value
          percentage
          description
        }
      }
    }
  }
`;