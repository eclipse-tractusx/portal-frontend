/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
  APPSUBSCRIPTION = 'appsubscription',
  ADMINBOARD = 'adminboard',
  ADMINBOARD_DETAIL = 'adminboarddetail',
  MARKETPLACE = 'marketplace',
  APP_MARKETPLACE = 'appmarketplace',
  SERVICE_MARKETPLACE = 'servicemarketplace',
  SERVICE_MARKETPLACE_DETAIL = 'servicemarketplacedetail',
  APP_DETAIL = 'appdetail',
  DATA_MANAGEMENT = 'datamanagement',
  SEMANTICHUB = 'semantichub',
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
  DOCUMENTATION = 'documentation',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  COOKIE_POLICY = 'cookiepolicy',
  SETTINGS = 'settings',
  DEVELOPER = 'developer',
  TEST = 'test',
  LOGOUT = 'logout',
  ERROR = 'error',
  APP_MANAGEMENT = 'appmanagement',
  APPOVERVIEW = 'appoverview',
  APPOVERVIEW_NEW = 'appoverview-new',
  DEACTIVATE = 'deactivate',
  CHANGE_IMAGE = 'changeimage',
  CHANGE_DESCRIPTION = 'changedescription',
  ADD_ROLES = 'addroles',
  CHANGE_DOCUMENTS = 'changedocuments',
  APPRELEASEPROCESS = 'appreleaseprocess',
  APP_RELEASE_PROCESS_FORM = 'appreleaseprocess_form',
  INTRODUCTION = 'companyroles',
  INTRODUCTION_PARTICIPANT = 'companyrolesparticipant',
  INTRODUCTION_APP_PROVIDER = 'companyrolesappprovider',
  INTRODUCTION_SERVICE_PROVIDER = 'companyrolesserviceprovider',
  INTRODUCTION_CONFORMITY_BODY = 'companyrolesconformitybody',
  INTRODUCTION_OSP_BODY = 'companyrolesonboardingserviceprovider',
  USE_CASE = 'usecase',
  USE_CASE_TRACABILITY = 'usecasetraceablity',
  SERVICE_MANAGEMENT = 'servicemanagement',
  SERVICEOVERVIEW = 'serviceoverview',
  SERVICEDEACTIVATE = 'servicedeactivate',
  SERVICERELEASEPROCESS = 'servicereleaseprocess',
  SERVICEADMINBOARD = 'serviceadminboard',
  SERVICEADMINBOARD_DETAIL = 'serviceadminboarddetail',
  SERVICESUBSCRIPTION = 'servicesubscription',
  SERVICE_RELEASE_PROCESS_FORM = 'servicereleaseprocess_form',
  ROLE_DETAILS = 'role-details',
  SERVICE_DETAIL = 'servicedetail',
  COMPANY_ROLE = 'company-role',
  USECASE_PARTICIPATION = 'usecase-participation',
  ABOUTPAGE = 'about',
  CERTIFICATE_CREDENTIAL = 'certificate-credential',
  DATA_SPACE = 'dataspace',
  ADMIN_CREDENTIAL = 'admin-credential',
  ONBOARDING_SERVICEPROVIDER = 'onboarding-serviceprovider',
  COMPANY_CERTIFICATE = 'companyCertificate',
}

export enum OVERLAYS {
  NOT_FOUND = 'notfound',
  NONE = 'none',
  ADD_USER = 'add_user',
  ADD_MULTIPLE_USER = 'add_multiple_user',
  ADD_APP_USER_ROLES = 'add_app_user_roles',
  EDIT_APP_USER_ROLES = 'edit_app_user_roles',
  USER = 'user',
  TECHUSER = 'techuser',
  ADD_TECHUSER = 'add_techuser',
  DELETE_TECHUSER = 'delete_techuser',
  NEWS = 'news',
  ADD_BPN = 'add_bpn',
  ADD_SUBSCRIPTION = 'add_subscription',
  INVITE = 'invite',
  PARTNER = 'partner',
  APP = 'app',
  SERVICE_REQUEST = 'service_request',
  APPMARKETPLACE_REQUEST = 'appmarketplace_request',
  ADD_IDP = 'add_idp',
  UPDATE_IDP = 'update_idp',
  UPDATE_IDP_SUCCESS = 'update_idp_success',
  ENABLE_IDP = 'enable_idp',
  DISABLE_IDP = 'disable_idp',
  DELETE_IDP = 'delete_idp',
  ADDUSERS_IDP = 'addusers_idp',
  IDP_DETAILS = 'idp_details',
  IDP_CONFIRM = 'idp_confirm',
  IDP_STATUS = 'idp_status',
  IDP_TEST_RUN = 'idp_test_run',
  ENABLE_IDP_SUCCESS = 'enable_idp_success',
  REGISTER_OSP = 'register_osp',
  REGISTER_NEXT_OSP = 'register_next_osp',
  CONSENT_OSP = 'consent_osp',
  APP_OVERVIEW_CONFIRM = 'app_overview_confirm',
  APP_DETAILS_OVERLAY = 'app_details_overlay',
  CONFIRM_USER_ACTION = 'confirm_user_action',
  SAMPLE_FORM = 'sample_form',
  ADD_SERVICE_PROVIDER = 'add_service_provider',
  APP_DECLINE_ADMINBOARD = 'app_decline_adminboard',
  EDIT_PORTAL_ROLES = 'edit_portal_roles',
  SERVICE_DECLINE_ADMINBOARD = 'decline_service_release',
  UPDATE_COMPANY_ROLE = 'update_company_role',
  EDIT_USECASE = 'edit_usecase',
  UPDATE_CERTIFICATE = 'update_certificate',
  COMPANY_CERTIFICATE_DETAILS = 'company_certificate_details',
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
  NOTIFICATION_VIEW = 'view_notifications',
  SETUP_IDP = 'setup_idp',
  SETUP_CLIENT = 'setup_client',
  APPSTORE_VIEW = 'view_apps',
  APPSTORE_VIEW_SERVICES = 'view_service_marketplace',
  SUBSCRIBE_SERVICE_MARKETPLACE = 'subscribe_service',
  APPSTORE_VIEW_DATASPACES = 'view_dataspaces',
  APPSTORE_ADD = 'add_app',
  APPSTORE_EDIT = 'edit_apps',
  APPSTORE_FILTER = 'filter_apps',
  APPSTORE_DELETE = 'delete_apps',
  APPMANAGEMENT_VIEW = 'add_apps',
  SERVICEMANAGEMENT_VIEW = 'add_service_offering',
  APP_MANAGEMENT = 'app_management',
  SERVICE_SUBSCRIPTION_MANAGEMENT = 'activate_subscription',
  APPOVERVIEW_VIEW = 'add_apps',
  SERVICEOVERVIEW_VIEW = 'add_service_offering',
  CONNECTOR_SETUP = 'setup_connector',
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
  VIEW_USER_ACCOUNT = 'view_user_account',
  ACTIVATE_SUBSCRIPTION = 'activate_subscription',
  APPROVE_APP_RELEASE = 'approve_app_release',
  DECLINE_APP_RELEASE = 'decline_app_release',
  APPROVE_SERVICE_RELEASE = 'activate_subscription',
  DECLINE_SERVICE_RELEASE = 'decline_service_release',
  VIEW_SERVICE_RELEASE = 'add_service_offering',
  UPDATE_COMPANY_ROLE = 'update_company_role',
  SUBMITTED_APPLICATION = 'view_submitted_applications',
  REQUEST_SSICREDENTIAL = 'request_ssicredential',
  DECISION_SSICREDENTIAL = 'decision_ssicredential',
  COMPANY_CERTIFICATE_VIEW = 'view_certificates',
  UPLOAD_COMPANY_CERTIFICATE = 'upload_certificates',
}

export enum HINTS {
  COMING_SOON = 'coming_soon',
  NEW = 'new',
}
