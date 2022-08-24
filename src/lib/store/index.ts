import { IMiniAppConfig } from "../../components/AppContainer/AppContext";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStoreWithReducers = (preloadedState?: IMiniAppConfig) => {
  const store =
    process.env.NODE_ENV === "development"
      ? createStore(
          rootReducer,
          preloadedState,
          composeEnhancer(applyMiddleware(logger))
        )
      : createStore(rootReducer, preloadedState);

      return store;
};
