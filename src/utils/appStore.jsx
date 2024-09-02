import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../utils/userSlice";
import moviesReducer from "../utils/moviesSlice";
import gptReducer from "../utils/gptSlice";
import configReducer from "../utils/configSlice";

const appStore = configureStore({
  reducer: {
    user: useReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
