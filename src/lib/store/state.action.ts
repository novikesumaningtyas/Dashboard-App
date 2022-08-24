import {
  IClient,
  IApp,
  IAppCollectionList,
  AuthMethod,
  IAppCollectionListWithConsent,
} from "../../components/AppContainer/AppContext";
import { Action } from "./shared.action";

export const APP_TITLE_UPDATE =
  "developerApp/CreateAppDetails/APP_TITLE_UPDATE";
export const APP_DESCRIPTION_UPDATE =
  "developerApp/CreateAppDetails/APP_DESCRIPTION_UPDATE";
export const CREATE_APP_DETAILS_NEW =
  "developerApp/CreateAppDetails/CREATE_APP_DETAILS_NEW";
export const CREATE_APP_DETAILS_CANCEL =
  "developerApp/CreateAppDetails/CREATE_APP_DETAILS_CANCEL";
export const CREATE_APP_COLLECTION_ADD =
  "developerApp/CreateAppDetails/CREATE_APP_COLLECTION_ADD";
export const CREATE_APP_COLLECTION_CANCEL =
  "developerApp/CreateAppDetails/CREATE_APP_COLLECTION_CANCEL";
export const CREATE_APP_SELECT_AUTH =
  "developerApp/CreateAppDetails/CREATE_APP_SELECT_AUTH";
export const CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND =
  "developerApp/CreateAppDetails/CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND";
export const DELETE_APP = "developerApp/DELETE_APP";
export const CREATE_APP_CLIENT_DETAILS_UPDATE =
  "developerApp/CreateAppDetails/CREATE_APP_CLIENT_DETAILS_UPDATE";
export const DELETE_APP_CLIENT_SECRET_UPDATE =
  "developerApp/CreateAppDetails/DELETE_APP_CLIENT_SECRET_UPDATE";
export const CANCEL_EDIT_APP = "developerApp/EditAppDetails/CANCEL_EDIT_APP";

/** INTERFACES */

export interface IStatus {
  miniAppInitialised: boolean;
}

interface IAppIndex {
  appIndex: number;
}

export interface ICollectionUpdate extends IAppIndex {
  collections: IAppCollectionList | IAppCollectionList[];
}

export interface IAppTermAndCondUpdate extends IAppIndex {
  collections: IAppCollectionListWithConsent;
}

export interface IAppDetailsUpdate extends IAppIndex {
  app: Partial<IApp>;
}

export interface IAuthUpdate extends IAppIndex {
  auth: AuthMethod;
}

export interface IClientUpdate extends IAppIndex  {
  client: Partial<IClient>;
}

export type IAppDetailsActions =
  | Action<typeof APP_TITLE_UPDATE, IAppDetailsUpdate>
  | Action<typeof APP_DESCRIPTION_UPDATE, IAppDetailsUpdate>
  | Action<typeof CREATE_APP_CLIENT_DETAILS_UPDATE, IClientUpdate>
  | Omit<Action<typeof CREATE_APP_DETAILS_NEW, undefined>, "payload">
  | Omit<Action<typeof CREATE_APP_DETAILS_CANCEL, undefined>, "payload">
  | Action<typeof DELETE_APP_CLIENT_SECRET_UPDATE, Partial<IApp>>
  | Action<typeof CREATE_APP_COLLECTION_ADD, ICollectionUpdate>
  | Action<typeof CREATE_APP_COLLECTION_CANCEL, ICollectionUpdate>
  | Action<typeof CREATE_APP_SELECT_AUTH, IAuthUpdate>
  | Action<
      typeof CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND,
      IAppTermAndCondUpdate
    >
  | Action<typeof CANCEL_EDIT_APP, IApp>
  | Action<typeof DELETE_APP, Partial<IApp>>;


  /** FUNCTIONS REDUCER */

export function deleteApp(data: Partial<IApp>): IAppDetailsActions {
  return {
    type: DELETE_APP,
    payload: data
  }
}

export function updateAppTitle(data: IAppDetailsUpdate): IAppDetailsActions {
  return {
    type: APP_TITLE_UPDATE,
    payload: data
  }
}


export function updateAppDescription(data: IAppDetailsUpdate): IAppDetailsActions {
  return {
    type: APP_DESCRIPTION_UPDATE,
    payload: data
  }
}

export function cancelEditApp(data: IApp): IAppDetailsActions {
  return {
    type: CANCEL_EDIT_APP,
    payload: data
  }
}

export function updateAppClientDetails(data: IClientUpdate): IAppDetailsActions {
  return {
    type: CREATE_APP_CLIENT_DETAILS_UPDATE,
    payload: data
  }
}

export function deleteAppClientSecret(data: Partial<IApp>): IAppDetailsActions {
  return {
    type: DELETE_APP_CLIENT_SECRET_UPDATE,
    payload: data
  }
}

export function createNewAppDetails(): IAppDetailsActions {
  return {
    type: CREATE_APP_DETAILS_NEW
  }
}

export function cancelCreateNewAppDetails(): IAppDetailsActions {
  return {
    type: CREATE_APP_DETAILS_CANCEL
  }
}

export function addCreateAppCollections(data: ICollectionUpdate): IAppDetailsActions {
  return {
    type: CREATE_APP_COLLECTION_ADD,
    payload: data
  }
}

export function cancelAddCreateAppCollections(data: ICollectionUpdate): IAppDetailsActions {
  return {
    type: CREATE_APP_COLLECTION_CANCEL,
    payload: data
  }
}

export function selectCreateAppAuth(data: IAuthUpdate): IAppDetailsActions {
  return {
    type: CREATE_APP_SELECT_AUTH,
    payload: data
  }
}

export function createAppCollectionTermAndCondition(data: IAppTermAndCondUpdate): IAppDetailsActions {
  return {
    type: CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND,
    payload: data
  }
}