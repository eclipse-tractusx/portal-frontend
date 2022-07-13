import Redirect from 'components/actions/Redirect'
import SetLang from 'components/actions/SetLang'
import SignOut from 'components/actions/SignOut'
import AddBPN from 'components/overlays/AddBPN'
import { AddUser } from 'components/overlays/AddUser'
import InviteForm from 'components/overlays/InviteForm'
import NewsDetail from 'components/overlays/NewsDetail'
import UserInfo from 'components/overlays/UserInfo'
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
import DataManagement from 'components/pages/DataManagement'
import DeveloperHub from 'components/pages/DeveloperHub'
import DigitalTwins from 'components/pages/DigitalTwins'
import EdcConnector from 'components/pages/EdcConnector'
import Help from 'components/pages/Help'
import Home from 'components/pages/Home'
import Imprint from 'components/pages/Imprint'
import InviteBusinessPartner from 'components/pages/InviteBusinessPartner'
import Logout from 'components/pages/Logout'
import MyAccount from 'components/pages/MyAccount'
import NotFound from 'components/pages/NotFound'
import NotificationCenter from 'components/pages/NotificationCenter'
import Organization from 'components/pages/Organization'
import PartnerNetwork from 'components/pages/PartnerNetwork'
import BusinessPartnerDetail from 'components/pages/PartnerNetwork/BusinessPartnerDetailOverlay/BusinessPartnerDetail'
import Privacy from 'components/pages/Privacy'
import SemanticHub from 'components/pages/SemanticHub'
import TechnicalUserManagement from 'components/pages/TechnicalUserManagement'
import TechnicalUserDetails from 'components/pages/TechnicalUserManagement/TechnicalUserDetails'
import Terms from 'components/pages/Terms'
import ThirdPartyLicenses from 'components/pages/ThirdPartyLicenses'
import Translator from 'components/pages/Translator'
import UserManagement from 'components/pages/UserManagement'
import AppUserDetails from 'components/pages/UserManagement/AppUserDetails'
import UserDetails from 'components/pages/UserManagement/UserDetails'
import { Route } from 'react-router-dom'
import { ACTIONS, OVERLAYS, PAGES, ROLES } from './Constants'
import { IAction, IOverlay, IPage } from './MainTypes'

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
  { name: PAGES.REGISTRATION, element: <Redirect path="/registration/" /> },
  { name: PAGES.SWAGGER, element: <Redirect path="/swagger/" /> },
  { name: PAGES.STORYBOOK, element: <Redirect path="/_storybook/" /> },
  {
    name: PAGES.APP_MARKETPLACE,
    role: ROLES.APPSTORE_VIEW,
    element: <AppMarketplace />,
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
    element: <DataManagement />,
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
  { name: PAGES.ACCOUNT, element: <MyAccount /> },
  {
    name: PAGES.NOTIFICATIONS,
    element: <NotificationCenter />,
  },
  {
    name: PAGES.ORGANIZATION,
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
    element: <NotFound />,
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
    name: PAGES.TECHNICAL_USER_MANAGEMENT,
    role: ROLES.USERMANAGEMENT_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.TECHNICAL_USER_MANAGEMENT}
        path={`${PAGES.USER_MANAGEMENT}/${PAGES.TECHNICAL_USER_MANAGEMENT}`}
        element={<TechnicalUserManagement />}
      >
        <Route path=":appId" element={<TechnicalUserManagement />} />
      </Route>
    ),
  },
  {
    name: PAGES.TECHNICAL_USER_DETAILS,
    role: ROLES.USERMANAGEMENT_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.TECHNICAL_USER_DETAILS}
        path={`${PAGES.USER_MANAGEMENT}/${PAGES.TECHNICAL_USER_MANAGEMENT}/${PAGES.TECHNICAL_USER_DETAILS}`}
        element={<TechnicalUserDetails />}
      >
        <Route path=":userId" element={<TechnicalUserDetails />} />
      </Route>
    ),
  },
  {
    name: PAGES.USER_DETAILS,
    role: ROLES.USERMANAGEMENT_VIEW_USER_ACCOUNT,
    isRoute: true,
    element: (
      <Route
        key={PAGES.USER_DETAILS}
        path={`${PAGES.USER_MANAGEMENT}/${PAGES.USER_DETAILS}`}
        element={<UserDetails />}
      >
        <Route path=":appId" element={<UserDetails />} />
      </Route>
    ),
  },
  {
    name: PAGES.APP_USER_DETAILS,
    role: ROLES.USERMANAGEMENT_VIEW,
    isRoute: true,
    element: (
      <Route
        key={PAGES.APP_USER_DETAILS}
        path={`${PAGES.USER_MANAGEMENT}/${PAGES.APP_USER_DETAILS}`}
        element={<AppUserDetails />}
      >
        <Route path=":appId" element={<AppUserDetails />} />
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
  { name: OVERLAYS.ADD_BPN, element: <AddBPN id="" /> },
  {
    name: OVERLAYS.ADD_USER,
    element: <AddUser />,
    role: ROLES.USERMANAGEMENT_ADD,
  },
  { name: OVERLAYS.APP, element: <AppDetail /> },
  { name: OVERLAYS.INVITE, element: <InviteForm /> },
  { name: OVERLAYS.NEWS, element: <NewsDetail id="" /> },
  { name: OVERLAYS.PARTNER, element: <BusinessPartnerDetail id="" /> },
  { name: OVERLAYS.USER, element: <UserInfo id="" /> },
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
  { name: PAGES.APP_MARKETPLACE },
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
  PAGES.TECHNICAL_SETUP,
  PAGES.APPLICATION_REQUESTS,
  PAGES.INVITE,
  PAGES.ADMINISTRATION,
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
