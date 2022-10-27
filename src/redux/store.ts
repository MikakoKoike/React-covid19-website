import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

//configureStoreはStoreを簡単に作るための関数
//storeはstateの状態(stateが1,2などの状態)
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
export type AppStore = typeof store.dispatch; //add
