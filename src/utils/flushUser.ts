import MeQuery from "../graphql/MeQuery";
import User from "../types/User";
import { getServiceUri } from "./getServiceUri";
import { sendGraphQL } from "./sendGraphQL";

export default async function flushUser(user: User | undefined, setUser: Function) {
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