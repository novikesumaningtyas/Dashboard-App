import { createContext } from "react";
import { PartialDeep, ReadonlyDeep } from "type-fest";
import { FORM_MODE } from "../../lib/enum";

export interface IAppCollectionList {
  title: string;
  version: string;
}

export type IAppCollectionListWithConsent = IAppCollectionList & {
  acceptTermAndCondition?: boolean;
};

export type Method = "get" | "put" | "post" | "delete" | "patch";
export type AuthMethod =
  | "CLIENT_SECRET_POST"
  | "CLIENT_BASIC"
  | "PRIVATE_KEY_JWT"
  | "";

export interface IApi {
  title: string;
  version: string;
  tenant: string;
  meta?: any;
  paths: IPath[];
  requiredScopes: string;
}

interface IPath {
  path: string;
  methods: Method[];
  description: string;
}

interface IConsent {
  legals: string;
  expiry: string;
}

export interface ICollection {
  id: number;
  title: string;
  description: string;
  version: string;
  recommendedAuthMethod: AuthMethod;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  apis: IApi[];
  consent: IConsent;
}

export interface IClient {
  clientid: string;
  csid: string;
  type: string;
  sessionIdleTime: number;
  tokenExpiryTime: number;
  scopes: string[];
  clientSecret?: string;
}

export interface IApp {
  title: string;
  description: string;
  collections: IAppCollectionListWithConsent[];
  client: IClient;
  authMethod: AuthMethod;
  environmentType: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDeveloperAppConfig {
  apps: IApp[];
  collections: ICollection[];
  code: string;
  message: string;
}

export interface IMiniAppConfig {
  appConfigDetails: IDeveloperAppConfig;
  status: {
    miniAppInitialised: boolean;
  };
}

export type FormMode = FORM_MODE.EDIT | FORM_MODE.NEW | FORM_MODE.VIEW | '';

export interface IHistoryState {
  from?: string;
  appTitle?: string;
  appClientId?: string;
  appOriginal?: IApp;
  mode?: FormMode;
  heading?: string;
  subhead?: string;
  children?: React.ReactNode;
}

export type IAppConfig = ReadonlyDeep<PartialDeep<IMiniAppConfig>>;

export interface IMiniAppContext {
  renderRoot?: any;
  auth?: string;
}

export default createContext<IMiniAppContext>({ renderRoot: null });
