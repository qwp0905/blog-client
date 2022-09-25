import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import Loading from './components/loading.component'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <Loading />
      <App />
    </PersistGate>
  </Provider>
)
