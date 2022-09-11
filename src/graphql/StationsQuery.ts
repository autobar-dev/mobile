import { gql } from "graphql-tag";

type StationsQueryProps = {
  latitude: number;
  longitude: number;
  radius: number;
};

export default (props: StationsQueryProps) => gql`
  query {
    stations(latitude: ${props.latitude}, longitude: ${props.longitude}, radius: ${props.radius}) {
      id
      
      name
      description

      location
    }
  }
`;