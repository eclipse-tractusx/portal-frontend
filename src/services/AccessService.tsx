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

import type { IAction, IPage, RestrictedItem, Tree } from 'types/MainTypes'
import { Route } from 'react-router-dom'
import AppInfo from 'components/overlays/AppInfo'
import AddBPN from 'components/overlays/AddBPN'
import { AddUser } from 'components/overlays/AddUser'
import NewsDetail from 'components/overlays/NewsDetail'
import UserInfo from 'components/overlays/UserInfo'
import type { OverlayState } from 'features/control/overlay'
import {
  ALL_ACTIONS,
  ALL_OVERLAYS,
  ALL_PAGES,
  footerMenuFull,
  mainMenuFullTree,
  userMenuFull,
  userMenuRegistration,
  userMenuCompany,
} from 'types/Config'
import { OVERLAYS } from 'types/Constants'
import { AddTechnicalUser } from 'components/overlays/AddTechnicalUser'
import AddAppUserRoles from 'components/overlays/AddAppUserRoles'
import EditAppUserRoles from 'components/overlays/EditAppUserRoles'
import { DeleteTechnicalUser } from 'components/overlays/DeleteTechnicalUser'
import ServiceRequest from 'components/overlays/ServiceRequest'
import NotFound from 'components/overlays/NotFound'
import BusinessPartnerInfo from 'components/overlays/BusinessPartnerInfo'
import IDPDelete from 'components/overlays/IDPDelete'
import AppOverViewConfirm from 'components/overlays/AppOverViewConfirm'
import AppDetailsOverlay from 'components/overlays/AppOverViewConfirm/AppDetailsOverlay'
import { ConfirmUserAction } from 'components/overlays/ConfirmUserAction'
import AppMarketplaceSubscribeRequest from 'components/overlays/AppMarketplaceRequest'
import { AddIdp } from 'components/overlays/AddIDP'
import { UpdateIDP } from 'components/overlays/UpdateIDP'
import { EnableIDP } from 'components/overlays/EnableIDP'
import { EnableIDPSuccess } from 'components/overlays/EnableIDP/EnableIDPSuccess'
import { DisableIDP } from 'components/overlays/EnableIDP/DisableIDP'
import { AddUsersIDP } from 'components/overlays/AddUsersIDP'
import AddServiceProvider from 'components/overlays/AddServiceProvider'
import EditPortalRoles from 'components/overlays/EditPortalRoles'
import ServiceDeclineAdminboard from 'components/overlays/DeclineAdminboard/ServiceDeclineAdminboard'
import AppDeclineAdminboard from 'components/overlays/DeclineAdminboard/AppDeclineAdminboard'
import UpdateCompanyRole from 'components/overlays/UpdateCompanyRole'
import EditUseCase from 'components/overlays/EditUseCase'
import UpdateCertificate from 'components/overlays/UpdateCertificate'
import AddMultipleUser from 'components/overlays/AddMultipleUser'
import { OSPRegister } from 'components/overlays/OSPRegister'
import { OSPRegisterNext } from 'components/overlays/OSPRegister/OSPRegisterNext'
import CompanyCertificateDetails from 'components/overlays/CompanyCertificateDetails'
import DeleteCompanyCertificateConfirmationOverlay from 'components/overlays/CompanyCertificateDetails/DeleteCompanyCertificateConfirmationOverlay'
import { DisableManagedIDP } from 'components/overlays/EnableIDP/DisableManagedIdp'
import { DeleteManagedIDP } from 'components/overlays/IDPDelete/DeleteManagedIdp'
import type { KeycloakResourceAccess } from 'keycloak-js'
import { intersectAccess } from 'utils/dataUtils'
import UserService from './UserService'
import {
  getClientId,
  getClientIdBpdm,
  getClientIdMiw,
  getClientIdRegistration,
  getClientIdSemantic,
  getClientIdSsiCredential,
} from './EnvironmentService'
import CSVUploadOverlay from 'components/overlays/CSVUploadOverlay'
import { getCompanyRoles } from './CompanyService'

let pageMap: { [page: string]: IPage }
let actionMap: { [action: string]: IAction }
let overlayMap: { [overlay: string]: RestrictedItem }

export const userHasAccess = (required: KeycloakResourceAccess): boolean =>
  Object.keys(intersectAccess(required, UserService.getAccess())).length > 0

export const userHasClientRole = (
  client: string,
  roles: string | Array<string>
): boolean =>
  userHasAccess({ [client]: { roles: Array.isArray(roles) ? roles : [roles] } })

export const userHasPortalRole = (roles: string | Array<string>): boolean =>
  userHasClientRole(getClientId(), roles)

export const companyHasRole = (role: string): boolean =>
  getCompanyRoles().includes(role)

export const userHasRegistrationRole = (
  roles: string | Array<string>
): boolean => userHasClientRole(getClientIdRegistration(), roles)

export const userHasSemanticHubRole = (
  roles: string | Array<string>
): boolean => userHasClientRole(getClientIdSemantic(), roles)

export const userHasBpdmRole = (roles: string | Array<string>): boolean =>
  userHasClientRole(getClientIdBpdm(), roles)

export const userHasMiwRole = (roles: string | Array<string>): boolean =>
  userHasClientRole(getClientIdMiw(), roles)

export const userHasSsiCredentialRole = (
  roles: string | Array<string>
): boolean => userHasClientRole(getClientIdSsiCredential(), roles)

const checkAccess = (element: RestrictedItem): boolean => {
  if (!element) return false // item doesn't exist
  if (!element.allowTo) return true // no permission required for this item
  return element.allowTo() // check if permission is granted
}

export const hasAccess = (page: string) => checkAccess(pageMap[page])

export const hasAccessAction = (action: string) =>
  checkAccess(actionMap[action])

export const hasAccessOverlay = (overlay: string) =>
  checkAccess(overlayMap[overlay])

const accessToMenu = (menu: string[]) =>
  menu.filter((page: string) => hasAccess(page))

const accessToMenuTree = (menu: Tree[] | undefined): Tree[] | undefined =>
  menu
    ?.filter((item: Tree) => hasAccess(item.name))
    .map((item: Tree) => ({
      ...item,
      children: accessToMenuTree(item.children),
    }))

const mainMenuTree = () => accessToMenuTree(mainMenuFullTree)

const userMenu = () => accessToMenu(userMenuFull)

const userMenuReg = () => accessToMenu(userMenuRegistration)

const userMenuComp = () => accessToMenu(userMenuCompany)

const footerMenu = () => accessToMenu(footerMenuFull)

const permittedRoutes = () =>
  ALL_PAGES.filter((page: IPage) => hasAccess(page.name)).map((p) => p.element)

export const getAction = (action: string) =>
  hasAccessAction(action) ? actionMap[action] : null

export const getOverlay = (overlay: OverlayState) => {
  if (overlay.type !== OVERLAYS.NONE && !hasAccessOverlay(overlay.type)) {
    return <NotFound />
  }
  switch (overlay.type) {
    case OVERLAYS.NONE:
      return null
    case OVERLAYS.ADD_USER:
      return <AddUser />
    case OVERLAYS.ADD_MULTIPLE_USER:
      return <AddMultipleUser />
    case OVERLAYS.USER:
      return <UserInfo id={overlay.id} />
    case OVERLAYS.ADD_TECH_USER:
      return <AddTechnicalUser />
    case OVERLAYS.DELETE_TECH_USER:
      return <DeleteTechnicalUser id={overlay.id} />
    case OVERLAYS.ADD_APP_USER_ROLES:
      return <AddAppUserRoles subscriptionId={overlay.subscriptionId} />
    case OVERLAYS.EDIT_APP_USER_ROLES:
      return (
        <EditAppUserRoles
          id={overlay.id}
          subscriptionId={overlay.subscriptionId}
        />
      )
    case OVERLAYS.NEWS:
      return <NewsDetail id={overlay.id} />
    case OVERLAYS.ADD_BPN:
      return <AddBPN id={overlay.id} />
    case OVERLAYS.PARTNER:
      return <BusinessPartnerInfo id={overlay.id} />
    case OVERLAYS.APP:
      return <AppInfo id={overlay.id} title={overlay.title} />
    case OVERLAYS.SERVICE_REQUEST:
      return <ServiceRequest id={overlay.id} />
    case OVERLAYS.APPMARKETPLACE_REQUEST:
      return <AppMarketplaceSubscribeRequest id={overlay.id} />
    case OVERLAYS.IDP_CONFIRM:
      return <IDPDelete id={overlay.id} title={overlay.title} />
    case OVERLAYS.ADD_IDP:
      return <AddIdp />
    case OVERLAYS.UPDATE_IDP:
      return <UpdateIDP id={overlay.id} />
    case OVERLAYS.ENABLE_IDP:
      return <EnableIDP id={overlay.id} />
    case OVERLAYS.ENABLE_IDP_SUCCESS:
      return <EnableIDPSuccess id={overlay.id} />
    case OVERLAYS.DISABLE_IDP:
      return <DisableIDP id={overlay.id} />
    case OVERLAYS.DISABLE_MANAGED_IDP:
      return <DisableManagedIDP id={overlay.id} />
    case OVERLAYS.ADDUSERS_IDP:
      return <AddUsersIDP id={overlay.id} />
    case OVERLAYS.DELETE_MANAGED_IDP:
      return <DeleteManagedIDP id={overlay.id} />
    case OVERLAYS.REGISTER_OSP:
      return <OSPRegister id={overlay.id} />
    case OVERLAYS.REGISTER_NEXT_OSP:
      return <OSPRegisterNext id={overlay.id} />
    case OVERLAYS.APP_OVERVIEW_CONFIRM:
      return <AppOverViewConfirm id={overlay.id} title={overlay.title} />
    case OVERLAYS.APP_DETAILS_OVERLAY:
      return <AppDetailsOverlay id={overlay.id} title={overlay.title} />
    case OVERLAYS.CONFIRM_USER_ACTION:
      return (
        <ConfirmUserAction
          id={overlay.id}
          title={overlay.title}
          subTitle={overlay.subTitle}
        />
      )
    case OVERLAYS.ADD_SERVICE_PROVIDER:
      return <AddServiceProvider />
    case OVERLAYS.SERVICE_DECLINE_ADMINBOARD:
      return <ServiceDeclineAdminboard id={overlay.id} />
    case OVERLAYS.APP_DECLINE_ADMINBOARD:
      return <AppDeclineAdminboard id={overlay.id} />
    case OVERLAYS.EDIT_PORTAL_ROLES:
      return <EditPortalRoles id={overlay.id} />
    case OVERLAYS.UPDATE_COMPANY_ROLE:
      return <UpdateCompanyRole roles={overlay.roles ?? []} />
    case OVERLAYS.EDIT_USECASE:
      return <EditUseCase id={overlay.id} title={overlay.title ?? ''} />
    case OVERLAYS.UPDATE_CERTIFICATE:
      return <UpdateCertificate />
    case OVERLAYS.COMPANY_CERTIFICATE_DETAILS:
      return <CompanyCertificateDetails id={overlay.id} />
    case OVERLAYS.COMPANY_CERTIFICATE_CONFIRM_DELETE:
      return (
        <DeleteCompanyCertificateConfirmationOverlay
          id={overlay.id}
          title={overlay.title ?? ''}
        />
      )
    case OVERLAYS.CSV_UPLOAD_OVERLAY:
      return <CSVUploadOverlay />
    default:
      return <NotFound />
  }
}

function init() {
  // from the list of pages set up a map for easier access and create default routes
  pageMap = ALL_PAGES.reduce((map: { [page: string]: IPage }, page: IPage) => {
    map[page.name] = page
    if (!page.isRoute) {
      page.element = (
        <Route key={page.name} path={page.name} element={page.element} />
      )
    }
    return map
  }, {})
  actionMap = ALL_ACTIONS.reduce(
    (map: { [action: string]: IAction }, action: IAction) => {
      map[action.name] = action
      return map
    },
    {}
  )
  overlayMap = ALL_OVERLAYS.reduce(
    (map: { [overlay: string]: RestrictedItem }, overlay: RestrictedItem) => {
      map[overlay.name] = overlay
      return map
    },
    {}
  )
}

const AccessService = {
  init,
  getAction,
  getOverlay,
  hasAccess,
  hasAccessAction,
  hasAccessOverlay,
  permittedRoutes,
  mainMenuTree,
  userMenu,
  userMenuReg,
  footerMenu,
  userMenuComp,
  companyHasRole,
}

export default AccessService
