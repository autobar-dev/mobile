import MeQueryAfterPouring from "../graphql/MeQueryAfterPouring";
import PouringInfo from "../types/PouringInfo";
import User from "../types/User";
import flushNowPouring from "./flushNowPouring";
import { sendGraphQL } from "./sendGraphQL";
import merge from "lodash.merge";

type UserValueAndDispatcher = {
  user: User | undefined;
  setUser: Function;
};

type NowPouringValueAndDispatcher = {
  nowPouring: PouringInfo | null | undefined;
  setNowPouring: Function;
};

export default async function flushUserAfterPouring({ user, setUser }: UserValueAndDispatcher, { nowPouring, setNowPouring }: NowPouringValueAndDispatcher) {
  const userQuery = MeQueryAfterPouring();

  if(user) {
    console.log("Flushing now pouring...");

    await flushNowPouring(
      { nowPouring, setNowPouring }
    );

    console.log("Flushing user after pouring...");

    try {
      const { me } = await sendGraphQL(userQuery);
      setUser(
        merge(user, me)
      );

      console.log("User after pouring flushed.");
    } catch(e) {
      // setUser(undefined);

      console.log("Error flushing user after pouring:", e);
    }
  }
}