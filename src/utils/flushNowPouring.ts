import NowPouringQuery from "../graphql/NowPouringQuery";
import PouringInfo from "../types/PouringInfo";
import { sendGraphQL } from "./sendGraphQL";

type NowPouringValueAndDispatcher = {
  nowPouring?: PouringInfo | null;
  setNowPouring: Function;
};

export default async function flushNowPouring({ nowPouring, setNowPouring }: NowPouringValueAndDispatcher) {
  const query = NowPouringQuery();

  console.log("Flushing now pouring...");

  try {
    const { nowPouring } = await sendGraphQL(query);
    setNowPouring(nowPouring);

    console.log("Now pouring flushed.");
  } catch(e) {
    setNowPouring(undefined);

    console.log("Error flushing now pouring:", e);
  }
}