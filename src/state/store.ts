// src/state/store.ts
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { rootReducer } from "./reducers";

// createLogger()'s return type isn't accepted directly by RTK under strict TS settings,
// so cast it to Middleware (safe here because redux-logger produces a standard middleware).
const loggerMiddleware = createLogger() as unknown as Middleware;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(loggerMiddleware)
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
