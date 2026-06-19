import { userReducer } from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

const safeStorage = storage.default || storage

const rootPersistConfig = {
  key: 'root',
  storage: safeStorage,
  whitelist: ['user'] // Keep user logged in across page reloads
}

const reducers = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
