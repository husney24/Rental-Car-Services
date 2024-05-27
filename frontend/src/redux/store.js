import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import carIdReducer from './slices/carIdSlice'
import driverIdReducer from './slices/driverIdSlice'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: loginSlice,
  carId: carIdReducer,
  driverId: driverIdReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, REGISTER, PURGE],
      },
    }),
});

export const persistor = persistStore(store);
