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
import SetLang from 'components/actions/SetLang'
import SignOut from 'components/actions/SignOut'
import RegistrationRequests from 'components/pages/Admin/components/RegistrationRequests'
import AppDetail from 'components/pages/AppDetail'
import AppMarketplace from 'components/pages/AppMarketplace'
import AppOverview from 'components/pages/AppOverview'
import AppOverviewNew from 'components/pages/AppOverviewNew'
import AppReleaseProcess from 'components/pages/AppReleaseProcess'
import Connector from 'components/pages/Connector'
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
import Test from 'components/pages/Test'
import UserManagement from 'components/pages/UserManagement'
import UserDetails from 'components/pages/UserDetail'
import { Route } from 'react-router-dom'
import { ACTIONS, HINTS, OVERLAYS, PAGES, ROLES } from './Constants'
import type { IAction, IOverlay, IPage } from './MainTypes'
import AppUserManagement from 'components/pages/AppUserManagement'
import IDPManagement from 'components/pages/IDPManagement'
import AppReleaseProcessForm from 'components/pages/AppReleaseProcess/components'
import CompanyRoles from 'components/pages/CompanyRoles'
import UseCase from 'components/pages/UseCase'
import Deactivate from 'components/pages/AppOverview/Deactivate'
import AdminBoard from 'components/pages/AdminBoard'
import AdminBoardDetail from 'components/pages/AdminBoardDetail'
import ServiceReleaseProcess from 'components/pages/ServiceReleaseProcess'
import ServiceReleaseProcessForm from 'components/pages/ServiceReleaseProcess/components'
import RoleDetails from 'components/pages/RoleDetails'
import ServiceOverview from 'components/pages/ServiceReleaseProcess/components/ServiceListOverview'
import ServiceDetails from 'components/pages/ServiceReleaseProcess/components/ServiceDetails'
import ServiceSubscription from 'components/pages/ServiceSubscription'
import ServiceAdminBoard from 'components/pages/ServiceAdminBoard'
import ServiceAdminBoardDetail from 'components/pages/ServiceAdminBoardDetail'
import CompanyRoleUpdate from 'components/pages/CompanyRoleUpdate'
import UsecaseParticipation from 'components/pages/UsecaseParticipation'
import AboutPage from 'components/pages/AboutPage'
import ChangeImage from 'components/pages/AppOverview/ChangeImage'
import CertificateCredentials from 'components/pages/CertificateCredentials'
import ChangeDescription from 'components/pages/AppOverview/ChangeDescription'
import DataSpace from 'components/pages/DataSpace'
import AdminCredential from 'components/pages/AdminCredential'
import AddRoles from 'components/pages/AppOverview/AddRoles'
import ServiceDeactivate from 'components/pages/ServiceReleaseProcess/components/ServiceDeactivate'
import ChangeDocuments from 'components/pages/AppOverview/ChangeDocuments'
import OSPManagement from 'components/pages/OSPManagement'
import CompanyWallet from 'components/pages/CompanyWallet'
import CompanyCertificates from 'components/pages/CompanyCertificates'
import { OSPConsent } from 'components/pages/OSPConsent'
import CompanySubscriptions from 'components/pages/CompanySubscriptions'
import CompanySubscriptionDetail from 'components/pages/CompanySubscriptions/CompanySubscriptionDetail'
import CompanyData from 'components/pages/CompanyData'
import OnboardingServiceProvider from 'components/pages/OnboardingServiceProvider/OnboardingServiceProvider'

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
  { name: PAGES.REGISTRATION, element: <Redirect path="registration" /> },
  {
    name: PAGES.HELP,
    element: <Redirect path="documentation" tab={'documentation'} />,
  },
  {
    name: PAGES.DOCUMENTATION,
    element: <Redirect path="documentation" tab={'documentation'} />,
  },
  {
    name: PAGES.STORYBOOK,
    element: <Redirect path="_storybook" tab={'storybook'} />,
  },
  {
    name: PAGES.MARKETPLACE,
    role: ROLES.APPSTORE_VIEW,
    element: <AppMarketplace />,
  },
  {
    name: PAGES.APP_MARKETPLACE,
    role: ROLES.APPSTORE_VIEW,
    element: <AppMarketplace />,
  },
  {
    name: PAGES.SERVICE_MARKETPLACE,
    role: ROLES.APPSTORE_VIEW_SERVICES,
    element: <ServiceMarketplace />,
  },
  {
    name: PAGES.SERVICE_MARKETPLACE_DETAIL,
    role: ROLES.APPSTORE_VIEW_SERVICES,
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
    role: ROLES.APPSTORE_VIEW,
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
  {
    name: PAGES.DATA_MANAGEMENT,
    role: ROLES.SEMANTICHUB_VIEW,
    element: <SemanticHub />,
  },
  {
    name: PAGES.SEMANTICHUB,
    role: ROLES.SEMANTICHUB_VIEW,
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
  {
    name: PAGES.CONNECTOR,
    role: ROLES.CONNECTOR_SETUP,
    element: <Connector />,
  },
  {
    name: PAGES.ACCOUNT,
    role: ROLES.MY_ACCOUNT,
    element: <MyAccount />,
  },
  {
    name: PAGES.NOTIFICATIONS,
    role: ROLES.NOTIFICATION_VIEW,
    element: <NotificationCenter />,
  },
  {
    name: PAGES.ORGANIZATION,
    role: ROLES.MY_ORGANIZATION_VIEW,
    element: <Organization />,
  },
  {
    name: PAGES.PARTNER_NETWORK,
    role: ROLES.PARTNER_NETWORK_VIEW,
    element: <PartnerNetwork />,
  },
  {
    name: PAGES.APP_MANAGEMENT,
    role: ROLES.APPMANAGEMENT_VIEW,
    element: <AppOverview />,
  },
  {
    name: PAGES.SERVICE_MANAGEMENT,
    role: ROLES.SERVICEMANAGEMENT_VIEW,
    element: <ServiceOverview />,
  },
  {
    name: PAGES.APP_OVERVIEW,
    role: ROLES.APPOVERVIEW_VIEW,
    element: <AppOverview />,
  },
  {
    name: PAGES.APP_OVERVIEW_NEW,
    role: ROLES.APPOVERVIEW_VIEW,
    element: <AppOverviewNew />,
  },
  {
    name: PAGES.SERVICE_OVERVIEW,
    role: ROLES.SERVICEOVERVIEW_VIEW,
    element: <ServiceOverview />,
  },
  {
    name: PAGES.APP_RELEASE_PROCESS,
    role: ROLES.APPOVERVIEW_VIEW,
    element: <AppReleaseProcess />,
  },
  {
    name: PAGES.SERVICE_RELEASE_PROCESS,
    role: ROLES.VIEW_SERVICE_RELEASE,
    element: <ServiceReleaseProcess />,
  },
  {
    name: PAGES.APP_SUBSCRIPTION,
    role: ROLES.APP_MANAGEMENT,
    element: <AppSubscription />,
  },
  {
    name: PAGES.SERVICE_SUBSCRIPTION,
    role: ROLES.SERVICE_SUBSCRIPTION_MANAGEMENT,
    element: <ServiceSubscription />,
  },
  {
    name: PAGES.ADMINBOARD,
    role: ROLES.APPROVE_APP_RELEASE || ROLES.DECLINE_APP_RELEASE,
    element: <AdminBoard />,
  },
  {
    name: PAGES.SERVICE_ADMIN_BOARD,
    role: ROLES.APPROVE_SERVICE_RELEASE || ROLES.DECLINE_SERVICE_RELEASE,
    element: <ServiceAdminBoard />,
  },
  {
    name: PAGES.ADMINBOARD_DETAIL,
    role: ROLES.APPROVE_APP_RELEASE || ROLES.DECLINE_APP_RELEASE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.ADMINBOARD_DETAIL}
        path={PAGES.ADMINBOARD_DETAIL}
        element={<AdminBoardDetail />}
      >
        <Route index element={null} />
        <Route path=":appId" element={<AdminBoardDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.SERVICE_ADMIN_BOARD_DETAIL,
    role: ROLES.APPROVE_SERVICE_RELEASE || ROLES.DECLINE_SERVICE_RELEASE,
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
    role: ROLES.APPOVERVIEW_VIEW,
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
    role: ROLES.VIEW_SERVICE_RELEASE,
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
    role: ROLES.USERMANAGEMENT_VIEW,
    element: <UserManagement />,
  },
  {
    name: PAGES.USER_DETAILS,
    role: ROLES.VIEW_USER_ACCOUNT,
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
    role: ROLES.TECH_USER_VIEW,
    element: <TechnicalUserManagement />,
  },
  {
    name: PAGES.TECH_USER_DETAILS,
    role: ROLES.TECH_USER_VIEW,
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
    role: ROLES.USERMANAGEMENT_VIEW,
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
    role: ROLES.IDP_VIEW,
    element: <IDPManagement />,
  },
  {
    name: PAGES.INVITE,
    role: ROLES.INVITE_NEW_PARTNER,
    element: <InviteBusinessPartner />,
  },
  {
    name: PAGES.APPLICATION_REQUESTS,
    role: ROLES.SUBMITTED_APPLICATION,
    element: <RegistrationRequests />,
  },
  { name: PAGES.CONTACT, element: <Contact /> },
  { name: PAGES.IMPRINT, element: <Imprint /> },
  { name: PAGES.PRIVACY, element: <Privacy /> },
  { name: PAGES.TERMS, element: <Terms /> },
  { name: PAGES.TEST, element: <Test /> },
  { name: PAGES.ABOUTPAGE, element: <AboutPage /> },
  {
    name: PAGES.CONNECTOR_MANAGEMENT,
    role: ROLES.CONNECTORS_VIEW,
    element: <EdcConnector />,
  },
  // The below code which refers to "technicalsetup" page should get removed again with 24.12 since we expect that all users which are using bookmarks have switched to the new page.
  {
    name: PAGES.TECHNICAL_SETUP,
    role: ROLES.CONNECTORS_VIEW,
    element: <Redirect path={PAGES.CONNECTOR_MANAGEMENT} />,
  },
  { name: PAGES.LOGOUT, element: <Logout /> },
  { name: PAGES.INTRODUCTION, element: <CompanyRoles /> },
  { name: PAGES.INTRODUCTION_APP_PROVIDER, element: <CompanyRoles /> },
  { name: PAGES.INTRODUCTION_CONFORMITY_BODY, element: <CompanyRoles /> },
  { name: PAGES.INTRODUCTION_OSP_BODY, element: <CompanyRoles /> },
  { name: PAGES.INTRODUCTION_PARTICIPANT, element: <CompanyRoles /> },
  { name: PAGES.INTRODUCTION_SERVICE_PROVIDER, element: <CompanyRoles /> },
  { name: PAGES.USE_CASE, element: <UseCase /> },
  { name: PAGES.USE_CASE_TRACABILITY, element: <UseCase /> },
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
    role: ROLES.SERVICEOVERVIEW_VIEW,
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
  {
    name: PAGES.COMPANY_ROLE,
    role: ROLES.UPDATE_COMPANY_ROLE,
    element: <CompanyRoleUpdate />,
  },
  {
    name: PAGES.USECASE_PARTICIPATION,
    role: ROLES.REQUEST_SSICREDENTIAL,
    element: <UsecaseParticipation />,
  },
  {
    name: PAGES.CERTIFICATE_CREDENTIAL,
    role: ROLES.REQUEST_SSICREDENTIAL,
    element: <CertificateCredentials />,
  },
  { name: PAGES.DATA_SPACE, element: <DataSpace /> },
  {
    name: PAGES.ADMIN_CREDENTIAL,
    role: ROLES.DECISION_SSICREDENTIAL,
    element: <AdminCredential />,
  },
  {
    name: PAGES.ONBOARDING_SERVICE_PROVIDER,
    role: ROLES.IDP_VIEW,
    element: <OSPManagement />,
  },
  {
    name: PAGES.COMPANY_CERTIFICATE,
    role: ROLES.COMPANY_CERTIFICATE_VIEW,
    element: <CompanyCertificates />,
  },
  {
    name: PAGES.COMPANY_WALLET,
    role: ROLES.CREDENTIAL_REQUESTS,
    element: <CompanyWallet />,
  },
  {
    name: PAGES.CONSENT_OSP,
    element: <OSPConsent />,
  },
  {
    name: PAGES.COMPANY_SUBSCRIPTIONS,
    role: ROLES.VIEW_SUBSCRIPTION,
    element: <CompanySubscriptions />,
  },
  {
    name: PAGES.COMPANY_SUBSCRIPTIONS_DETAIL,
    role: ROLES.VIEW_SUBSCRIPTION,
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
    role: ROLES.MY_ORGANIZATION_VIEW,
    element: <CompanyData />,
  },
  {
    name: PAGES.MANAGEMENT_ONBOARDING_SERVICE_PROVIDER,
    element: <OnboardingServiceProvider />,
  },
]

export const ALL_OVERLAYS: IOverlay[] = [
  {
    name: OVERLAYS.ADD_BPN,
    role: ROLES.MODIFY_USER_ACCOUNT,
  },
  {
    name: OVERLAYS.ADD_USER,
    role: ROLES.USERMANAGEMENT_ADD,
  },
  {
    name: OVERLAYS.ADD_MULTIPLE_USER,
    role: ROLES.USERMANAGEMENT_ADD,
  },
  {
    name: OVERLAYS.ADD_TECH_USER,
    role: ROLES.TECH_USER_ADD,
  },
  {
    name: OVERLAYS.DELETE_TECH_USER,
    role: ROLES.TECH_USER_DELETE,
  },
  {
    name: OVERLAYS.ADD_APP_USER_ROLES,
    role: ROLES.MODIFY_USER_ACCOUNT,
  },
  {
    name: OVERLAYS.EDIT_APP_USER_ROLES,
    role: ROLES.MODIFY_USER_ACCOUNT,
  },
  { name: OVERLAYS.APP, role: ROLES.APPSTORE_VIEW },
  { name: OVERLAYS.NEWS },
  {
    name: OVERLAYS.PARTNER,
    role: ROLES.PARTNER_NETWORK_VIEW,
  },
  {
    name: OVERLAYS.USER,
    role: ROLES.USERMANAGEMENT_VIEW,
  },
  {
    name: OVERLAYS.SERVICE_REQUEST,
    role: ROLES.APPSTORE_VIEW_SERVICES,
  },
  {
    name: OVERLAYS.APPMARKETPLACE_REQUEST,
    role: ROLES.APPSTORE_VIEW,
  },
  {
    name: OVERLAYS.IDP_DETAILS,
    role: ROLES.IDP_VIEW,
  },
  {
    name: OVERLAYS.NOT_FOUND,
    role: ROLES.IDP_VIEW,
  },
  {
    name: OVERLAYS.IDP_CONFIRM,
    role: ROLES.IDP_DELETE,
  },
  {
    name: OVERLAYS.ADD_IDP,
    role: ROLES.IDP_ADD,
  },
  {
    name: OVERLAYS.UPDATE_IDP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.UPDATE_IDP_SUCCESS,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.ENABLE_IDP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.DISABLE_IDP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.DISABLE_MANAGED_IDP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.ENABLE_IDP_SUCCESS,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.DELETE_MANAGED_IDP,
    role: ROLES.IDP_DELETE,
  },
  {
    name: OVERLAYS.ADDUSERS_IDP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.REGISTER_OSP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.REGISTER_NEXT_OSP,
    role: ROLES.IDP_SETUP,
  },
  {
    name: OVERLAYS.APP_OVERVIEW_CONFIRM,
    role: ROLES.APPOVERVIEW_VIEW,
  },
  {
    name: OVERLAYS.APP_DETAILS_OVERLAY,
  },
  {
    name: OVERLAYS.CONFIRM_USER_ACTION,
  },
  {
    name: OVERLAYS.ADD_SERVICE_PROVIDER,
  },
  {
    name: OVERLAYS.SERVICE_DECLINE_ADMINBOARD,
  },
  {
    name: OVERLAYS.APP_DECLINE_ADMINBOARD,
  },
  {
    name: OVERLAYS.EDIT_PORTAL_ROLES,
  },
  {
    name: OVERLAYS.UPDATE_COMPANY_ROLE,
  },
  {
    name: OVERLAYS.EDIT_USECASE,
  },
  {
    name: OVERLAYS.UPDATE_CERTIFICATE,
  },
  {
    name: OVERLAYS.COMPANY_CERTIFICATE_DETAILS,
  },
  {
    name: OVERLAYS.COMPANY_CERTIFICATE_CONFIRM_DELETE,
  },
  {
    name: OVERLAYS.CSV_UPLOAD_OVERLAY,
  },
]

export const ALL_ACTIONS: IAction[] = [
  { name: ACTIONS.SIGNOUT, element: <SignOut /> },
  { name: ACTIONS.LANG_DE, element: <SetLang lang="de" /> },
  { name: ACTIONS.LANG_EN, element: <SetLang lang="en" /> },
]

/**
 * mainMenuFullTree
 *
 * lists all the entries that are visible in the main menu for a user with maximum permissions.
 * it will be restricted by personal user permissions
 */
export const mainMenuFullTree = [
  { name: PAGES.HOME },
  {
    name: PAGES.INTRODUCTION,
    children: [
      { name: PAGES.INTRODUCTION_PARTICIPANT, hint: HINTS.NEW },
      { name: PAGES.INTRODUCTION_APP_PROVIDER, hint: HINTS.NEW },
      { name: PAGES.INTRODUCTION_SERVICE_PROVIDER, hint: HINTS.NEW },
      { name: PAGES.INTRODUCTION_CONFORMITY_BODY, hint: HINTS.NEW },
      { name: PAGES.INTRODUCTION_OSP_BODY, hint: HINTS.NEW },
    ],
  },
  {
    name: PAGES.USE_CASE,
    children: [{ name: PAGES.USE_CASE_TRACABILITY, hint: HINTS.NEW }],
  },
  {
    name: PAGES.DATA_SPACE,
  },
  {
    name: PAGES.MARKETPLACE,
    children: [
      { name: PAGES.APP_MARKETPLACE },
      { name: PAGES.SERVICE_MARKETPLACE, hint: HINTS.NEW },
    ],
  },
  {
    name: PAGES.DATA_MANAGEMENT,
    children: [{ name: PAGES.SEMANTICHUB }],
  },
  { name: PAGES.PARTNER_NETWORK },
  {
    name: PAGES.APP_MANAGEMENT,
    children: [
      { name: PAGES.APP_OVERVIEW, hint: HINTS.NEW },
      { name: PAGES.APP_RELEASE_PROCESS },
      { name: PAGES.APP_SUBSCRIPTION, hint: HINTS.NEW },
      { name: PAGES.ADMINBOARD, hint: HINTS.NEW },
    ],
  },
  {
    name: PAGES.SERVICE_MANAGEMENT,
    children: [
      { name: PAGES.SERVICE_OVERVIEW, hint: HINTS.NEW },
      { name: PAGES.SERVICE_RELEASE_PROCESS, hint: HINTS.NEW },
      {
        name: PAGES.SERVICE_SUBSCRIPTION,
        hint: HINTS.NEW,
      },
      { name: PAGES.SERVICE_ADMIN_BOARD, hint: HINTS.NEW },
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
  PAGES.ORGANIZATION,
  PAGES.COMPANY_SUBSCRIPTIONS,
  PAGES.NOTIFICATIONS,
  PAGES.USER_MANAGEMENT,
  PAGES.IDP_MANAGEMENT,
  PAGES.CONNECTOR_MANAGEMENT,
  PAGES.APPLICATION_REQUESTS,
  PAGES.INVITE,
  PAGES.COMPANY_ROLE,
  PAGES.USECASE_PARTICIPATION,
  PAGES.CERTIFICATE_CREDENTIAL,
  PAGES.ADMIN_CREDENTIAL,
  PAGES.COMPANY_CERTIFICATE,
  PAGES.COMPANY_WALLET,
  PAGES.COMPANY_DATA,
  PAGES.MANAGEMENT_ONBOARDING_SERVICE_PROVIDER,
  PAGES.LOGOUT,
]

export const userMenuRegistration = [PAGES.LOGOUT]

export const userMenuCompany = [
  PAGES.ORGANIZATION,
  PAGES.USER_MANAGEMENT,
  PAGES.IDP_MANAGEMENT,
  PAGES.CONNECTOR_MANAGEMENT,
  PAGES.APPLICATION_REQUESTS,
  PAGES.INVITE,
  PAGES.COMPANY_ROLE,
  PAGES.USECASE_PARTICIPATION,
  PAGES.CERTIFICATE_CREDENTIAL,
  PAGES.ADMIN_CREDENTIAL,
  PAGES.COMPANY_CERTIFICATE,
  PAGES.COMPANY_WALLET,
  PAGES.COMPANY_DATA,
]

/**
 * footerMenuFull
 *
 * lists all the entries that are visible in the footer menu for a user with maximum permissions.
 * it will be restricted by personal user permissions
 */
export const footerMenuFull = [
  PAGES.HELP,
  PAGES.CONTACT,
  PAGES.IMPRINT,
  PAGES.PRIVACY,
  PAGES.TERMS,
  PAGES.ABOUTPAGE,
]
