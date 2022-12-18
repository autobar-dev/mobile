import { gql } from "graphql-tag";

export default () => gql`
  query {
    me {
      balance
      balanceCurrency

      purchases {
        id
        amount
        paid
        currency
        active
        startedAt
        finishedAt

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
    }
  }
`;