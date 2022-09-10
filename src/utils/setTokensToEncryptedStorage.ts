import EncryptedStorage from "react-native-encrypted-storage";

type SetTokensType = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

export async function setTokensToEncryptedStorage(tokens: SetTokensType) {
  await setAccessTokenToEncryptedStorage(tokens.accessToken);
  await setRefreshTokenToEncryptedStorage(tokens.refreshToken);
}

export async function setAccessTokenToEncryptedStorage(token: string | undefined | null) {
  if(token === null) {
    try {
      await EncryptedStorage.removeItem("access_token");
    } catch(e) {
      console.log("Error removing access token from encrypted storage", e);
    }
  } else if(token) {
    try {
      await EncryptedStorage.setItem(
        "access_token",
        token,
      );
    } catch(e) {
      console.log("Error setting access token to encrypted storage", e);
    }
  }
}

export async function setRefreshTokenToEncryptedStorage(token: string | undefined | null) {
  if(token === null) {
    try {
      await EncryptedStorage.removeItem("refresh_token");
    } catch(e) {
      console.log("Error removing refresh token from encrypted storage", e);
    }
  } else if(token) {
    try {
      await EncryptedStorage.setItem(
        "refresh_token",
        token,
      );
    } catch(e) {
      console.log("Error setting refresh token to encrypted storage", e);
    }
  }
}