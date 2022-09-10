import { DocumentNode, responsePathAsArray } from "graphql";
import { getServiceUri } from "./getServiceUri";
import { getTokensFromEncryptedStorage } from "./getTokensFromEncryptedStorage";

export async function sendGraphQL(query: DocumentNode, url?: string): Promise<any> {
  let gqlUrl = url || `${getServiceUri()}/graphql`;
  const { accessToken, refreshToken } = await getTokensFromEncryptedStorage();

  console.log("Sending GQL, tokens: ", { accessToken, refreshToken });

  if(query && query.loc) {
    const body = query.loc?.source.body;

    const response = await fetch(gqlUrl, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: body,
        access_token: accessToken,
        refresh_token: refreshToken,
      }),
    });

    try {
      const parsedResponse = await response.json();
      
      if(parsedResponse.errors) {
        throw new Error(parsedResponse.errors.map((error: any) => error.message).join(", "));
      } else {
        return parsedResponse.data;
      }
    } catch (e) {
      throw e;
    }
  }

  throw new Error("Empty query");
}