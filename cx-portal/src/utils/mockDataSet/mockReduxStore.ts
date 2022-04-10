import { BusinessPartnerResponse } from 'types/partnerNetwork/PartnerNetworkTypes'
import { IUser } from 'types/user/UserTypes'

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
  apps: {
    list: [],
    loading: false,
  },
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
  userAdministration: {
    tenantUsers: [],
    registrationRequests: [],
    loading: true,
    error: '',
  },
  appMarketplace: {
    apps: [],
    loading: true,
    error: '',
  },
}
