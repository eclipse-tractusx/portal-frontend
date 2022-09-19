/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

export const PAGE_SIZE = 10

export const INTERVAL_CHECK_NOTIFICATIONS = 60000

export enum PAGES {
  ROOT = '',
  HOME = 'home',
  REGISTRATION = 'registration',
  SWAGGER = 'swagger',
  STORYBOOK = 'storybook',
  APPSTORE = 'appstore',
  MARKETPLACE = 'marketplace',
  APP_MARKETPLACE = 'appmarketplace',
  SERVICE_MARKETPLACE = 'servicemarketplace',
  SERVICE_MARKETPLACE_DETAIL = 'servicemarketplacedetail',
  DATASPACE_MARKETPLACE = 'dataspacemarketplace',
  APP_DETAIL = 'appdetail',
  DATACATALOG = 'datacatalog',
  DATA_MANAGEMENT = 'datamanagement',
  DIGITALTWIN = 'digitaltwin',
  SEMANTICHUB = 'semantichub',
  DEVELOPERHUB = 'developerhub',
  CONNECTOR = 'connector',
  ACCOUNT = 'account',
  USER_DETAILS = 'userdetails',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnernetwork',
  USER_MANAGEMENT = 'usermanagement',
  TECHNICAL_SETUP = 'technicalsetup',
  TECHUSER_MANAGEMENT = 'technicaluser',
  TECHUSER_DETAILS = 'techuserdetails',
  IDP_MANAGEMENT = 'idpmanagement',
  IDP_DETAIL = 'idpdetail',
  APPLICATION_REQUESTS = 'applicationrequests',
  APP_USER_MANAGEMENT = 'appusermanagement',
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
  TEST = 'test',
  TRANSLATOR = 'translator',
  LOGOUT = 'logout',
  ERROR = 'error',
  APP_MANAGEMENT = 'appmanagement',
  APPOVERVIEW = 'appoverview',
  APPRELEASEPROCESS = 'appreleaseprocess',
}

export enum OVERLAYS {
  NOT_FOUND = 'notfound',
  NONE = 'none',
  ADD_USER = 'add_user',
  ADD_APP_USER_ROLES = 'add_app_user_roles',
  EDIT_APP_USER_ROLES = 'edit_app_user_roles',
  USER = 'user',
  TECHUSER = 'techuser',
  ADD_TECHUSER = 'add_techuser',
  DELETE_TECHUSER = 'delete_techuser',
  NEWS = 'news',
  ADD_BPN = 'add_bpn',
  INVITE = 'invite',
  PARTNER = 'partner',
  APP = 'app',
  SERVICE_REQUEST = 'service_request',
  IDP = 'idp',
}

export enum ACTIONS {
  LANG_DE = 'Lang_de',
  LANG_EN = 'Lang_en',
  SIGNOUT = 'SignOut',
}

export enum ROLES {
  EVERYONE = '*',
  CX_ADMIN = 'CX Admin',
  ADMIN_CONNECTOR = 'Admin - Connector Setup',
  ADMIN_USER = 'Admin - User Management',
  INVITE_NEW_PARTNER = 'invite_new_partner',
  SETUP_IDP = 'setup_idp',
  SETUP_CLIENT = 'setup_client',
  APPSTORE_VIEW = 'view_apps',
  APPSTORE_VIEW_SERVICES = 'view_service_marketplace',
  SUBSCRIBE_SERVICE_MARKETPLACE = 'subscribe_service_marketplace',
  APPSTORE_VIEW_DATASPACES = 'view_dataspaces',
  APPSTORE_ADD = 'add_app',
  APPSTORE_EDIT = 'edit_apps',
  APPSTORE_FILTER = 'filter_apps',
  APPSTORE_DELETE = 'delete_apps',
  CONNECTOR_SETUP = 'setup_connector',
  DATACATALOG_VIEW = 'view_data_catalog',
  DIGITALTWIN_VIEW = 'view_digital_twin',
  DIGITALTWIN_ADD = 'add_digital_twin',
  DIGITALTWIN_DELETE = 'delete_digital_twin',
  SEMANTICHUB_VIEW = 'view_semantic_model',
  SEMANTICHUB_ADD = 'add_semantic_model',
  SEMANTICHUB_DELETE = 'delete_semantic_model',
  USERMANAGEMENT_VIEW = 'view_user_management',
  USERMANAGEMENT_ADD = 'add_user_account',
  USERMANAGEMENT_DELETE = 'delete_user_account',
  TECHUSER_VIEW = 'view_tech_user_management',
  TECHUSER_ADD = 'add_tech_user_management',
  TECHUSER_DELETE = 'delete_tech_user_management',
  IDP_VIEW = 'view_idp',
  IDP_ADD = 'add_idp',
  IDP_DELETE = 'delete_idp',
  IDP_SETUP = 'setup_idp',
  IDP_DISABLE = 'disable_idp',
  MODIFY_USER_ACCOUNT = 'modify_user_account',
  ORGANIZATION_VIEW = 'view_organization',
  PARTNER_NETWORK_VIEW = 'view_partner_network',
  DEVELOPER = 'catenax_developer',
  TECHNICAL_SETUP_VIEW = 'view_technical_setup',
  FE_DEVELOPER = 'FE Developer',
  VIEW_APP_RELEASE = 'view_app_release',
  MY_USER_ACCOUNT = 'my_user_account',
}

export enum HINTS {
  COMING_SOON = 'coming_soon',
  NEW = 'new',
}
