import { IDeveloperAppConfig } from "../../components/AppContainer/AppContext";
import { PartialDeep, ReadonlyDeep } from "type-fest";

export const LOAD_APP_CONFIG_TO_STORE = 'developerApp/shared/LOAD_APP_CONFIG_TO_STORE';
export const MINI_APP_INITIALISED = 'developerApp/shared/MINI_APP_INITIALISED';

export interface Action<A extends string, P> {
  type: A;
  payload: P
}

export type ISharedActions = 
  | Action<typeof LOAD_APP_CONFIG_TO_STORE, ReadonlyDeep<PartialDeep<IDeveloperAppConfig>>>
  | Action<typeof MINI_APP_INITIALISED, boolean>;

/**
 * Use to indicate that mini app has finished making its pre-requisite 
 * BFF calls and loaded appConfig to the store
 */
export function setMiniAppInitialised(hasFinishedInitialisation: boolean): ISharedActions {
  return {
    type: MINI_APP_INITIALISED,
    payload: hasFinishedInitialisation
  }
}

/**
 * Loads the 'appConfig' object passed from BFF query call to the mini app
 * as a prop into the store
 * 
 * @param appConfigDetails 
 * @returns 
 */
export function loadAppConfigToStore(
  appConfigDetails: ReadonlyDeep<PartialDeep<IDeveloperAppConfig>> = {}
): ISharedActions {
   return {
     type: LOAD_APP_CONFIG_TO_STORE,
     payload: appConfigDetails
   }
}