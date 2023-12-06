import { createContext } from 'react'

export const userContext = createContext({
  userData: {
    id: undefined,
    image_profile: undefined
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserData: v => {}
})
