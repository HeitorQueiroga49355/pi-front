import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { userContext } from '../contexts/userDataContext'
import { getMeData } from '../services/account'

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState<any>({})
  useEffect(() => {
    getMeData(setUserData).then(res => {
      console.log(res)
      setUserData(res)
    })
  }, [])
  return (
    <userContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </userContext.Provider>
  )
}

export default MyApp
