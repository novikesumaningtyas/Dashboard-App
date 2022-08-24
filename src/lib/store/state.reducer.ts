import React from "react";
import {
  IApp,
  ICollection,
  IDeveloperAppConfig,
} from "../../components/AppContainer/AppContext";
import produce from "immer";
import { isObject } from "lodash";
import { ISharedActions, LOAD_APP_CONFIG_TO_STORE } from "./shared.action";
import {
  APP_TITLE_UPDATE,
  APP_DESCRIPTION_UPDATE,
  CREATE_APP_DETAILS_NEW,
  CREATE_APP_DETAILS_CANCEL,
  CREATE_APP_COLLECTION_ADD,
  CREATE_APP_COLLECTION_CANCEL,
  CREATE_APP_SELECT_AUTH,
  CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND,
  DELETE_APP,
  CREATE_APP_CLIENT_DETAILS_UPDATE,
  DELETE_APP_CLIENT_SECRET_UPDATE,
  CANCEL_EDIT_APP,
  IAppDetailsActions,
} from "./state.action";

export const INITIAL_CREATE_APP_DETAILS_STATE: IApp[] = [
  {
    title: "NO APP",
    description: "",
    collections: [
      {
        title: "",
        version: "",
      },
    ],
    client: {
      clientid: "",
      csid: "",
      type: "",
      sessionIdleTime: 0,
      tokenExpiryTime: 0,
      scopes: [],
    },
    authMethod: "",
    environmentType: "",
    createdAt: "",
    updatedAt: "",
  },
];

export const INITIAL_COLLECTION_STATE: ICollection[] = [
  {
    id: 1,
    title: "Payments",
    description:
      "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    version: "v1.0",
    recommendedAuthMethod: "CLIENT_SECRET_POST",
    createdAt: "2021-08-4T00:33:42",
    apis: [
      {
        title: "Api title for Payment and some other thing that you do",
        version: "v1.0",
        tenant: "apigw",
        meta: {},
        paths: [
          {
            path: "/v1/apigw/open-api/apps",
            methods: ["get", "post"],
            description: "Payment - this is description",
          },
          {
            path: "/v1/apigw/open-api/apps/{app_title}",
            methods: ["put", "delete", "post"],
            description: "Payment - this is another description",
          },
        ],
        requiredScopes: "apigw:open_api",
      },
    ],
    consent: {
      legals: `Please read these Conditions of Use carefully before using this site. You should review
        the Conditions of Use regularly as they may change at any time. References to "Web
        Sites" and "Sites" mean both the singular and plural of these terms. References to "you"
        or "your" shall mean the person authorized to access and use this site. References to
        "we", "us" or "our" shall mean the Company. `,
      expiry: "2025-08-4T00:33:42",
    },
  },
  {
    id: 2,
    title: "Accounts",
    description:
      "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    version: "v1.0",
    recommendedAuthMethod: "CLIENT_SECRET_POST",
    createdAt: "2021-08-4T00:33:42",
    apis: [
      {
        title: "Api title for Accounts and some other thing that you do",
        version: "v1.0",
        tenant: "apigw",
        meta: {},
        paths: [
          {
            path: "/v1/apigw/open-api/apps",
            methods: ["get", "post"],
            description: "Accounts - this is description",
          },
          {
            path: "/v1/apigw/open-api/apps/{app_title}",
            methods: ["put", "delete", "post"],
            description: "Accounts - this is another description",
          },
        ],
        requiredScopes: "apigw:open_api",
      },
    ],
    consent: {
      legals: `Please read these Conditions of Use carefully before using this site. You should review
        the Conditions of Use regularly as they may change at any time. References to "Web
        Sites" and "Sites" mean both the singular and plural of these terms. References to "you"
        or "your" shall mean the person authorized to access and use this site. References to
        "we", "us" or "our" shall mean the Company. `,
      expiry: "2025-08-4T00:33:42",
    },
  },
];

export const INITIAL_FORM_STATE: IDeveloperAppConfig = {
  apps: [
    {
      title: "",
      description: "",
      collections: [],
      client: {
        clientid: "",
        csid: "",
        type: "",
        sessionIdleTime: 0,
        tokenExpiryTime: 0,
        scopes: [],
      },
      authMethod: "",
      environmentType: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  collections: [],
  code: "",
  message: "",
};

export function appStateReducer(
  state: IDeveloperAppConfig = INITIAL_FORM_STATE,
  action: ISharedActions | IAppDetailsActions
): IDeveloperAppConfig {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_APP_CONFIG_TO_STORE:
        const data = action.payload ?? {};
        draft.apps = data.apps ?? ([] as any);
        draft.collections = data?.collections ?? ([] as any);
        draft.code = data?.code ?? INITIAL_FORM_STATE.code;
        draft.message = data?.message ?? INITIAL_FORM_STATE.message;
        break;

      case CREATE_APP_DETAILS_NEW:
        draft.apps.push(INITIAL_FORM_STATE.apps[0]);
        break;

      case CREATE_APP_DETAILS_CANCEL:
        draft.apps.splice(-1);
        break;

      case APP_TITLE_UPDATE:
        const appTitleIndex = action.payload.appIndex;
        draft.apps[appTitleIndex].title = action.payload.app.title ?? "";
        break;

      case APP_DESCRIPTION_UPDATE:
        const appDescriptionIndex = action.payload.appIndex;
        draft.apps[appDescriptionIndex].description =
          action.payload.app.description ?? "";
        break;

      case CANCEL_EDIT_APP:
        const appIndex = state.apps.findIndex(
          (app) => app.client.clientid === action.payload.client.clientid
        );
        draft.apps[appIndex] = { ...action.payload };
        break;

      case CREATE_APP_CLIENT_DETAILS_UPDATE:
        const clientAppIndex = action.payload.appIndex;
        draft.apps[clientAppIndex].client = {
          ...state.apps[clientAppIndex].client,
          ...action.payload.client,
        };
        break;

      case DELETE_APP_CLIENT_SECRET_UPDATE:
        const index = state.apps.findIndex(
          (app) => app.title === action.payload.title
        );
        if (draft.apps[index].client?.clientSecret) {
          delete draft.apps[index].client.clientSecret;
        }
        break;

      case CREATE_APP_COLLECTION_ADD:
        if (Array.isArray(action.payload.collections)) {
          draft.apps[action.payload.appIndex].collections =
            action.payload.collections;
        } else {
          draft.apps[action.payload.appIndex].collections = [
            ...draft.apps[action.payload.appIndex].collections.slice(0),
            { ...action.payload.collections },
          ];
        }
        break;

      case CREATE_APP_COLLECTION_CANCEL:
        if (Array.isArray(action.payload.collections)) {
          draft.apps[action.payload.appIndex].collections = [];
        } else if (isObject(action.payload.collections)) {
          const newCollection = state.apps[
            action.payload.appIndex
          ].collections.filter(
            //@ts-ignore
            (collection) => collection.title !== action.payload.collections.title
          );
          draft.apps[action.payload.appIndex].collections = [
            ...newCollection.slice(0),
          ];
        }
        break;

      case CREATE_APP_SELECT_AUTH:
        const authAppIndex = action.payload.appIndex;
        draft.apps[authAppIndex].authMethod = action.payload.auth;
        break; 

      case CREATE_APP_ACCEPT_COLLECTION_TERM_AND_COND:
        const indexAppTC = action.payload.appIndex;

        const updateCollectionConsent = state.apps[indexAppTC].collections.map(
          (collection) => {
            if (collection.title === action.payload.collections.title) {
              return { ...collection, ...action.payload.collections };
            } else {
              return collection;
            }
          }
        );
        draft.apps[indexAppTC].collections = [
          ...updateCollectionConsent.slice(0),
        ];
        break;

      case DELETE_APP:
        const updateAppList = state.apps.filter(
          (app) => app.title !== action?.payload?.title
        );
        draft.apps = updateAppList;
        break;
    }
  });
}
