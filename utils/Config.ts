export type Config = {
  EXPO_PUBLIC_AUTH_SERVICE_URL: string,
};

export const config = process.env as Config;
