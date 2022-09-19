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

import { IAction, IOverlay, IPage, Tree } from 'types/MainTypes'
import UserService from './UserService'
import { Route } from 'react-router-dom'
import AppInfo from 'components/overlays/AppInfo'
import AddBPN from 'components/overlays/AddBPN'
import { AddUser } from 'components/overlays/AddUser'
import NewsDetail from 'components/overlays/NewsDetail'
import BusinessPartnerDetail from 'components/pages/PartnerNetwork/BusinessPartnerDetailOverlay/BusinessPartnerDetail'
import UserInfo from 'components/overlays/UserInfo'
import { OverlayState } from 'features/control/overlay/types'
import {
  ALL_ACTIONS,
  ALL_OVERLAYS,
  ALL_PAGES,
  footerMenuFull,
  mainMenuFullTree,
  userMenuFull,
} from 'types/Config'
import { OVERLAYS } from 'types/Constants'
import TechnicalUserInfo from 'components/overlays/TechnicalUserInfo'
import { AddTechnicalUser } from 'components/overlays/AddTechnicalUser'
import AddAppUserRoles from 'components/overlays/AddAppUserRoles'
import EditAppUserRoles from 'components/overlays/EditAppUserRoles'
import { DeleteTechnicalUser } from 'components/overlays/DeleteTechnicalUser'
import ServiceRequest from 'components/overlays/ServiceRequest'
import IDPDetailInfo from 'components/overlays/IDPDetailInfo'
import NotFound from 'components/overlays/NotFound'

let pageMap: { [page: string]: IPage }
let actionMap: { [action: string]: IAction }
let overlayMap: { [overlay: string]: IOverlay }

const checkAccess = (element: { name: string; role?: string }): boolean => {
  if (!element) return false // page doesn't exist
  const role = element.role
  if (!role) return true // no permission required for this page
  return UserService.hasRole(role) // check if user has the required permission
}

export const hasAccess = (page: string) => checkAccess(pageMap[page])

export const hasAccessAction = (action: string) =>
  checkAccess(actionMap[action])

export const hasAccessOverlay = (overlay: string) =>
  checkAccess(overlayMap[overlay])

const accessToMenu = (menu: string[]) =>
  menu.filter((page: string) => hasAccess(page))

const accessToMenuTree = (menu: Tree[] | undefined): any =>
  menu
    ?.filter((item: Tree) => hasAccess(item.name))
    .map((item: Tree) => ({
      ...item,
      children: accessToMenuTree(item.children),
    }))

const mainMenuTree = () => accessToMenuTree(mainMenuFullTree)

const userMenu = () => accessToMenu(userMenuFull)

const footerMenu = () => accessToMenu(footerMenuFull)

const permittedRoutes = () =>
  ALL_PAGES.filter((page: IPage) => hasAccess(page.name)).map((p) => p.element)

export const getAction = (action: string) =>
  hasAccessAction(action) ? actionMap[action] : null

export const getOverlay = (overlay: OverlayState) => {
  if (!hasAccessOverlay(overlay.type)) {
    return <NotFound />
  }
  switch (overlay.type) {
    case OVERLAYS.ADD_USER:
      return <AddUser />
    case OVERLAYS.USER:
      return <UserInfo id={overlay.id} />
    case OVERLAYS.TECHUSER:
      return <TechnicalUserInfo id={overlay.id} />
    case OVERLAYS.ADD_TECHUSER:
      return <AddTechnicalUser />
    case OVERLAYS.DELETE_TECHUSER:
      return <DeleteTechnicalUser id={overlay.id} />
    case OVERLAYS.IDP:
      return <IDPDetailInfo id={overlay.id} />
    case OVERLAYS.ADD_APP_USER_ROLES:
      return <AddAppUserRoles />
    case OVERLAYS.EDIT_APP_USER_ROLES:
      return <EditAppUserRoles id={overlay.id} />
    case OVERLAYS.NEWS:
      return <NewsDetail id={overlay.id} />
    case OVERLAYS.ADD_BPN:
      return <AddBPN id={overlay.id} />
    case OVERLAYS.PARTNER:
      return <BusinessPartnerDetail id={overlay.id} />
    case OVERLAYS.APP:
      return <AppInfo id={overlay.id} title={overlay.title} />
    case OVERLAYS.SERVICE_REQUEST:
      return <ServiceRequest id={overlay.id} />
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
    (map: { [overlay: string]: IOverlay }, overlay: IOverlay) => {
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
  footerMenu,
}

export default AccessService
