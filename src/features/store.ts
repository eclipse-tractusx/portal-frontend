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

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import admin from './admin'
import apps from './apps'
import control from './control'
import info from './info'
import companySliceDep from './companyAccess/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import connectorSlice from './connector/slice'
import notificationSliceDep from './notification/slice'
import ErrorSlice from './error/slice'
import images from './images/slice'
import dialog from './overlay/slice'
import managementSlice from './appManagement/slice'
import serviceManagementSlice from './serviceManagement/slice'
import serviceMarketplaceSlice from './serviceMarketplace/slice'
import serviceProviderSlice from './serviceProvider/slice'
import appSubscriptionSlice from './appSubscription/slice'
import adminBoardSlice from './adminBoard/slice'
import modelsSlice from './semanticModels/slice'
import updateCompanyRoleSlice from './companyRoles/slice'
import { apiSlice as idpApiSlice } from './admin/idpApiSlice'
import userAddSlice, { apiSlice as userSlice } from './admin/userApiSlice'
import { apiSlice as serviceSlice } from './admin/serviceApiSlice'
import { apiSlice as notificationSlice } from './notification/apiSlice'
import userRoleSlice, {
  apiSlice as appRolesSlice,
} from './admin/appuserApiSlice'
import { apiSlice as appMarketplaceSlice } from './apps/apiSlice'
import { apiSlice as appManagementSlice } from './appManagement/apiSlice'
import { apiSlice as serviceMarketplaceApiSlice } from './serviceMarketplace/serviceApiSlice'
import { apiSlice as serviceProviderApiSlice } from './serviceProvider/serviceProviderApiSlice'
import { apiSlice as appSubscriptionApiSlice } from './appSubscription/appSubscriptionApiSlice'
import { apiSlice as adminBoardApiSlice } from './adminBoard/adminBoardApiSlice'
import { apiSlice as adminClearingHouseSDApiSlice } from './adminClearingHouseSD/adminClearingHouseSDApiSlice'
import { apiSlice as inviteApiSlice } from './admin/inviteApiSlice'
import { apiSlice as networkApiSlice } from './admin/networkApiSlice'
import { apiSlice as applicationRequestApiSlice } from './admin/applicationRequestApiSlice'
import { apiSlice as partnerNetworkApiSlice } from './newPartnerNetwork/partnerNetworkApiSlice'
import { apiSlice as partnerNetworkPortalApiSlice } from './newPartnerNetwork/partnerNetworkPortalApiSlice'
import { apiSlice as connectorApiSlice } from './connector/connectorApiSlice'
import { apiSlice as serviceManagementApiSlice } from './serviceManagement/apiSlice'
import serviceSubscriptionSlice from './serviceSubscription/slice'
import { apiSlice as serviceSubscriptionApiSlice } from './serviceSubscription/serviceSubscriptionApiSlice'
import { apiSlice as serviceAdminBoardApiSlice } from './adminBoard/serviceAdminBoardApiSlice'
import { apiSlice as companyRoleApiSlice } from './companyRoles/companyRoleApiSlice'
import { apiSlice as certificationApiSlice } from './certification/certificationApiSlice'
import { apiSlice as userManagementApiSlice } from './appManagement/userManagementApiSlice'
import { apiSlice as companyWalletApiSlice } from './compayWallet/companyWalletApiSlice'
import { apiSlice as deleteCompanyApiSlice } from './deleteCompany/deleteCompanyApiSlice'
import { apiSlice as registrationApiSlice } from './registration/registrationApiSlice'
import { apiSlice as companyCertificateApiSlice } from './companyCertification/companyCertificateApiSlice'
import { apiSlice as staticContentApiSlice } from './staticContent/staticContentApiSlice'
import { apiSlice as companyDataApiSlice } from './companyData/companyDataApiSlice'
import companyDataSlice from './companyData/slice'

import languageSlice from './language/slice'
import { apiSlice as usecaseApiSlice } from './usecase/usecaseApiSlice'
import { homeSlice } from './home/slice'

export const reducers = {
  admin,
  apps,
  control,
  info,
  images,
  dialog: dialog.reducer,
  companyData: companyDataSlice.reducer,
  management: managementSlice.reducer,
  serviceManagement: serviceManagementSlice.reducer,
  serviceMarketplace: serviceMarketplaceSlice.reducer,
  serviceProvider: serviceProviderSlice.reducer,
  appSubscription: appSubscriptionSlice.reducer,
  serviceSubscription: serviceSubscriptionSlice.reducer,
  adminBoard: adminBoardSlice.reducer,
  userAdd: userAddSlice.reducer,
  userRole: userRoleSlice.reducer,
  semanticModels: modelsSlice.reducer,
  companyRoles: updateCompanyRoleSlice.reducer,
  companyAccess: companySliceDep,
  partnerNetwork: partnerNetworkSlice.reducer,
  connector: connectorSlice.reducer,
  notification: notificationSliceDep.reducer,
  error: ErrorSlice.reducer,
  languageSlice: languageSlice.reducer,
  [idpApiSlice.reducerPath]: idpApiSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [notificationSlice.reducerPath]: notificationSlice.reducer,
  [appRolesSlice.reducerPath]: appRolesSlice.reducer,
  [appMarketplaceSlice.reducerPath]: appMarketplaceSlice.reducer,
  [appManagementSlice.reducerPath]: appManagementSlice.reducer,
  [serviceMarketplaceApiSlice.reducerPath]: serviceMarketplaceApiSlice.reducer,
  [serviceProviderApiSlice.reducerPath]: serviceProviderApiSlice.reducer,
  [appSubscriptionApiSlice.reducerPath]: appSubscriptionApiSlice.reducer,
  [adminBoardApiSlice.reducerPath]: adminBoardApiSlice.reducer,
  [adminClearingHouseSDApiSlice.reducerPath]:
    adminClearingHouseSDApiSlice.reducer,
  [inviteApiSlice.reducerPath]: inviteApiSlice.reducer,
  [networkApiSlice.reducerPath]: networkApiSlice.reducer,
  [applicationRequestApiSlice.reducerPath]: applicationRequestApiSlice.reducer,
  [partnerNetworkApiSlice.reducerPath]: partnerNetworkApiSlice.reducer,
  [partnerNetworkPortalApiSlice.reducerPath]:
    partnerNetworkPortalApiSlice.reducer,
  [connectorApiSlice.reducerPath]: connectorApiSlice.reducer,
  [serviceManagementApiSlice.reducerPath]: serviceManagementApiSlice.reducer,
  [serviceSubscriptionApiSlice.reducerPath]:
    serviceSubscriptionApiSlice.reducer,
  [serviceAdminBoardApiSlice.reducerPath]: serviceAdminBoardApiSlice.reducer,
  [companyRoleApiSlice.reducerPath]: companyRoleApiSlice.reducer,
  [certificationApiSlice.reducerPath]: certificationApiSlice.reducer,
  [userManagementApiSlice.reducerPath]: userManagementApiSlice.reducer,
  [usecaseApiSlice.reducerPath]: usecaseApiSlice.reducer,
  [companyWalletApiSlice.reducerPath]: companyWalletApiSlice.reducer,
  [deleteCompanyApiSlice.reducerPath]: deleteCompanyApiSlice.reducer,
  [registrationApiSlice.reducerPath]: registrationApiSlice.reducer,
  [companyCertificateApiSlice.reducerPath]: companyCertificateApiSlice.reducer,
  [staticContentApiSlice.reducerPath]: staticContentApiSlice.reducer,
  [companyDataApiSlice.reducerPath]: companyDataApiSlice.reducer,
  [homeSlice.reducerPath]: homeSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(idpApiSlice.middleware)
      .concat(userSlice.middleware)
      .concat(serviceSlice.middleware)
      .concat(notificationSlice.middleware)
      .concat(appRolesSlice.middleware)
      .concat(appMarketplaceSlice.middleware)
      .concat(appManagementSlice.middleware)
      .concat(serviceMarketplaceApiSlice.middleware)
      .concat(serviceProviderApiSlice.middleware)
      .concat(appSubscriptionApiSlice.middleware)
      .concat(adminBoardApiSlice.middleware)
      .concat(adminClearingHouseSDApiSlice.middleware)
      .concat(inviteApiSlice.middleware)
      .concat(networkApiSlice.middleware)
      .concat(applicationRequestApiSlice.middleware)
      .concat(partnerNetworkApiSlice.middleware)
      .concat(partnerNetworkPortalApiSlice.middleware)
      .concat(connectorApiSlice.middleware)
      .concat(serviceManagementApiSlice.middleware)
      .concat(serviceSubscriptionApiSlice.middleware)
      .concat(serviceAdminBoardApiSlice.middleware)
      .concat(companyRoleApiSlice.middleware)
      .concat(certificationApiSlice.middleware)
      .concat(userManagementApiSlice.middleware)
      .concat(usecaseApiSlice.middleware)
      .concat(companyWalletApiSlice.middleware)
      .concat(registrationApiSlice.middleware)
      .concat(companyCertificateApiSlice.middleware)
      .concat(companyWalletApiSlice.middleware)
      .concat(staticContentApiSlice.middleware)
      .concat(deleteCompanyApiSlice.middleware)
      .concat(companyDataApiSlice.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
