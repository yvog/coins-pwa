import { createContext, useContext } from 'react'
import { KeyedMutator } from 'swr'

export type AuthContextValues = {
  prevAuthRequired: boolean | undefined
  authRequired: boolean | undefined
  revalidateAuth: KeyedMutator<unknown>
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const useAuthContext = (): AuthContextValues => useContext(AuthContext)
