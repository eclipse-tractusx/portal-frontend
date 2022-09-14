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

import Redirect from 'components/actions/Redirect'
import SetLang from 'components/actions/SetLang'
import SignOut from 'components/actions/SignOut'
import Admin from 'components/pages/Admin'
import RegistrationRequests from 'components/pages/Admin/components/RegistrationRequests'
import AppDetail from 'components/pages/AppDetail'
import AppMarketplace from 'components/pages/AppMarketplace'
import AppOverview from 'components/pages/AppOverview'
import AppReleaseProcess from 'components/pages/AppReleaseProcess'
import Connector from 'components/pages/Connector'
import Contact from 'components/pages/Contact'
import CookiePolicy from 'components/pages/CookiePolicy'
import DataCatalog from 'components/pages/DataCatalog'
import DataspaceMarketplace from 'components/pages/DataspaceMarketplace'
import DeveloperHub from 'components/pages/DeveloperHub'
import DigitalTwins from 'components/pages/DigitalTwins'
import EdcConnector from 'components/pages/EdcConnector'
import Help from 'components/pages/Help'
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
import ServiceMarketplace from 'components/pages/ServiceMarketplace'
import ServiceMarketplaceDetail from 'components/pages/ServiceMarketplaceDetail'
import TechnicalUserManagement from 'components/pages/TechnicalUserManagement'
import TechnicalUserDetails from 'components/pages/TechnicalUserDetails'
import Terms from 'components/pages/Terms'
import ThirdPartyLicenses from 'components/pages/ThirdPartyLicenses'
import Test from 'components/pages/Test'
import Translator from 'components/pages/Translator'
import UserManagement from 'components/pages/UserManagement'
import UserDetails from 'components/pages/UserDetail'
import { Route } from 'react-router-dom'
import { ACTIONS, HINTS, OVERLAYS, PAGES, ROLES } from './Constants'
import { IAction, IOverlay, IPage } from './MainTypes'
import AppUserManagement from 'components/pages/AppUserManagement'
import IDPManagement from 'components/pages/IDPManagement'
import IDPDetail from 'components/pages/IDPDetail'

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
  { name: PAGES.SWAGGER, element: <Redirect path="swagger" /> },
  { name: PAGES.STORYBOOK, element: <Redirect path="_storybook" /> },
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
    name: PAGES.DATASPACE_MARKETPLACE,
    role: ROLES.APPSTORE_VIEW_DATASPACES,
    element: <DataspaceMarketplace />,
  },
  {
    name: PAGES.APP_DETAIL,
    role: ROLES.APPSTORE_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.APP_DETAIL}
        path={PAGES.APP_DETAIL}
        element={<AppDetail />}
      >
        <Route index element={null} />
        <Route path=":appId" element={<AppDetail />} />
      </Route>
    ),
  },
  {
    name: PAGES.DATA_MANAGEMENT,
    role: ROLES.SEMANTICHUB_VIEW,
    element: <SemanticHub />,
  },
  {
    name: PAGES.DATACATALOG,
    role: ROLES.DATACATALOG_VIEW,
    element: <DataCatalog />,
  },
  {
    name: PAGES.DIGITALTWIN,
    role: ROLES.DIGITALTWIN_VIEW,
    element: <DigitalTwins />,
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
    name: PAGES.DEVELOPERHUB,
    role: ROLES.DEVELOPER,
    element: <DeveloperHub />,
  },
  {
    name: PAGES.CONNECTOR,
    role: ROLES.CONNECTOR_SETUP,
    element: <Connector />,
  },
  {
    name: PAGES.ACCOUNT,
    role: ROLES.MY_USER_ACCOUNT,
    element: <MyAccount />,
  },
  {
    name: PAGES.NOTIFICATIONS,
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
    // role: ROLES.VIEW_APP_RELEASE,
    element: <AppOverview />,
  },
  {
    name: PAGES.APPOVERVIEW,
    //role: ROLES.VIEW_APP_RELEASE,
    element: <AppOverview />,
  },
  {
    name: PAGES.APPRELEASEPROCESS,
    //role: ROLES.VIEW_APP_RELEASE,
    element: <AppReleaseProcess />,
  },
  {
    name: PAGES.USER_MANAGEMENT,
    role: ROLES.USERMANAGEMENT_VIEW,
    element: <UserManagement />,
  },
  {
    name: PAGES.USER_DETAILS,
    role: ROLES.USERMANAGEMENT_VIEW,
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
    name: PAGES.IDP_DETAIL,
    role: ROLES.IDP_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.IDP_DETAIL}
        path={`/${PAGES.IDP_DETAIL}`}
        element={<IDPDetail />}
      >
        <Route path=":idpId" element={<IDPDetail />} />
      </Route>
    ),
  },

  {
    name: PAGES.INVITE,
    role: ROLES.INVITE_NEW_PARTNER,
    element: <InviteBusinessPartner />,
  },
  { name: PAGES.ADMINISTRATION, role: ROLES.CX_ADMIN, element: <Admin /> },
  {
    name: PAGES.APPLICATION_REQUESTS,
    role: ROLES.CX_ADMIN,
    element: <RegistrationRequests />,
  },
  {
    name: PAGES.TRANSLATOR,
    role: ROLES.CX_ADMIN,
    element: <Translator />,
  },
  { name: PAGES.HELP, element: <Help /> },
  { name: PAGES.CONTACT, element: <Contact /> },
  { name: PAGES.IMPRINT, element: <Imprint /> },
  { name: PAGES.PRIVACY, element: <Privacy /> },
  { name: PAGES.TERMS, element: <Terms /> },
  { name: PAGES.TEST, element: <Test /> },
  { name: PAGES.COOKIE_POLICY, element: <CookiePolicy /> },
  { name: PAGES.THIRD_PARTY_LICENSES, element: <ThirdPartyLicenses /> },
  {
    name: PAGES.TECHNICAL_SETUP,
    role: ROLES.TECHNICAL_SETUP_VIEW,
    element: <EdcConnector />,
  },
  { name: PAGES.LOGOUT, element: <Logout /> },
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
    name: OVERLAYS.ADD_TECHUSER,
    role: ROLES.TECHUSER_ADD,
  },
  {
    name: OVERLAYS.DELETE_TECHUSER,
    role: ROLES.TECHUSER_DELETE,
  },
  {
    name: OVERLAYS.ADD_APP_USER_ROLES,
    role: ROLES.USERMANAGEMENT_ADD,
  },
  {
    name: OVERLAYS.EDIT_APP_USER_ROLES,
    role: ROLES.USERMANAGEMENT_ADD,
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
    name: OVERLAYS.TECHUSER,
    role: ROLES.TECHUSER_VIEW,
  },
  {
    name: OVERLAYS.SERVICE_REQUEST,
    role: ROLES.APPSTORE_VIEW_SERVICES,
  },
  {
    name: OVERLAYS.IDP,
    role: ROLES.IDP_VIEW,
  },
  {
    name: OVERLAYS.NOT_FOUND,
    role: ROLES.IDP_VIEW,
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
    name: PAGES.MARKETPLACE,
    children: [
      { name: PAGES.APP_MARKETPLACE },
      { name: PAGES.SERVICE_MARKETPLACE, hint: HINTS.NEW },
      { name: PAGES.DATASPACE_MARKETPLACE, hint: HINTS.COMING_SOON },
    ],
  },
  {
    name: PAGES.DATA_MANAGEMENT,
    children: [
      { name: PAGES.DATACATALOG },
      { name: PAGES.SEMANTICHUB },
      { name: PAGES.DIGITALTWIN },
    ],
  },
  { name: PAGES.PARTNER_NETWORK },
  {
    name: PAGES.APP_MANAGEMENT,
    children: [{ name: PAGES.APPOVERVIEW }, { name: PAGES.APPRELEASEPROCESS }],
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
  PAGES.NOTIFICATIONS,
  PAGES.USER_MANAGEMENT,
  PAGES.IDP_MANAGEMENT,
  PAGES.TECHNICAL_SETUP,
  PAGES.APPLICATION_REQUESTS,
  PAGES.INVITE,
  PAGES.LOGOUT,
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
  PAGES.COOKIE_POLICY,
  PAGES.THIRD_PARTY_LICENSES,
]
