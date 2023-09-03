import { Meta } from "../types/Meta";

export function metaToUserAgent(meta: Meta) {
  return `AutobarMobile/${meta.version}`;
}
