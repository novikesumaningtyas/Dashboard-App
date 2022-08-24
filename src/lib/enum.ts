export enum DASHBOARD {
  TITLE = "Dashboard",
  DESCRIPTION = "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  MY_APPS = "My Apps",
  MY_OPTION = "My Options",
  MSG_NO_APP = `Get started by clicking "Create a Sandbox App" below to create a new App`,
}

export enum APP_DETAILS_VIEW_PAGE {
  APP_DETAILS = 'App details',
  APP_NAME = 'App name',
  APP_DESCRIPTION = 'Description',

  APIS = 'Your App APIs',
  API_HEADING = 'Heading',
  API_STATUS = 'Status',
  API_LEGAL = 'API Legals:',

  CLIENT_APP_DETAILS = 'Client app details',
  CLIENT_APP_DETAILS_DESC = 'Only "Token endpoint auth method" can be edited',
  CLIENT_TOKEN_AUTH = 'Token endpoint auth method:',
  CLIENT_SESSION_IDLE = 'Session idle time in secs:',
  CLIENT_SCOPES = 'SCopes:',
  CLIENT_TOKEN_EXPIRY_TIME = 'Token expiry time:',
  CLIENT_CREATED = 'Created at:',
  CLIENT_ID = 'Client ID:',

  APP_OPTION = 'App options:'
}

export enum STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  DELETED = 'deleted',
  REVOKED = 'revoked'
}


export enum APP_DETAILS {
  CREATE_APP = 'Create a new app in Sandbox',
  DESCRIPTION = "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  APP_DETAILS = 'App details'
}


export enum SELECT_API {
  AVAILABLE_API = 'Available API products',
  DESCRIPTION = "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  SELECT_API = 'Select APIs for your app'
}


export enum AUTH_PAGE{
  AUTH_TITLE = 'Authentication',
  DESCRIPTION = "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  SELECT_AUTH ='Select security app type'
}
export enum TERM_COND_PAGE {
  TITLE = 'Developer use of NAB APIs',
  DESCRIPTION = "Description text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  TERM_COND = "Terms and conditions"
}

export enum STEP {
  APP_DETAILS = "APP_DETAILS",
  SELECT_API = "SELECT_API",
  AUTH = "AUTH",
  TERM = "TERM",
}

export enum FORM_MODE {
  EDIT = "edit",
  NEW = "new",
  VIEW = "view",
}

export enum ROUTES {
  DASHBOARD = `/`,
  CREATE_APP_DETAILS = `/createAppDetails`,

  SELECT_APIS = `/selectApis`,

  AUTHENTICATION = `/authentication`,

  T_AND_C = `/acceptTermAndConditions`,

  APP_DETAILS_BASE_PARAM = `/appDetails/view/`,
  APP_DETAILS = `/appDetails/view/:id`,
  APP_LIST_DETAILS_BASE_PARAM = `/appDetails/list/view`,
  APP_LIST_DETAILS = `/appDetails/list/view/:id`
}


export enum ERROR_MESSAGE {
  DEFAULT = 'An error has occured. Please contact the Technology Service Desk for further investigation'
}
