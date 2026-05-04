import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";
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

// In some ESM environments (like Vite), redux-persist/lib/storage could be wrapped in a 'default' object
const persistStorage = (storage as any)?.default || storage;

const persistConfig = {
  key: "root",
  version: 1,
  storage: persistStorage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "povs/setPovs",
          "povs/appendPovs",
          "myPovs/setMyPovs",
        ],
        ignoredActionPaths: ["payload.lastVisible"],
        ignoredPaths: [
          "povs.lastVisible",
          "myPovs.lastVisible",
          "userAccount._snapshot",
          "userAccount.updatedAt",
          "userAccount.createdAt",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
