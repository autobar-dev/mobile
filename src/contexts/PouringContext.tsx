import { createContext } from 'react'
import User from '../types/User'

interface PouringContextType {
  pouringSerialNumber?: string;
  setPouringSerialNumber: (serialNumber?: string) => any;
  // flushUser: () => any;
}

export default createContext<PouringContextType>({
  pouringSerialNumber: undefined,
  setPouringSerialNumber: () => {},
  // flushUser: async () => {},
})