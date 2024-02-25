import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/postApi";
import { commentsApi } from "./services/commentsApi";

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        postsApi.middleware,
        commentsApi.middleware,
      ]),
  });
};
