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

import { PAGES } from '../Constants'
import { MENUS } from './Constants'

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
