import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./global/globalSlice";
import { globalApi } from "./global/globalApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(globalApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
