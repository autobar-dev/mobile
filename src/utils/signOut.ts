import { getServiceUri } from "./getServiceUri";
import { getTokensFromEncryptedStorage } from "./getTokensFromEncryptedStorage";
import { setTokensToEncryptedStorage } from "./setTokensToEncryptedStorage";

export default async function signOut() {
  const { accessToken, refreshToken } = await getTokensFromEncryptedStorage();

  const response = await fetch(`${getServiceUri()}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
    }),
  });

  if(response.status == 200) {
    setTokensToEncryptedStorage({
      accessToken: null,
      refreshToken: null,
    });

    return;
  } else {
    throw new Error("Error signing out");
  }
}