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

import Redirect from 'components/actions/Redirect'
import AppDetail from 'components/pages/AppDetail'
import AppMarketplace from 'components/pages/AppMarketplace'
import AppOverview from 'components/pages/AppOverview'
import AppReleaseProcess from 'components/pages/AppReleaseProcess'
import Contact from 'components/pages/Contact'
import EdcConnector from 'components/pages/EdcConnector'
import Home from 'components/pages/Home'
import Imprint from 'components/pages/Imprint'
import InviteBusinessPartner from 'components/pages/InviteBusinessPartner'
import Logout from 'components/pages/Logout'
import MyAccount from 'components/pages/MyAccount'
import NotificationCenter from 'components/pages/NotificationCenter'
import Organization from 'components/pages/Organization'
import PartnerNetwork from 'components/pages/PartnerNetwork'
import Privacy from 'components/pages/Privacy'
import SemanticHub from 'components/pages/SemanticHub'
import AppSubscription from 'components/pages/AppSubscription'
import ServiceMarketplace from 'components/pages/ServiceMarketplace'
import ServiceMarketplaceDetail from 'components/pages/ServiceMarketplaceDetail'
import TechnicalUserManagement from 'components/pages/TechnicalUserManagement'
import TechnicalUserDetails from 'components/pages/TechnicalUserDetails'
import Terms from 'components/pages/Terms'
import UserManagement from 'components/pages/UserManagement'
import UserDetails from 'components/pages/UserDetail'
import { Route } from 'react-router-dom'
import { COMPANY_ROLES, ROLES } from '../Constants'
import type { IPage } from '../MainTypes'
import AppUserManagement from 'components/pages/AppUserManagement'
import IDPManagement from 'components/pages/IDPManagement'
import UseCase from 'components/pages/UseCase'
import Deactivate from 'components/pages/AppOverview/Deactivate'
import AdminBoard from 'components/pages/AdminBoard'
import AdminBoardDetail from 'components/pages/AdminBoardDetail'
import ServiceReleaseProcess from 'components/pages/ServiceReleaseProcess'
import RoleDetails from 'components/pages/RoleDetails'
import ServiceSubscription from 'components/pages/ServiceSubscription'
import ServiceAdminBoard from 'components/pages/ServiceAdminBoard'
import ServiceAdminBoardDetail from 'components/pages/ServiceAdminBoardDetail'
// import CompanyRoleUpdate from 'components/pages/CompanyRoleUpdate'
// import UsecaseParticipation from 'components/pages/UsecaseParticipation'
import AboutPage from 'components/pages/AboutPage'
import ChangeImage from 'components/pages/AppOverview/ChangeImage'
// import CertificateCredentials from 'components/pages/CertificateCredentials'
import ChangeDescription from 'components/pages/AppOverview/ChangeDescription'
// import DataSpace from 'components/pages/DataSpace'
// import AdminCredential from 'components/pages/AdminCredential'
import AddRoles from 'components/pages/AppOverview/AddRoles'
import ChangeDocuments from 'components/pages/AppOverview/ChangeDocuments'
import CompanyWallet from 'components/pages/CompanyWallet'
import { OSPConsent } from 'components/pages/OSPConsent'
import CompanySubscriptions from 'components/pages/CompanySubscriptions'
import CompanySubscriptionDetail from 'components/pages/CompanySubscriptions/CompanySubscriptionDetail'
import { COMPANY_ROLE, MENUS, PAGES } from './Constants'
import AdminCredential from 'components/pages/AdminCredential'
import OnboardingServiceProvider from 'components/pages/OnboardingServiceProvider/OnboardingServiceProvider'
import {
  companyHasRole,
  userHasPortalRole,
  userHasRegistrationRole,
  userHasSemanticHubRole,
  userHasSsiCredentialRole,
} from 'services/AccessService'
import RegistrationRequests from 'components/pages/Admin/RegistrationRequests'
import AppReleaseProcessForm from 'components/pages/AppReleaseProcess/AppReleaseProcessForm'
import ServiceDeactivate from 'components/pages/ServiceReleaseProcess/ServiceOverview/ServiceDeactivate'
import ServiceDetails from 'components/pages/ServiceReleaseProcess/ServiceOverview/ServiceDetails'
import ServiceReleaseProcessForm from 'components/pages/ServiceReleaseProcess/ServiceReleaseProcessForm'
import ServiceListOverview from 'components/pages/ServiceReleaseProcess/ServiceOverview/ServiceListOverview'
import AppOverviewNew from 'components/pages/AppOverviewNew'
import CompanyData from 'components/pages/CompanyData'

/**
 * ALL_PAGES
 *
 * this is the main application config table. Each entry has at least:
 * name - name of the page used as application route (without leading '/')
 * role - role required to access this page on the front end
 * element - either a JSX Element that renders the page or a custom router setup
 *           for that page. By default it will create a simple route name -> element
 */
export const ALL_PAGES: IPage[] = [
  { name: PAGES.ROOT, element: <Home /> },
  { name: PAGES.HOME, element: <Home /> },
  {
    name: PAGES.REGISTRATION,
    allowTo: () => userHasRegistrationRole(ROLES.VIEW_REGISTRATION),
    element: <Redirect path="registration" />,
  },
  {
    name: PAGES.HELP,
    element: <Redirect path="documentation" tab={'documentation'} />,
  },
  {
    name: PAGES.DOCUMENTATION,
    element: <Redirect path="documentation" tab={'documentation'} />,
  },
  // Removed on purpose
  // {
  //   name: PAGES.MARKETPLACE,
  //   allowTo: () => userHasPortalRole(ROLES.APPSTORE_VIEW),
  //   element: <AppMarketplace />,
  // },
  {
    name: PAGES.APP_MARKETPLACE,
    allowTo: () => userHasPortalRole(ROLES.APPSTORE_VIEW),
    element: <AppMarketplace />,
  },
  {
    name: PAGES.SERVICE_MARKETPLACE,
    allowTo: () => userHasPortalRole(ROLES.APPSTORE_VIEW_SERVICES),
    element: <ServiceMarketplace />,
  },
  {
    name: PAGES.SERVICE_MARKETPLACE_DETAIL,
    allowTo: () => userHasPortalRole(ROLES.APPSTORE_VIEW_SERVICES),
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICE_MARKETPLACE_DETAIL}
        path={PAGES.SERVICE_MARKETPLACE_DETAIL}
        element={<ServiceMarketplaceDetail />}
      >
        <Route index element={null} />
        <Route path=":serviceId" element={<ServiceMarketplaceDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.APP_DETAIL,
    allowTo: () => userHasPortalRole(ROLES.APPSTORE_VIEW),
    isRoute: true,
    element: (
      <Route
        key={PAGES.APP_DETAIL}
        path={PAGES.APP_DETAIL}
        element={<AppDetail navigate={'marketplace'} />}
      >
        <Route index element={null} />
        <Route path=":appId" element={<AppDetail navigate={'marketplace'} />} />
      </Route>
    ),
  },
  // Removed on purpose
  //  {
  //   name: PAGES.DATA_MANAGEMENT,
  //   allowTo: () => userHasSemanticHubRole(ROLES.SEMANTICHUB_VIEW),
  //   element: <SemanticHub />,
  // },
  {
    name: PAGES.SEMANTICHUB,
    allowTo: () => userHasSemanticHubRole(ROLES.SEMANTICHUB_VIEW),
    isRoute: true,
    element: (
      <Route
        key={PAGES.SEMANTICHUB}
        path={PAGES.SEMANTICHUB}
        element={<SemanticHub />}
      >
        <Route index element={null} />
        <Route path=":modelId" element={<SemanticHub />} />
      </Route>
    ),
  },
  // Removed on purpose
  //  {
  //   name: PAGES.CONNECTOR,
  //   allowTo: () => userHasPortalRole(ROLES.CONNECTOR_SETUP),
  //   element: <Connector />,
  // },
  {
    name: PAGES.ACCOUNT,
    allowTo: () => userHasPortalRole(ROLES.MY_ACCOUNT),
    element: <MyAccount />,
  },
  {
    name: PAGES.NOTIFICATIONS,
    allowTo: () => userHasPortalRole(ROLES.NOTIFICATION_VIEW),
    element: <NotificationCenter />,
  },
  {
    name: PAGES.ORGANIZATION,
    allowTo: () => userHasPortalRole(ROLES.MY_ORGANIZATION_VIEW),
    element: <Organization />,
  },
  {
    name: PAGES.PARTNER_NETWORK,
    allowTo: () => userHasPortalRole(ROLES.PARTNER_NETWORK_VIEW),
    element: <PartnerNetwork />,
  },
  {
    name: PAGES.APP_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.APPMANAGEMENT_VIEW),
    element: <AppOverview />,
  },
  // {
  //   name: PAGES.SERVICE_MANAGEMENT,
  //   allowTo: () => userHasPortalRole(ROLES.SERVICEMANAGEMENT_VIEW),
  //   element: <ServiceOverview />,
  // },
  {
    name: PAGES.APP_OVERVIEW,
    allowTo: () => userHasPortalRole(ROLES.APPOVERVIEW_VIEW),
    element: <AppOverview />,
  },
  {
    name: PAGES.APP_OVERVIEW_NEW,
    allowTo: () => userHasPortalRole(ROLES.APPOVERVIEW_VIEW),
    element: <AppOverviewNew />,
  },
  {
    name: PAGES.SERVICE_OVERVIEW,
    allowTo: () => userHasPortalRole(ROLES.SERVICEOVERVIEW_VIEW),
    element: <ServiceListOverview />,
  },
  {
    name: PAGES.APP_RELEASE_PROCESS,
    allowTo: () => userHasPortalRole(ROLES.APPOVERVIEW_VIEW),
    element: <AppReleaseProcess />,
  },
  {
    name: PAGES.SERVICE_RELEASE_PROCESS,
    allowTo: () => userHasPortalRole(ROLES.VIEW_SERVICE_RELEASE),
    element: <ServiceReleaseProcess />,
  },
  {
    name: PAGES.APP_SUBSCRIPTION,
    allowTo: () => userHasPortalRole(ROLES.APP_MANAGEMENT),
    element: <AppSubscription />,
  },
  {
    name: PAGES.SERVICE_SUBSCRIPTION,
    allowTo: () => userHasPortalRole(ROLES.SERVICE_SUBSCRIPTION_MANAGEMENT),
    element: <ServiceSubscription />,
  },
  {
    name: PAGES.APP_ADMIN_BOARD,
    allowTo: () =>
      userHasPortalRole([ROLES.APPROVE_APP_RELEASE, ROLES.DECLINE_APP_RELEASE]),
    element: <AdminBoard />,
  },
  {
    name: PAGES.SERVICE_ADMIN_BOARD,
    allowTo: () =>
      userHasPortalRole([
        ROLES.APPROVE_SERVICE_RELEASE,
        ROLES.DECLINE_SERVICE_RELEASE,
      ]),
    element: <ServiceAdminBoard />,
  },
  {
    name: PAGES.APP_ADMIN_BOARD_DETAIL,
    allowTo: () =>
      userHasPortalRole([ROLES.APPROVE_APP_RELEASE, ROLES.DECLINE_APP_RELEASE]),
    isRoute: true,
    element: (
      <Route
        key={PAGES.APP_ADMIN_BOARD_DETAIL}
        path={PAGES.APP_ADMIN_BOARD_DETAIL}
        element={<AdminBoardDetail />}
      >
        <Route index element={null} />
        <Route path=":appId" element={<AdminBoardDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.SERVICE_ADMIN_BOARD_DETAIL,
    allowTo: () =>
      userHasPortalRole([
        ROLES.APPROVE_SERVICE_RELEASE,
        ROLES.DECLINE_SERVICE_RELEASE,
      ]),
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICE_ADMIN_BOARD_DETAIL}
        path={PAGES.SERVICE_ADMIN_BOARD_DETAIL}
        element={<ServiceAdminBoardDetail />}
      >
        <Route index element={null} />
        <Route path=":appId" element={<ServiceAdminBoardDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.APP_RELEASE_PROCESS_FORM,
    isRoute: true,
    allowTo: () => userHasPortalRole(ROLES.APPOVERVIEW_VIEW),
    element: (
      <Route
        key={`${PAGES.APP_RELEASE_PROCESS}/form`}
        path={`${PAGES.APP_RELEASE_PROCESS}/form`}
        element={<AppReleaseProcessForm />}
      />
    ),
  },
  {
    name: PAGES.SERVICE_RELEASE_PROCESS_FORM,
    isRoute: true,
    allowTo: () => userHasPortalRole(ROLES.VIEW_SERVICE_RELEASE),
    element: (
      <Route
        key={`${PAGES.SERVICE_RELEASE_PROCESS}/form`}
        path={`${PAGES.SERVICE_RELEASE_PROCESS}/form`}
        element={<ServiceReleaseProcessForm />}
      />
    ),
  },
  {
    name: PAGES.USER_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.USERMANAGEMENT_VIEW),
    element: <UserManagement />,
  },
  {
    name: PAGES.USER_DETAILS,
    allowTo: () => userHasPortalRole(ROLES.VIEW_USER_ACCOUNT),
    isRoute: true,
    element: (
      <Route
        key={PAGES.USER_DETAILS}
        path={`/${PAGES.USER_DETAILS}`}
        element={<UserDetails />}
      >
        <Route path=":userId" element={<UserDetails />} />
      </Route>
    ),
  },
  {
    name: PAGES.TECH_USER_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.TECH_USER_VIEW),
    element: <TechnicalUserManagement />,
  },
  {
    name: PAGES.TECH_USER_DETAILS,
    allowTo: () => userHasPortalRole(ROLES.TECH_USER_VIEW),
    isRoute: true,
    element: (
      <Route
        key={PAGES.TECH_USER_DETAILS}
        path={`/${PAGES.TECH_USER_DETAILS}`}
        element={<TechnicalUserDetails />}
      >
        <Route path=":userId" element={<TechnicalUserDetails />} />
      </Route>
    ),
  },
  {
    name: PAGES.APP_USER_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.USERMANAGEMENT_VIEW),
    isRoute: true,
    element: (
      <Route
        key={PAGES.APP_USER_MANAGEMENT}
        path={PAGES.APP_USER_MANAGEMENT}
        element={<AppUserManagement />}
      >
        <Route path=":appId" element={<AppUserManagement />} />
      </Route>
    ),
  },
  {
    name: PAGES.IDP_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.IDP_VIEW),
    element: <IDPManagement />,
  },
  {
    name: PAGES.INVITE,
    allowTo: () => userHasPortalRole(ROLES.INVITE_NEW_PARTNER),
    element: <InviteBusinessPartner />,
  },
  {
    name: PAGES.APPLICATION_REQUESTS,
    allowTo: () => userHasPortalRole(ROLES.SUBMITTED_APPLICATION),
    element: <RegistrationRequests />,
  },
  // {
  //   name: PAGES.CLEARINGHOUSE_SELF_DESCRIPTION,
  //   allowTo: () => userHasPortalRole(ROLES.APPROVE_NEW_PARTNER),
  //   element: <AdminclearinghouseSD />,
  // },
  { name: PAGES.CONTACT, element: <Contact /> },
  { name: PAGES.IMPRINT, element: <Imprint /> },
  { name: PAGES.PRIVACY, element: <Privacy /> },
  { name: PAGES.TERMS, element: <Terms /> },
  { name: PAGES.ABOUTPAGE, element: <AboutPage /> },
  {
    name: PAGES.CONNECTOR_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.CONNECTORS_VIEW),
    element: <EdcConnector />,
  },
  // The below code which refers to "technicalsetup" page should get removed again with 24.12 since we expect that all users which are using bookmarks have switched to the new page.
  {
    name: PAGES.TECHNICAL_SETUP,
    allowTo: () => userHasPortalRole(ROLES.CONNECTORS_VIEW),
    element: <Redirect path={PAGES.CONNECTOR_MANAGEMENT} />,
  },
  // { name: PAGES.INTRODUCTION, element: <CompanyRoles /> },
  // { name: PAGES.INTRODUCTION_APP_PROVIDER, element: <CompanyRoles /> },
  // { name: PAGES.INTRODUCTION_CONFORMITY_BODY, element: <CompanyRoles /> },
  // { name: PAGES.INTRODUCTION_OSP_BODY, element: <CompanyRoles /> },
  // { name: PAGES.INTRODUCTION_PARTICIPANT, element: <CompanyRoles /> },
  // { name: PAGES.INTRODUCTION_SERVICE_PROVIDER, element: <CompanyRoles /> },
  // { name: PAGES.USE_CASE_TRACABILITY, element: <UseCase /> },
  { name: PAGES.LOGOUT, element: <Logout /> },
  { name: PAGES.USE_CASE, element: <UseCase /> },
  {
    name: PAGES.DEACTIVATE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.DEACTIVATE}
        path={PAGES.DEACTIVATE}
        element={<Deactivate />}
      >
        <Route path=":appId" element={<Deactivate />} />
      </Route>
    ),
  },
  {
    name: PAGES.SERVICE_DEACTIVATE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICE_DEACTIVATE}
        path={PAGES.SERVICE_DEACTIVATE}
        element={<ServiceDeactivate />}
      >
        <Route path=":serviceId" element={<ServiceDeactivate />} />
      </Route>
    ),
  },
  {
    name: PAGES.CHANGE_IMAGE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.CHANGE_IMAGE}
        path={PAGES.CHANGE_IMAGE}
        element={<ChangeImage />}
      >
        <Route path=":appId" element={<ChangeImage />} />
      </Route>
    ),
  },
  {
    name: PAGES.CHANGE_DESCRIPTION,
    isRoute: true,
    element: (
      <Route
        key={PAGES.CHANGE_DESCRIPTION}
        path={PAGES.CHANGE_DESCRIPTION}
        element={<ChangeDescription />}
      >
        <Route path=":appId" element={<ChangeDescription />} />
      </Route>
    ),
  },
  {
    name: PAGES.ADD_ROLES,
    isRoute: true,
    element: (
      <Route
        key={PAGES.ADD_ROLES}
        path={PAGES.ADD_ROLES}
        element={<AddRoles />}
      >
        <Route path=":appId" element={<AddRoles />} />
      </Route>
    ),
  },
  {
    name: PAGES.CHANGE_DOCUMENTS,
    isRoute: true,
    element: (
      <Route
        key={PAGES.CHANGE_DOCUMENTS}
        path={PAGES.CHANGE_DOCUMENTS}
        element={<ChangeDocuments />}
      >
        <Route path=":appId" element={<ChangeDocuments />} />
      </Route>
    ),
  },
  {
    name: PAGES.VIEW_DETAILS,
    isRoute: true,
    element: (
      <Route
        key={PAGES.VIEW_DETAILS}
        path={PAGES.VIEW_DETAILS}
        element={<AppDetail navigate={'appOverview'} />}
      >
        <Route path=":appId" element={<AppDetail navigate={'appOverview'} />} />
      </Route>
    ),
  },
  {
    name: PAGES.ROLE_DETAILS,
    element: <RoleDetails />,
  },
  {
    name: PAGES.SERVICE_DETAIL,
    allowTo: () => userHasPortalRole(ROLES.SERVICEOVERVIEW_VIEW),
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICE_DETAIL}
        path={PAGES.SERVICE_DETAIL}
        element={<ServiceDetails />}
      >
        <Route path=":serviceId" element={<ServiceDetails />} />
      </Route>
    ),
  },
  // Removed on purpose
  // {
  //   name: PAGES.COMPANY_ROLE,
  //   allowTo: () => userHasPortalRole(ROLES.UPDATE_COMPANY_ROLE),
  //   element: <CompanyRoleUpdate />,
  // },
  // Removed on purpose
  // {
  //   name: PAGES.USECASE_PARTICIPATION,
  //   allowTo: () => userHasPortalRole(ROLES.REQUEST_SSICREDENTIAL),
  //   element: <UseCaseParticipation />,
  // },
  // Removed on purpose
  // {
  //   name: PAGES.CERTIFICATE_CREDENTIAL,
  //   allowTo: () => userHasPortalRole(ROLES.REQUEST_SSICREDENTIAL),
  //   element: <CertificateCredentials />,
  // },
  // Removed on purpose
  // { name: PAGES.DATA_SPACE, element: <DataSpace /> },
  {
    name: PAGES.ADMIN_CREDENTIAL,
    allowTo: () => userHasSsiCredentialRole(ROLES.DECISION_SSICREDENTIAL),
    element: <AdminCredential />,
  },
  // Removed on purpose
  // {
  //   name: PAGES.COMPANY_CERTIFICATE,
  //   allowTo: () => userHasPortalRole(ROLES.COMPANY_CERTIFICATE_VIEW),
  //   element: <CompanyCertificates />,
  // },
  {
    name: PAGES.COMPANY_WALLET,
    allowTo: () => userHasSsiCredentialRole(ROLES.CREDENTIAL_REQUESTS),
    element: <CompanyWallet />,
  },
  {
    name: PAGES.CONSENT_OSP,
    element: <OSPConsent />,
  },
  {
    name: PAGES.COMPANY_SUBSCRIPTIONS,
    allowTo: () => userHasPortalRole(ROLES.VIEW_SUBSCRIPTION),
    element: <CompanySubscriptions />,
  },
  {
    name: PAGES.COMPANY_SUBSCRIPTIONS_DETAIL,
    allowTo: () => userHasPortalRole(ROLES.VIEW_SUBSCRIPTION),
    isRoute: true,
    element: (
      <Route
        key={PAGES.COMPANY_SUBSCRIPTIONS_DETAIL}
        path={PAGES.COMPANY_SUBSCRIPTIONS_DETAIL}
        element={<CompanySubscriptionDetail />}
      >
        <Route path=":appId" element={<CompanySubscriptionDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.COMPANY_DATA,
    allowTo: () => userHasPortalRole(ROLES.MY_ORGANIZATION_VIEW),
    element: <CompanyData />,
  },
  {
    name: PAGES.MANAGEMENT_ONBOARDING_SERVICE_PROVIDER,
    allowTo: () =>
      userHasPortalRole(ROLES.CONFIGURE_PARTNER_REGISTRATION) &&
      companyHasRole(COMPANY_ROLES.ONBOARDING_SERVICE_PROVIDER),
    element: <OnboardingServiceProvider />,
  },
  {
    name: PAGES.OSP_TECHNICAL_USER_MANAGEMENT,
    allowTo: () => userHasPortalRole(ROLES.TECH_USER_VIEW),
    element: <TechnicalUserManagement />,
  },
]

/**
 * mainMenuFullTree
 *
 * lists all the entries that are visible in the main menu for a user with maximum permissions.
 * it will be restricted by personal user permissions
 */
export const mainMenuFullTree = [
  {
    name: MENUS.DATASPACE_PARTICIPATION, // Use case
    children: [
      { name: PAGES.PARTNER_NETWORK },
      // { name: PAGES.USECASE_PARTICIPATION }, // Removed on purpose
    ],
  },
  {
    name: MENUS.MARKETPLACE,
    children: [
      { name: PAGES.APP_MARKETPLACE },
      { name: PAGES.SERVICE_MARKETPLACE },
      { name: PAGES.COMPANY_SUBSCRIPTIONS }, // Company Subscription
    ],
  },
  {
    name: MENUS.MARKETPLACE_MANAGEMENT, // App Management & Service Management
    children: [
      {
        name: MENUS.APP_MANAGEMENT,
        children: [
          { name: PAGES.APP_OVERVIEW }, // App Overview
          { name: PAGES.APP_RELEASE_PROCESS },
          { name: PAGES.APP_SUBSCRIPTION },
        ],
      },
      {
        name: MENUS.SERVICE_MANAGEMENT,
        children: [
          { name: PAGES.SERVICE_OVERVIEW }, // Service Overview
          { name: PAGES.SERVICE_RELEASE_PROCESS },
          { name: PAGES.SERVICE_SUBSCRIPTION },
        ],
      },
    ],
  },
  {
    name: MENUS.TECHNICAL_SETUP, // New Section
    children: [
      { name: PAGES.TECH_USER_MANAGEMENT },
      { name: PAGES.IDP_MANAGEMENT }, // Identity Provide Config
      { name: PAGES.CONNECTOR_MANAGEMENT }, // Connector Management
      { name: PAGES.SEMANTICHUB },
    ],
  },
  {
    name: MENUS.ON_BOARDING_MANAGEMENT,
    companyRole: COMPANY_ROLE.ONBOARDING_SERVICE_PROVIDER,
    children: [
      { name: PAGES.MANAGEMENT_ONBOARDING_SERVICE_PROVIDER },
      { name: PAGES.OSP_TECHNICAL_USER_MANAGEMENT },
    ],
  },
]

/**
 * userMenuFull
 *
 * lists all the entries that are visible in the user menu for a user with maximum permissions
 * it will be restricted by personal user permissions
 */
export const userMenuFull = [
  PAGES.ACCOUNT,
  PAGES.USER_MANAGEMENT,
  PAGES.ORGANIZATION,
  // PAGES.COMPANY_ROLE, // For now we are removing this page
  PAGES.COMPANY_WALLET,
  // PAGES.COMPANY_DATA,
  PAGES.NOTIFICATIONS,
  PAGES.LOGOUT,
]

export const userMenuWithChildren = [
  {
    name: MENUS.CX_OPERATOR, // New Section
    children: [
      { name: PAGES.INVITE },
      { name: PAGES.APPLICATION_REQUESTS },
      { name: PAGES.ADMIN_CREDENTIAL },
      { name: PAGES.APP_ADMIN_BOARD }, // Admin Board -> App Marketplace
      { name: PAGES.SERVICE_ADMIN_BOARD }, // Admin Board -> Service Marketplace
    ],
  },
]

/**
 * footerMenuFull
 *
 * lists all the entries that are visible in the footer menu for a user with maximum permissions.
 * it will be restricted by personal user permissions
 */
export const footerMenuFull = [PAGES.IMPRINT, PAGES.PRIVACY, PAGES.CONTACT]
