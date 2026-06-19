import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// react-router
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// redux
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

// redux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// inject store vào axios instance
import { injectStore } from './utils/authorizeAxios'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
