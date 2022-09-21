import { createContext } from 'react'
import { NfcManager } from "react-native-nfc-manager";

interface NfcContextType {
  nfcManager?: NfcManager;
  init: () => void;
  onDiscovery: (tag: any) => void;
  cleanUp: () => void;
}

export default createContext<NfcContextType>({
  nfcManager: undefined,
  init: () => {},
  onDiscovery: () => {},
  cleanUp: () => {},
})