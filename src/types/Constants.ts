/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { ServiceTypeIdsEnum } from 'features/serviceManagement/apiSlice'

export const PAGE_SIZE = 10

export const INTERVAL_CHECK_NOTIFICATIONS = 60000

export enum PAGES {
  ROOT = '',
  HOME = 'home',
  REGISTRATION = 'registration',
  APP_SUBSCRIPTION = 'appSubscription',
  APP_ADMIN_BOARD = 'appAdminBoard',
  APP_ADMIN_BOARD_DETAIL = 'appAdminBoardDetail',
  MARKETPLACE = 'marketplace',
  APP_MARKETPLACE = 'appMarketplace',
  SERVICE_MARKETPLACE = 'serviceMarketplace',
  SERVICE_MARKETPLACE_DETAIL = 'serviceMarketplaceDetail',
  APP_DETAIL = 'appdetail',
  DATA_MANAGEMENT = 'dataManagement',
  SEMANTICHUB = 'semantichub',
  CONNECTOR = 'connector',
  ACCOUNT = 'account',
  USER_DETAILS = 'userdetails',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnerNetwork',
  USER_MANAGEMENT = 'userManagement',
  TECHNICAL_SETUP = 'technicalSetup',
  CONNECTOR_MANAGEMENT = 'connectorManagement',
  TECH_USER_MANAGEMENT = 'technicalUserManagement',
  TECH_USER_DETAILS = 'techUserDetails',
  IDP_MANAGEMENT = 'idpManagement',
  APPLICATION_REQUESTS = 'applicationRequests',
  CLEARINGHOUSE_SELF_DESCRIPTION = 'clearinghouseSelfDescription',
  APP_USER_MANAGEMENT = 'appUserManagement',
  INVITE = 'invite',
  ADMINISTRATION = 'admin',
  HELP = 'help',
  DOCUMENTATION = 'documentation',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  COOKIE_POLICY = 'cookiePolicy',
  SETTINGS = 'settings',
  DEVELOPER = 'developer',
  TEST = 'test',
  LOGOUT = 'logout',
  ERROR = 'error',
  APP_MANAGEMENT = 'appManagement',
  APP_OVERVIEW = 'appOverview',
  APP_OVERVIEW_NEW = 'appoverviewNew',
  DEACTIVATE = 'deactivate',
  CHANGE_IMAGE = 'changeImage',
  CHANGE_DESCRIPTION = 'changeDescription',
  ADD_ROLES = 'addRoles',
  CHANGE_DOCUMENTS = 'changeDocuments',
  VIEW_DETAILS = 'viewDetails',
  APP_RELEASE_PROCESS = 'appReleaseProcess',
  APP_RELEASE_PROCESS_FORM = 'appReleaseProcessForm',
  INTRODUCTION = 'companyRoles',
  INTRODUCTION_PARTICIPANT = 'companyRolesParticipant',
  INTRODUCTION_APP_PROVIDER = 'companyRolesAppProvider',
  INTRODUCTION_SERVICE_PROVIDER = 'companyRolesServiceProvider',
  INTRODUCTION_CONFORMITY_BODY = 'companyRolesConformityBody',
  INTRODUCTION_OSP_BODY = 'companyRolesOnboardingServiceProvider',
  USE_CASE = 'useCase',
  USE_CASE_TRACABILITY = 'useCaseTraceablity',
  SERVICE_MANAGEMENT = 'serviceManagement',
  SERVICE_OVERVIEW = 'serviceOverview',
  SERVICE_DEACTIVATE = 'serviceDeactivate',
  SERVICE_RELEASE_PROCESS = 'serviceReleaseProcess',
  SERVICE_ADMIN_BOARD = 'serviceAdminBoard',
  SERVICE_ADMIN_BOARD_DETAIL = 'serviceAdminBoardDetail',
  SERVICE_SUBSCRIPTION = 'serviceSubscription',
  SERVICE_RELEASE_PROCESS_FORM = 'serviceReleaseProcessForm',
  ROLE_DETAILS = 'roleDetails',
  SERVICE_DETAIL = 'serviceDetail',
  COMPANY_ROLE = 'companyRole',
  USECASE_PARTICIPATION = 'useCaseParticipation',
  ABOUTPAGE = 'about',
  CERTIFICATE_CREDENTIAL = 'certificateCredential',
  DATA_SPACE = 'dataSpace',
  ADMIN_CREDENTIAL = 'adminCredential',
  COMPANY_CERTIFICATE = 'companyCertificate',
  COMPANY_WALLET = 'companyWallet',
  DECLINE = 'decline',
  CONSENT_OSP = 'consentOsp',
  COMPANY_SUBSCRIPTIONS = 'companySubscriptions',
  COMPANY_SUBSCRIPTIONS_DETAIL = 'companySubscriptionsDetail',
  COMPANY_DATA = 'companyData',
  ONBOARDING_SERVICE_PROVIDER_MANAGEMENT = 'onboardingServiceProviderManagement',
}

export enum OVERLAYS {
  NOT_FOUND = 'notFound',
  NONE = 'none',
  ADD_USER = 'addUser',
  ADD_MULTIPLE_USER = 'addMultipleUser',
  ADD_APP_USER_ROLES = 'addAppUserRoles',
  EDIT_APP_USER_ROLES = 'editAppUserRoles',
  USER = 'user',
  ADD_TECH_USER = 'addTechUser',
  DELETE_TECH_USER = 'deleteTechUser',
  NEWS = 'news',
  ADD_BPN = 'addBpn',
  ADD_SUBSCRIPTION = 'addSubscription',
  INVITE = 'invite',
  PARTNER = 'partner',
  APP = 'app',
  SERVICE_REQUEST = 'serviceRequest',
  APPMARKETPLACE_REQUEST = 'appmarketplaceRequest',
  ADD_IDP = 'addIdp',
  UPDATE_IDP = 'updateIdp',
  UPDATE_IDP_SUCCESS = 'updateIdpSuccess',
  ENABLE_IDP = 'enableIdp',
  DISABLE_IDP = 'disableIdp',
  DISABLE_MANAGED_IDP = 'disableManagedIdp',
  DELETE_MANAGED_IDP = 'deleteManagedIdp',
  ADDUSERS_IDP = 'addUsersIdp',
  IDP_DETAILS = 'idpDetails',
  IDP_CONFIRM = 'idpConfirm',
  ENABLE_IDP_SUCCESS = 'enableIdpSuccess',
  REGISTER_OSP = 'registerOsp',
  REGISTER_NEXT_OSP = 'registerNextOsp',
  CONSENT_OSP = 'consentOsp',
  APP_OVERVIEW_CONFIRM = 'appOverviewConfirm',
  APP_DETAILS_OVERLAY = 'appDetailsOverlay',
  CONFIRM_USER_ACTION = 'confirmUserAction',
  ADD_SERVICE_PROVIDER = 'addServiceProvider',
  APP_DECLINE_ADMINBOARD = 'appDeclineAdminboard',
  EDIT_PORTAL_ROLES = 'editPortalRoles',
  SERVICE_DECLINE_ADMINBOARD = 'declineServiceRelease',
  UPDATE_COMPANY_ROLE = 'updateCompanyRole',
  EDIT_USECASE = 'editUsecase',
  UPDATE_CERTIFICATE = 'updateCertificate',
  COMPANY_CERTIFICATE_DETAILS = 'companyCertificateDetails',
  COMPANY_CERTIFICATE_CONFIRM_DELETE = 'companyCertificateConfirmDelete',
  CSV_UPLOAD_OVERLAY = 'csvUploadOverlay',
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
  SUBSCRIBE_APP_MARKETPLACE = 'subscribe_apps',
  SUBSCRIBE_SERVICE_MARKETPLACE = 'subscribe_service',
  APPSTORE_VIEW_DATASPACES = 'view_dataspaces',
  APPSTORE_ADD = 'add_app',
  APPSTORE_EDIT = 'edit_apps',
  APPSTORE_FILTER = 'filter_apps',
  APPSTORE_DELETE = 'delete_apps',
  APPMANAGEMENT_VIEW = 'add_apps',
  SERVICEMANAGEMENT_VIEW = 'add_service_offering',
  APP_MANAGEMENT = 'app_management',
  SERVICE_SUBSCRIPTION_MANAGEMENT = 'service_management',
  APPOVERVIEW_VIEW = 'add_apps',
  SERVICEOVERVIEW_VIEW = 'add_service_offering',
  CONNECTOR_SETUP = 'setup_connector',
  SEMANTICHUB_VIEW = 'view_semantic_model',
  SEMANTICHUB_ADD = 'add_semantic_model',
  SEMANTICHUB_DELETE = 'delete_semantic_model',
  USERMANAGEMENT_VIEW = 'view_user_management',
  USERMANAGEMENT_ADD = 'add_user_account',
  USERMANAGEMENT_DELETE = 'delete_user_account',
  TECH_USER_VIEW = 'view_tech_user_management',
  TECH_USER_ADD = 'add_tech_user_management',
  TECH_USER_DELETE = 'delete_tech_user_management',
  IDP_VIEW = 'view_idp',
  IDP_ADD = 'add_idp',
  IDP_DELETE = 'delete_idp',
  IDP_SETUP = 'setup_idp',
  IDP_DISABLE = 'disable_idp',
  MODIFY_USER_ACCOUNT = 'modify_user_account',
  MY_ORGANIZATION_VIEW = 'view_company_data',
  PARTNER_NETWORK_VIEW = 'view_partner_network',
  DEVELOPER = 'catenax_developer',
  CONNECTORS_VIEW = 'view_connectors',
  DELETE_CONNECTORS = 'delete_connectors',
  MODIFY_CONNECTORS = 'modify_connectors',
  FE_DEVELOPER = 'FE Developer',
  VIEW_APP_RELEASE = 'view_app_release',
  MY_USER_ACCOUNT = 'my_user_account',
  VIEW_USER_ACCOUNT = 'view_user_account',
  ACTIVATE_SUBSCRIPTION = 'activate_subscription',
  APPROVE_APP_RELEASE = 'approve_app_release',
  DECLINE_APP_RELEASE = 'decline_app_release',
  APPROVE_SERVICE_RELEASE = 'approve_service_release',
  DECLINE_SERVICE_RELEASE = 'decline_service_release',
  VIEW_SERVICE_RELEASE = 'add_service_offering',
  UPDATE_COMPANY_ROLE = 'update_company_role',
  SUBMITTED_APPLICATION = 'view_submitted_applications',
  REQUEST_SSICREDENTIAL = 'request_ssicredential',
  DECISION_SSICREDENTIAL = 'decision_ssicredential',
  COMPANY_WALLET = 'view_wallet',
  COMPANY_CERTIFICATE_VIEW = 'view_certificates',
  UPLOAD_COMPANY_CERTIFICATE = 'upload_certificates',
  VIEW_SUBSCRIPTION = 'view_subscription',
  DELETE_CERTIFICATES = 'delete_certificates',
  MY_ACCOUNT = 'view_own_user_account',
  CREDENTIAL_REQUESTS = 'view_credential_requests',
  REVOKE_CREDENTIALS_ISSUER = 'revoke_credentials_issuer',
  VIEW_REGISTRATION = 'view_registration',
  READ_PARTNER_MEMBER = 'read_partner_member',
  APPROVE_NEW_PARTNER = 'approve_new_partner',
  CONFIGURE_PARTNER_REGISTRATION = 'configure_partner_registration',
}

export enum HINTS {
  COMING_SOON = 'coming_soon',
  NEW = 'new',
}

export const CONVERT_TO_MB = 1048576

export const serviceTypeMapping: Record<string, ServiceTypeIdsEnum> = {
  // en
  'Dataspace Services': ServiceTypeIdsEnum.DATASPACE_SERVICES,
  'Consultancy Services': ServiceTypeIdsEnum.CONSULTANCY_SERVICES,
  // de
  'Datenraum Services': ServiceTypeIdsEnum.DATASPACE_SERVICES,
  'Beratungs Services': ServiceTypeIdsEnum.CONSULTANCY_SERVICES,
}
