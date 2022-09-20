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

import { BusinessPartnerResponse } from 'features/partnerNetwork/types'
import { IUser } from 'features/user/types'

// Mock redux user to initialize store
const storeMockUser: IUser = {
  userName: 'cx-test-access.e96145b4-72c4-49b4-a2b3-0c4009af2774',
  name: 'Fatih Ayyildiz',
  email: 'fatih_hikmet.ayyildiz@mercedes-benz.com',
  company: 'CX Test Access',
  tenant: 'cx-test-access',
  // Roles can be change for testing purposes
  roles: [
    'modify_user_account',
    'view_submitted_applications',
    'FE Developer',
    'view_client_roles',
    'add_digital_twin',
    'approve_new_partner',
    'update_digital_twin',
    'add_app',
    'setup_client',
    'view_semantic_hub',
    'delete_semantic_model_draft',
    'developer_view',
    'setup_idp',
    'view_digital_twins',
    'delete_apps',
    'setup_connector',
    'add_semantic_model',
    'add_user_account',
    'delete_semantic_model_released',
    'update_semantic_model_draft',
    'delete_user_account',
    'delete_digital_twin',
    'filter_apps',
    'CX Admin',
    'invite_new_partner',
    'view_user_management',
    'edit_apps',
    'view_apps',
    'decline_new_partner',
    'update_semantic_model_released',
    'partner_network_developer',
  ],
  isAdmin: true,
  token: 'XXX',
  parsedToken: 'asd',
}

// Entire store initial state mock
export const MockReduxStoreInitialState = {
  user: storeMockUser,
  partnerNetwork: {
    businessPartners: {} as BusinessPartnerResponse,
    mappedPartnerList: [],
    loading: true,
    columns: [
      { field: 'id', headerName: 'BPN', hide: false, flex: 2 },
      {
        field: 'name',
        headerName: 'Name',
        description: 'Name of the Company',
        flex: 4,
      },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'street', headerName: 'Street Address', flex: 2 },
      { field: 'zipCode', headerName: 'Zip Code', flex: 1 },
      { field: 'city', headerName: 'City', flex: 1 },
      { field: 'taxId', headerName: 'Tax ID', flex: 1 },
    ],
    error: '',
  },
  admin: {
    service: {
      list: {
        data: {
          meta: {
            totalElements: 0,
            totalPages: 0,
            page: 0,
            contentSize: 0,
          },
          content: [],
        },
        request: 0,
        error: '',
      },
      detail: {
        data: null,
        request: 0,
        error: '',
      },
      create: {
        request: 0,
        error: '',
      },
      remove: {
        request: 0,
        error: '',
      },
    },
    approle: {
      items: [],
      request: 0,
      error: '',
    },
    registration: {
      registrationRequests: [],
      companyDetail: {},
      loading: false,
      detailLoading: false,
      error: '',
      request: 0,
      data: {
        meta: {
          totalElements: 0,
          totalPages: 0,
          page: 0,
          contentSize: 0,
        },
        content: [],
      },
      paginationData: {
        totalElements: 9,
        page: 0,
      },
    },
    user: {
      tenantUsers: [],
      usersToAdd: {
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: [],
        message: '',
      },
      getRequest: 0,
      addRequest: 0,
      addOpen: false,
      addTechnicalUserOpen: false,
      error: '',
    },
    userOwn: {
      resetStatus: null,
      data: {
        companyUserId: '',
        firstName: '',
        lastName: '',
        email: '',
        bpn: [''],
        created: '',
        company: '',
        status: '',
      },
      request: 0,
      error: '',
    },
  },
  apps: {
    details: {
      item: {
        id: 'default',
        title: '',
        provider: '',
        leadPictureUri: 'trans.png',
        shortDescription: '',
        useCases: [''],
        price: '',
        providerUri: '',
        contactEmail: '',
        contactNumber: '',
        detailPictureUris: [''],
        longDescription: '',
        isSubscribed: false,
        tags: [''],
        languages: [''],
      },
      loading: true,
      error: '',
    },
    favorites: {
      items: [],
      change: null,
      request: 0,
      error: '',
    },
    marketplace: {
      items: [],
      latest: [],
      subscribed: [],
      loading: true,
      error: '',
    },
  },
}
