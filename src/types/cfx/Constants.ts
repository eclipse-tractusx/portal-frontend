import i18next from 'i18next'

export const MENUS = {
  DATASPACE_PARTICIPATION: 'dataSpaceParticipation',
  MARKETPLACE: 'marketplace',
  MARKETPLACE_MANAGEMENT: 'marketplaceManagement',
  APP_MANAGEMENT: 'appManagement',
  SERVICE_MANAGEMENT: 'serviceManagement',
  TECHNICAL_SETUP: 'technicalSetup',
  CX_OPERATOR: 'cxOperator',
}

export const HELP_LINK = () => {
  return `https://intercom-help.eu/cofinity-x/${i18next.language}/collections/323675-portal-marketplace`
}

export enum PAGES {
  ROOT = '',
  HOME = 'home',
  REGISTRATION = 'registration',
  APPSUBSCRIPTION = 'appsubscription',
  ADMINBOARD = 'adminboard',
  APP_MARKETPLACE = 'appmarketplace',
  SERVICE_MARKETPLACE = 'servicemarketplace',
  ACCOUNT = 'account',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnernetwork',
  USER_MANAGEMENT = 'usermanagement',
  CONNECTOR_MANAGEMENT = 'connectormanagement',
  TECHUSER_MANAGEMENT = 'technicaluser',
  IDP_MANAGEMENT = 'idpmanagement',
  APPLICATION_REQUESTS = 'applicationrequests',
  INVITE = 'invite',
  LOGOUT = 'logout',
  APPRELEASEPROCESS = 'appreleaseprocess',
  SERVICEOVERVIEW = 'serviceoverview',
  SERVICERELEASEPROCESS = 'servicereleaseprocess',
  SERVICEADMINBOARD = 'serviceadminboard',
  SERVICESUBSCRIPTION = 'servicesubscription',
  USECASE_PARTICIPATION = 'usecase-participation',
  COMPANY_WALLET = 'companyWallet',
  COMPANY_SUBSCRIPTIONS = 'company-subscriptions',
  SEMANTICHUB = 'semantichub',
  APPOVERVIEW = 'appoverview',
  COMPANY_ROLE = 'company-role',

  // Basic
  ABOUTPAGE = 'about',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  COOKIE_POLICY = 'cookiepolicy',

  //
  USER_DETAILS = 'userdetails',
  APP_RELEASE_PROCESS_FORM = 'appreleaseprocess_form',
  SERVICE_RELEASE_PROCESS_FORM = 'servicereleaseprocess_form',
  APP_DETAIL = 'appdetail',

  HELP = 'help', // Not Sure
  DOCUMENTATION = 'documentation', // Not Sure
  STORYBOOK = 'storybook', // Not Sure
  // These comments are for the reference please don't remove it
  ROLE_DETAILS = 'role-details', // src/components/overlays/AddMultipleUser/index.tsx
  SERVICEADMINBOARD_DETAIL = 'serviceadminboarddetail', // src/components/pages/CompanySubscriptions/CompanySubscriptionsTableColumns.tsx:148 , src/components/pages/ServiceAdminBoard/index.tsx:42 , src/components/shared/templates/AdminBoard/AdminBoardElements.tsx:97
  COMPANY_SUBSCRIPTIONS_DETAIL = 'company-subscriptions-detail', // src/components/pages/CompanySubscriptions/CompanySubscriptionsTableColumns.tsx:148
  USE_CASE = 'usecase', // src/components/pages/NotificationCenter/NotificationItem.tsx:177
  SERVICE_DETAIL = 'servicedetail', // src/components/pages/ServiceReleaseProcess/components/ServiceListOverview.tsx:273
  SERVICEDEACTIVATE = 'servicedeactivate', // src/components/pages/ServiceReleaseProcess/components/ServiceListOverview.tsx:273
  TECHUSER_DETAILS = 'techuserdetails', // src/components/pages/TechnicalUserDetails/index.tsx:37 , src/components/pages/TechnicalUserManagement/TechnicalUserTable.tsx:158
  APP_MANAGEMENT = 'appmanagement', // src/components/shared/frame/Footer/index.tsx:48

  DEACTIVATE = 'deactivate', // src/components/pages/AppOverview/AppOverviewList.tsx:117
  CHANGE_IMAGE = 'changeimage', // src/components/pages/AppOverview/AppOverviewList.tsx:117
  CHANGE_DESCRIPTION = 'changedescription', // src/components/pages/AppOverview/AppOverviewList.tsx:117
  ADD_ROLES = 'addroles', // src/components/pages/AppOverview/AppOverviewList.tsx:117
  CHANGE_DOCUMENTS = 'changedocuments', // src/components/pages/AppOverview/AppOverviewList.tsx:117
  VIEW_DETAILS = 'viewDetails', // src/components/pages/AppOverview/AppOverviewList.tsx:117
}
