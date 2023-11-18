import { configureStore } from "@reduxjs/toolkit";
import kpiSlice from "./kpiSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { dashBoardAPI } from "./api.ts";

// export const store = configureStore({
//   reducer: {
//     [dashBoardAPI.reducerPath]: dashBoardAPI.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(dashBoardAPI.middleware),
// });

// setupListeners(store.dispatch);

// import { configureStore } from "@reduxjs/toolkit";
// // ...

export const store = configureStore({
  reducer: {
    kpis: kpiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
