export interface GeographicCoordinate {
  longitude: number
  latitude: number
  altitude?: number
}

export enum PAGES {
  ROOT = '',
  DASHBOARD = 'dashboard',
  APPSTORE = 'appstore',
  DATACATALOG = 'datacatalog',
  DIGITALTWIN = 'digitaltwin',
  SEMANTICHUB = 'semantichub',
  DEVELOPERHUB = 'developerhub',
  CONNECTOR = 'connector',
  ACCOUNT = 'account',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnernetwork',
  USER_MANAGEMENT = 'usermanagement',
  INVITE = 'invite',
  ADMINISTRATION = 'admin',
  HELP = 'help',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  COOKIE_POLICY = 'cookiepolicy',
  THIRD_PARTY_LICENSES = 'thirdpartylicenses',
  SETTINGS = 'settings',
  DEVELOPER = 'developer',
  TESTAPI = 'testapi',
  TRANSLATOR = 'translator',
  LOGOUT = 'logout',
}

export enum ROLES {
  EVERYONE = '*',
  CX_ADMIN = 'CX Admin',
  ADMIN_CONNECTOR = 'Admin - Connector Setup',
  ADMIN_USER = 'Admin - User Management',
  INVITE_NEW_PARTNER = 'invite_new_partner',
  APPSTORE_VIEW = 'view_apps',
  APPSTORE_ADD = 'add_app',
  APPSTORE_EDIT = 'edit_apps',
  APPSTORE_FILTER = 'filter_apps',
  APPSTORE_DELETE = 'delete_apps',
  CONNECTOR_SETUP = 'setup_connector',
  DATACATALOG_VIEW = 'view_data_catalog',
  DIGITALTWIN_VIEW = 'view_digital_twins',
  DIGITALTWIN_ADD = 'add_digital_twins',
  DIGITALTWIN_DELETE = 'delete_digital_twins',
  SEMANTICHUB_VIEW = 'view_semantic_hub',
  SEMANTICHUB_ADD = 'add_semantic_hub',
  SEMANTICHUB_DELETE = 'delete_semantic_hub',
  USERMANAGEMENT_VIEW = 'view_user_management',
  USERMANAGEMENT_ADD = 'add_user_account',
  USERMANAGEMENT_DELETE = 'delete_user_account',
  ORGANIZATION_VIEW = 'view_organization',
  PARTNER_NETWORK_VIEW = 'view_partner_network',
  DEVELOPER = 'catenax_developer',
  FE_DEVELOPER = 'FE Developer',
}

export type IPage = {
  name: string
  role?: string
  element: JSX.Element
  route?: JSX.Element
}
