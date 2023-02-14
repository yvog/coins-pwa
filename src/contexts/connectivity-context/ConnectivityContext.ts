import { createContext, useContext } from 'react'

export type ConnectivityContextValues = {
  isOnline: boolean
}

export const ConnectivityContext = createContext<ConnectivityContextValues>(
  {} as ConnectivityContextValues
)

export const useConnectivityContext = (): ConnectivityContextValues =>
  useContext(ConnectivityContext)
