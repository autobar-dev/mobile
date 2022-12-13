import { gql } from "graphql-tag";

export default () => gql`
  query {
    nowPouring {
      module {
        serialNumber
        prices

        product {
          name
          description
          image
          additionalData
        }
      }

      price {
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