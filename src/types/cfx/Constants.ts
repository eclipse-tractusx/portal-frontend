import i18next from 'i18next'

export const MENUS = {
  DATASPACE_PARTICIPATION: 'dataSpaceParticipation',
  MARKETPLACE: 'marketplace',
  MARKETPLACE_MANAGEMENT: 'marketplaceManagement',
  APP_MANAGEMENT: 'appManagement',
  SERVICE_MANAGEMENT: 'serviceManagement',
  TECHNICAL_SETUP: 'technicalSetup',
  CX_OPERATOR: 'cxOperator',
  ON_BOARDING_MANAGEMENT: 'onBoardingManagement',
}

export const HELP_LINK = () => {
  // TODO: in future we need to replace 323675-portal-marketplace with specific section of this page
  return `https://intercom-help.eu/cofinity-x/${i18next.language}/collections/323675-portal-marketplace`
}

export const DOCUMENTATION_HELP_LINK = (path: string) =>
  `https://portal.development.cofinity-x.com/documentation/?path=${path}`

export enum PAGES {
  ROOT = '',
  HOME = 'home',
  REGISTRATION = 'registration',
  APP_SUBSCRIPTION = 'appSubscription',
  ADMINBOARD = 'adminboard',
  ADMINBOARD_DETAIL = 'adminboardDetail',
  // MARKETPLACE = 'marketplace', // Removed (header menu)
  APP_MARKETPLACE = 'appMarketplace',
  SERVICE_MARKETPLACE = 'serviceMarketplace',
  SERVICE_MARKETPLACE_DETAIL = 'serviceMarketplaceDetail',
  APP_DETAIL = 'appdetail',
  // DATA_MANAGEMENT = 'dataManagement', // Removed (header menu)
  SEMANTICHUB = 'semantichub',
  // CONNECTOR = 'connector', // Removed (header menu)
  ACCOUNT = 'account',
  USER_DETAILS = 'userdetails',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnerNetwork',
  USER_MANAGEMENT = 'userManagement',
  // TECHNICAL_SETUP = 'technicalSetup', // Removed (header menu)
  CONNECTOR_MANAGEMENT = 'connectorManagement',
  TECH_USER_MANAGEMENT = 'technicalUserManagement', // P: technicaluser
  TECH_USER_DETAILS = 'techUserDetails', // TODO
  IDP_MANAGEMENT = 'idpManagement',
  APPLICATION_REQUESTS = 'applicationRequests',
  APP_USER_MANAGEMENT = 'appUserManagement',
  INVITE = 'invite',
  // ADMINISTRATION = 'admin', // Removed
  HELP = 'help',
  DOCUMENTATION = 'documentation',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  // COOKIE_POLICY = 'cookiePolicy', // Removed
  // SETTINGS = 'settings', // Removed
  // DEVELOPER = 'developer', // Removed
  // TEST = 'test', // Removed
  LOGOUT = 'logout',
  ERROR = 'error', // Removed
  APP_MANAGEMENT = 'appManagement',
  APP_OVERVIEW = 'appOverview',
  // APP_OVERVIEW_NEW = 'appoverviewNew', // TODO: New appOverview added
  DEACTIVATE = 'deactivate',
  CHANGE_IMAGE = 'changeImage',
  CHANGE_DESCRIPTION = 'changeDescription',
  ADD_ROLES = 'addRoles',
  CHANGE_DOCUMENTS = 'changeDocuments',
  VIEW_DETAILS = 'viewDetails',
  APP_RELEASE_PROCESS = 'appReleaseProcess',
  APP_RELEASE_PROCESS_FORM = 'appReleaseProcessForm',
  // INTRODUCTION = 'companyRoles', // Removed
  // INTRODUCTION_PARTICIPANT = 'companyRolesParticipant', // Removed
  // INTRODUCTION_APP_PROVIDER = 'companyRolesAppProvider', // Removed
  // INTRODUCTION_SERVICE_PROVIDER = 'companyRolesServiceProvider', // Removed
  // INTRODUCTION_CONFORMITY_BODY = 'companyRolesConformityBody', // Removed
  // INTRODUCTION_OSP_BODY = 'companyRolesOnboardingServiceProvider', // Removed
  USE_CASE = 'useCase',
  // USE_CASE_TRACABILITY = 'useCaseTraceablity', // Removed
  SERVICE_MANAGEMENT = 'serviceManagement', // TODO
  SERVICE_OVERVIEW = 'serviceOverview',
  SERVICE_DEACTIVATE = 'serviceDeactivate',
  SERVICE_RELEASE_PROCESS = 'serviceReleaseProcess',
  SERVICE_ADMIN_BOARD = 'serviceAdminBoard',
  SERVICE_ADMIN_BOARD_DETAIL = 'serviceAdminBoardDetail',
  SERVICE_SUBSCRIPTION = 'serviceSubscription',
  SERVICE_RELEASE_PROCESS_FORM = 'serviceReleaseProcessForm',
  ROLE_DETAILS = 'roleDetails',
  SERVICE_DETAIL = 'serviceDetail',
  // COMPANY_ROLE = 'companyRole', // Currently we are removing this page.
  USECASE_PARTICIPATION = 'useCaseParticipation',
  ABOUTPAGE = 'about',
  // CERTIFICATE_CREDENTIAL = 'certificateCredential', // ?
  // DATA_SPACE = 'dataSpace', // Removed
  ADMIN_CREDENTIAL = 'adminCredential',
  // ONBOARDING_SERVICE_PROVIDER = 'onboardingServiceProvider', // Newly Added
  // COMPANY_CERTIFICATE = 'companyCertificate', // Newly Added
  COMPANY_WALLET = 'companyWallet',
  // DECLINE = 'decline', // Newly Added
  CONSENT_OSP = 'consentOsp',
  COMPANY_SUBSCRIPTIONS = 'companySubscriptions',
  COMPANY_SUBSCRIPTIONS_DETAIL = 'companySubscriptionsDetail',
  // COMPANY_DATA = 'companyData', // Removed
  MANAGEMENT_ONBOARDING_SERVICE_PROVIDER = 'ManagementOnboardingServiceProvider', // Newly Added
  OSP_TECHNICAL_USER_MANAGEMENT = 'ospTechnicalUserManagement',
}

export const FOOTERLINK = {
  url: 'https://www.cofinity-x.com/',
}

export const TNC_LINKS = {
  ACTIVE_PARTICIPANT:
    'https://explore.cofinity-x.com/tc-data-provider-consumer',
  APP_PROVIDER:
    'https://explore.cofinity-x.com/tc-application-enablement-service-provider',
  SERVICE_PROVIDER:
    'https://explore.cofinity-x.com/tc-advisory-service-provider',
  ONBOARDING_SERVICE_PROVIDER:
    'https://explore.cofinity-x.com/tc-onboarding-service-provider',
}

export const COMPANY_ROLE = {
  ACTIVE_PARTICIPANT: 'ACTIVE_PARTICIPANT',
  APP_PROVIDER: 'APP_PROVIDER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  ONBOARDING_SERVICE_PROVIDER: 'ONBOARDING_SERVICE_PROVIDER',
}

export const SEARCH_PARAMS = {
  OFFER_ID: 'oId',
  SUBSCRIPTION_ID: 'sId',
  IS_APP: 'a',
  IS_SERVICE: 's',
}

export const DATA_SOVEREIGNTY_ID = 'aa0a0000-7fbc-1f2f-817f-bce0502c1015'

export const YOUR_APP_STATE = {
  DEACTIVATE_SUCCESS: 'deactivate-success',
  CHANGE_IMAGE_SUCCESS: 'change-image-success',
  CHANGE_DESCRIPTION_SUCCESS: 'change-description-success',
  ADD_ROLES_SUCCESS: 'add-roles-success',
}

export const DROPZONE_ERROR_CODE = {
  FILE_INVALID_TYPE: 'file-invalid-type',
  TOO_MANY_FILES: 'too-many-files',
}


