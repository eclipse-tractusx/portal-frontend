/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { type CompanyDetails } from 'features/admin/userApiSlice'
import { getApiBase } from './EnvironmentService'
import UserService from './UserService'

let CI: CompanyDetails = {
  bpn: '',
  city: '',
  companyId: '',
  countryAlpha2Code: '',
  countryDe: '',
  name: '',
  region: '',
  shortLegalName: '',
  legalName: '',
  streetAdditional: '',
  streetName: '',
  streetNumber: '',
  taxId: '',
  zipCode: '',
  companyRole: [],
}

const init = (onCompanyDetailsCallback: () => void) => {
  fetch(`${getApiBase()}/api/administration/companydata/ownCompanyDetails`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${UserService.getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      CI = data
      onCompanyDetailsCallback()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getCompanyDetails = () => CI

export const getCompanyRoles = () => CI.companyRole

const CompanyService = {
  init,
  getCompanyDetails,
  getCompanyRoles,
}

export default CompanyService
