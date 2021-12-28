import React from 'react'
import Head from 'next/head'
import store from '../store/store'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material/styles'

const MyApp = ({ Component, pageProps }) => {
  return(
    <React.Fragment>
      <Head>
      </Head>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </Provider>
    </React.Fragment>
  )
}

export default MyApp