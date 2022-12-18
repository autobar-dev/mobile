import { createContext } from 'react'
import User from '../types/User'

interface UserContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => any;
  flushUser: () => Promise<any>;
  flushUserAfterPouring: () => Promise<any>;
}

export default createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  flushUser: async () => {},
  flushUserAfterPouring: async () => {},
})