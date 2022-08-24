import {
  IDeveloperAppConfig,
  IMiniAppConfig,
} from "./../../components/AppContainer/AppContext";
import { ISharedActions, MINI_APP_INITIALISED } from "./shared.action";
import {
  appStateReducer,
  INITIAL_COLLECTION_STATE,
  INITIAL_CREATE_APP_DETAILS_STATE,
} from "./state.reducer";
import produce from "immer";
import { IStatus } from "./state.action";

export interface IAppStoreState {
  appConfigDetails: IDeveloperAppConfig;
  status: IStatus;
}

export const INITIAL_STATE: IMiniAppConfig = {
  appConfigDetails: {
    apps: INITIAL_CREATE_APP_DETAILS_STATE,
    collections: INITIAL_COLLECTION_STATE,
    code: "",
    message: "",
  },
  status: {
    miniAppInitialised: false,
  },
};

/**
 * Root reducer for the mini app.
 *
 * The 'appConfigDetails' field must match the object passed from and to bff, as well asin Confluence page.
 *
 * Use fields outside of 'appConfigDetails' to capture state local of the mini app
 */
function rootReducer(
  state: IMiniAppConfig = INITIAL_STATE,
  action: ISharedActions
): IMiniAppConfig {
  return produce(state, (draft) => {
    // this step is only for initialization
    // assume we only call once for query backend (apps available and api collections)
    draft.appConfigDetails = appStateReducer(
      state.appConfigDetails,
      action as ISharedActions
    );

    if (action.type === MINI_APP_INITIALISED) {
      draft.status.miniAppInitialised = action.payload;
    }
  });
}

export default rootReducer;