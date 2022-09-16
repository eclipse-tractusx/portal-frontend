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

import { PaginFetchArgs, PageLoadingTable } from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { updatePartnerSelector } from 'features/control/updatesSlice'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import { BusinessPartner, BusinessPartnerSearchResponse } from 'features/newPartnerNetwork/types'
import { GridCellParams } from '@mui/x-data-grid'
import Patterns from 'types/Patterns'
import { PartnerNetworksBPNTableColumns } from './PartnerNetworksBPNTableColumns'
import { useFetchBusinessPartnerAddressMutation } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { useFetchMemberCompaniesQuery } from 'features/newPartnerNetwork/partnerNetworkPortalApiSlice'
import {
  isContentPresent,
  isQueryDataPresent,
  addCountryAttribute,
  addMemberAttribute,
} from './helper'
import BusinessPartnerDetailOverlay from '../../BusinessPartnerDetailOverlay'

export const PartnerList = ({
  fetchHook,
  fetchHookArgs,
  onSearch,
}: {
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  onSearch?: (search: string) => void
}) => {
  const { t } = useTranslation()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updatePartnerSelector)
  const columns = PartnerNetworksTableColumns(useTranslation)
  const bpnColumns = PartnerNetworksBPNTableColumns(useTranslation)
  const [showBPNColumn, setShowBPNColumn] = useState<boolean>(false)

  const [mutationRequest] = useFetchBusinessPartnerAddressMutation()

  const { data } = useFetchMemberCompaniesQuery()

  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  const [selectedBPN, setSelectedBPN] = useState<any>({})

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      if(params.row && params.row.legalEntity) {
        setSelectedBPN(params.row as BusinessPartnerSearchResponse)
      } else {
        setSelectedBPN(params.row as BusinessPartner)
      }
      setOverlayOpen(true)
    }
  }

  const validateSearchText = (text: string): boolean =>
    Patterns.SEARCH.test(text.trim())

  const checkIfBPNLNumber = (text: string): boolean =>
    Patterns.BPN.test(text.trim())

  const [allItems, setAllItems] = useState<any>({})

  const fetchAndApply = async (cData: any) => {
    //BPDM response does not has content attribute. Check for it and proceed
    if (isContentPresent(cData)) {
      const result = cData.content.map((x: any) => x.legalEntity.bpn)
      await mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //new country attribute && member attributes based on the response
          let finalObj = JSON.parse(JSON.stringify(cData?.content))
          finalObj = addCountryAttribute(finalObj, payload)
          finalObj = addMemberAttribute(finalObj, data)
          setAllItems(finalObj)
        })
        .catch(() => {})
    } else {
      const result = [cData.bpn]
      await mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //update for country attribute && update member info
          let finalObj = JSON.parse(JSON.stringify(cData))
          finalObj.country = payload[0].legalAddress.country
          if (isQueryDataPresent(data)) {
            finalObj.member = data && data.includes(finalObj.bpn)
          }
          setAllItems(finalObj)
        })
        .catch(() => {})
    }
  }

  return (
    <section id="identity-management-id">
      <BusinessPartnerDetailOverlay
        {...{
          selectedRowBPN: selectedBPN,
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
      <PageLoadingTable<BusinessPartner>
        onCellClick={onTableCellClick}
        toolbarVariant={'ultimate'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchPlaceholder={t('content.partnernetwork.searchfielddefaulttext')}
        searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (!onSearch || !validateSearchText(expr)) return
          setRefresh(Date.now())
          onSearch(expr)
          setShowBPNColumn(checkIfBPNLNumber(expr))
        }}
        searchDebounce={1000}
        title={t('content.partnernetwork.tabletitle')}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { legalEntity: any }) =>
          row && row.legalEntity ? row.legalEntity.bpn : ''
        }
        columns={!showBPNColumn ? columns : bpnColumns}
        callbackToPage={fetchAndApply}
        allItems={allItems}
      />
    </section>
  )
}
