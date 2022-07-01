import React from 'react'
import { Provider } from 'react-redux';

import { AppRouter } from "./routers/AppRouter"
import { store } from './stores/store';

export const ExamenApp = () => {
  return (

    <Provider store ={ store }>

              <AppRouter />

    </Provider>
  )
}
