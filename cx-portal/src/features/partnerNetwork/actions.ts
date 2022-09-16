/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchParams } from 'types/MainTypes'
import { PartnerNetworkApi } from './api'

const fetchMemberCompaniesData = createAsyncThunk(
  'partnerNetwork/fetchMemberCompaniesData',
  async () => {
    try {
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getAllMemberCompanies()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw new Error('Error while fetching membership data')
    }
  }
)

const fetchBusinessPartners = createAsyncThunk(
  'partnerNetwork/fetchBusinessPartners',
  async ({ params }: { params: SearchParams }, { dispatch }) => {
    try {
      try {
        await dispatch(fetchMemberCompaniesData()).unwrap()
      } catch {
        //keeping this catch block silent as we are always calling the business partner api,
        //whether memebership returns data or not
      }
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getAllBusinessPartner(params)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchBusinessPartners api call error')
    }
  }
)
const getOneBusinessPartner = createAsyncThunk(
  'partnerNetwork/getOneBusinessPartner',
  async ({ bpn }: { bpn: string }) => {
    try {
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getBusinessPartnerByBpn(bpn)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getOneBusinessPartner api call error')
    }
  }
)

export {
  getOneBusinessPartner,
  fetchBusinessPartners,
  fetchMemberCompaniesData,
}
