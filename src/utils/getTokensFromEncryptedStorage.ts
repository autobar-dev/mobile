import EncryptedStorage from "react-native-encrypted-storage";

type GetTokensType = {
  accessToken?: string;
  refreshToken?: string;
};

export async function getTokensFromEncryptedStorage(): Promise<GetTokensType> {
  const accessToken = await getAccessTokenFromEncryptedStorage();
  const refreshToken = await getRefreshTokenFromEncryptedStorage();

  return {
    accessToken,
    refreshToken,
  };
}

export async function getAccessTokenFromEncryptedStorage(): Promise<string | undefined> {
  try {
    const accessToken = await EncryptedStorage.getItem("access_token");
    
    if(accessToken) {
      return accessToken;
    }
  } catch(e) {
    console.log("Error getting access token from encrypted storage", e);
  }

  return undefined;
}

export async function getRefreshTokenFromEncryptedStorage(): Promise<string | undefined> {
  try {
    const refreshToken = await EncryptedStorage.getItem("refresh_token");
    
    if(refreshToken) {
      return refreshToken;
    }
  } catch(e) {
    console.log("Error getting refresh token from encrypted storage", e);
  }

  return undefined;
}