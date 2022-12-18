import { createContext } from 'react'
import PouringInfo from '../types/PouringInfo';

interface NowPouringContextType {
  nowPouring: PouringInfo | null | undefined;
  setNowPouring: (data: PouringInfo | null | undefined) => any;
  isNowPouringLoading: boolean;
  setIsNowPouringLoading: (data: boolean) => any;
  flushNowPouring: () => Promise<any>;
}

export default createContext<NowPouringContextType>({
  nowPouring: undefined,
  setNowPouring: () => {},
  flushNowPouring: async () => {},
  isNowPouringLoading: false,
  setIsNowPouringLoading: () => {},
})