import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import chartReducer from "./chartSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
