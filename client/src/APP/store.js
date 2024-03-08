import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);
export default store;