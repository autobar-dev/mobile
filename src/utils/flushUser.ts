import MeQuery from "../graphql/MeQuery";
import User from "../types/User";
import { getServiceUri } from "./getServiceUri";
import { sendGraphQL } from "./sendGraphQL";

type UserValueAndDispatcher = {
  user: User | undefined;
  setUser: Function;
};

export default async function flushUser({ user, setUser }: UserValueAndDispatcher) {
  const query = MeQuery();

  console.log("Flushing user...");

  try {
    const { me } = await sendGraphQL(query);
    setUser(me);

    console.log("User flushed.");
  } catch(e) {
    setUser(undefined);

    console.log("Error flushing user:", e);
  }
}