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
import RegistrationRequests from 'components/pages/Admin/components/RegistrationRequests'
import AppDetail from 'components/pages/AppDetail'
import AppMarketplace from 'components/pages/AppMarketplace'
import AppOverview from 'components/pages/AppOverview'
import AppReleaseProcess from 'components/pages/AppReleaseProcess'
import Contact from 'components/pages/Contact'
import CookiePolicy from 'components/pages/CookiePolicy'
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
import TechnicalUserManagement from 'components/pages/TechnicalUserManagement'
import TechnicalUserDetails from 'components/pages/TechnicalUserDetails'
import Terms from 'components/pages/Terms'
import UserManagement from 'components/pages/UserManagement'
import UserDetails from 'components/pages/UserDetail'
import { Route } from 'react-router-dom'
import { ROLES } from '../Constants'
import type { IPage } from '../MainTypes'
import IDPManagement from 'components/pages/IDPManagement'
import AppReleaseProcessForm from 'components/pages/AppReleaseProcess/components'
import UseCase from 'components/pages/UseCase'
import Deactivate from 'components/pages/AppOverview/Deactivate'
import AdminBoard from 'components/pages/AdminBoard'
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
// import CertificateCredentials from 'components/pages/CertificateCredentials'
import ChangeDescription from 'components/pages/AppOverview/ChangeDescription'
// import DataSpace from 'components/pages/DataSpace'
// import AdminCredential from 'components/pages/AdminCredential'
import AddRoles from 'components/pages/AppOverview/AddRoles'
import ServiceDeactivate from 'components/pages/ServiceReleaseProcess/components/ServiceDeactivate'
import ChangeDocuments from 'components/pages/AppOverview/ChangeDocuments'

import CompanyWallet from 'components/pages/CompanyWallet'
import CompanySubscriptions from 'components/pages/CompanySubscriptions'
import CompanySubscriptionDetail from 'components/pages/CompanySubscriptions/CompanySubscriptionDetail'

import { MENUS, PAGES } from './Constants'

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
    role: ROLES.PARTNER_NETWORK_VIEW,
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
    name: PAGES.APPOVERVIEW,
    role: ROLES.APPOVERVIEW_VIEW,
    element: <AppOverview />,
  },
  {
    name: PAGES.SERVICEOVERVIEW,
    role: ROLES.SERVICEOVERVIEW_VIEW,
    element: <ServiceOverview />,
  },
  {
    name: PAGES.APPRELEASEPROCESS,
    role: ROLES.APPOVERVIEW_VIEW,
    element: <AppReleaseProcess />,
  },
  {
    name: PAGES.SERVICERELEASEPROCESS,
    role: ROLES.VIEW_SERVICE_RELEASE,
    element: <ServiceReleaseProcess />,
  },
  {
    name: PAGES.APPSUBSCRIPTION,
    role: ROLES.APP_MANAGEMENT,
    element: <AppSubscription />,
  },
  {
    name: PAGES.SERVICESUBSCRIPTION,
    role: ROLES.SERVICE_SUBSCRIPTION_MANAGEMENT,
    element: <ServiceSubscription />,
  },
  {
    name: PAGES.ADMINBOARD,
    role: ROLES.APPROVE_APP_RELEASE || ROLES.DECLINE_APP_RELEASE,
    element: <AdminBoard />,
  },
  {
    name: PAGES.SERVICEADMINBOARD,
    role: ROLES.APPROVE_SERVICE_RELEASE || ROLES.DECLINE_SERVICE_RELEASE,
    element: <ServiceAdminBoard />,
  },
  {
    name: PAGES.SERVICEADMINBOARD_DETAIL,
    role: ROLES.APPROVE_SERVICE_RELEASE || ROLES.DECLINE_SERVICE_RELEASE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICEADMINBOARD_DETAIL}
        path={PAGES.SERVICEADMINBOARD_DETAIL}
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
        key={`${PAGES.APPRELEASEPROCESS}/form`}
        path={`${PAGES.APPRELEASEPROCESS}/form`}
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
        key={`${PAGES.SERVICERELEASEPROCESS}/form`}
        path={`${PAGES.SERVICERELEASEPROCESS}/form`}
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
    name: PAGES.TECHUSER_MANAGEMENT,
    role: ROLES.TECHUSER_VIEW,
    element: <TechnicalUserManagement />,
  },
  {
    name: PAGES.TECHUSER_DETAILS,
    role: ROLES.TECHUSER_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.TECHUSER_DETAILS}
        path={`/${PAGES.TECHUSER_DETAILS}`}
        element={<TechnicalUserDetails />}
      >
        <Route path=":userId" element={<TechnicalUserDetails />} />
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
  { name: PAGES.COOKIE_POLICY, element: <CookiePolicy /> },
  { name: PAGES.ABOUTPAGE, element: <AboutPage /> },
  {
    name: PAGES.CONNECTOR_MANAGEMENT,
    role: ROLES.TECHNICAL_SETUP_VIEW,
    element: <EdcConnector />,
  },
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
    name: PAGES.SERVICEDEACTIVATE,
    isRoute: true,
    element: (
      <Route
        key={PAGES.SERVICEDEACTIVATE}
        path={PAGES.SERVICEDEACTIVATE}
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
        element={<AppDetail navigate={'appoverview'} />}
      >
        <Route path=":appId" element={<AppDetail navigate={'appoverview'} />} />
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
    name: PAGES.COMPANY_WALLET,
    role: ROLES.CREDENTIAL_REQUESTS,
    element: <CompanyWallet />,
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
      { name: PAGES.USECASE_PARTICIPATION },
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
          { name: PAGES.APPOVERVIEW }, // App Overview
          { name: PAGES.APPRELEASEPROCESS },
          { name: PAGES.APPSUBSCRIPTION },
        ],
      },
      {
        name: MENUS.SERVICE_MANAGEMENT,
        children: [
          { name: PAGES.SERVICEOVERVIEW }, // Service Overview
          { name: PAGES.SERVICERELEASEPROCESS },
          { name: PAGES.SERVICESUBSCRIPTION },
        ],
      },
    ],
  },
  {
    name: MENUS.TECHNICAL_SETUP, // New Section
    children: [
      { name: PAGES.TECHUSER_MANAGEMENT },
      { name: PAGES.IDP_MANAGEMENT }, // Identity Provide Config
      { name: PAGES.CONNECTOR_MANAGEMENT }, // Connector Management
      { name: PAGES.SEMANTICHUB },
    ],
  },
  {
    name: MENUS.CX_OPERATOR, // New Section
    children: [
      { name: PAGES.INVITE },
      { name: PAGES.APPLICATION_REQUESTS },
      { name: PAGES.ADMINBOARD }, // Admin Board -> App Marketplace
      { name: PAGES.SERVICEADMINBOARD }, // Admin Board -> Service Marketplace
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
  PAGES.COMPANY_ROLE,
  PAGES.COMPANY_WALLET,
  PAGES.NOTIFICATIONS,
  PAGES.LOGOUT,
]

/**
 * footerMenuFull
 *
 * lists all the entries that are visible in the footer menu for a user with maximum permissions.
 * it will be restricted by personal user permissions
 */
export const footerMenuFull = [
  PAGES.IMPRINT,
  PAGES.PRIVACY,
  PAGES.COOKIE_POLICY,
  PAGES.CONTACT,
]
