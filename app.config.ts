import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [
    "react-native-nfc-manager",
  ],
  slug: "autobar",
  name: "Autobar",
  android: {
    package: "co.autobar.autobar",
  },
  extra: {
    eas: {
      projectId: "32e7eb66-8312-469a-b50b-a5446c05657a",
    },
  },
});
