/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { useTranslation } from 'react-i18next'
import {
  useFetchBusinessPartnersQuery,
  useFetchBusinessPartnerAddressMutation,
} from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import {
  PageHeader,
  PageLoadingTable,
  type PaginResult,
} from '@catena-x/portal-shared-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { updatePartnerSelector } from 'features/control/updates'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import type { BusinessPartner } from 'features/newPartnerNetwork/types'
import Patterns from 'types/Patterns'
import { useFetchMemberCompaniesQuery } from 'features/newPartnerNetwork/partnerNetworkPortalApiSlice'
import {
  isContentPresent,
  addCountryAttribute,
  addMemberAttribute,
} from './components/PartnerList/helper'
import { type BusinessPartnerAddressResponse } from 'features/partnerNetwork/types'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const [expr, setExpr] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updatePartnerSelector)
  const columns = PartnerNetworksTableColumns(t)
  const [mutationRequest] = useFetchBusinessPartnerAddressMutation()
  const { data } = useFetchMemberCompaniesQuery()

  const validateSearchText = (text: string): boolean =>
    Patterns.SEARCH.test(text.trim())

  const [allItems, setAllItems] = useState<BusinessPartner[]>()

  const fetchAndApply = async (cData: PaginResult<BusinessPartner>) => {
    //BPDM response does not has content attribute. Check for it and proceed
    if (isContentPresent(cData) && cData.content.length === 0) {
      setAllItems([])
      return
    }

    const result = cData.content.map((x: BusinessPartner) => x.bpnl)
    await mutationRequest({ bpnLs: result, legalName: '' })
      .unwrap()
      .then((payload: PaginResult<BusinessPartnerAddressResponse>) => {
        //new country attribute && member attributes based on the response
        let finalObj = JSON.parse(JSON.stringify(cData?.content))
        finalObj = addCountryAttribute(
          finalObj,
          payload.content as unknown as BusinessPartnerAddressResponse[]
        )
        finalObj = addMemberAttribute(finalObj, data)
        setAllItems(finalObj)
      })
      .catch(() => {
        setAllItems([])
      })
  }

  return (
    <main className="partner-network-page-container">
      <PageHeader
        title={t('content.partnernetwork.headertitle')}
        topPage={false}
        headerHeight={200}
      />

      <section id="identity-management-id">
        <PageLoadingTable<BusinessPartner, { expr: string }>
          autoFocus={false}
          searchExpr={expr}
          toolbarVariant={'ultimate'}
          hasBorder={false}
          columnHeadersBackgroundColor={'transparent'}
          searchPlaceholder={t('content.partnernetwork.searchfielddefaulttext')}
          searchInputData={searchInputData}
          onSearch={(expr: string) => {
            if (expr !== '' && !validateSearchText(expr)) return
            setRefresh(Date.now())
            setExpr(expr)
          }}
          searchDebounce={1000}
          title={t('content.partnernetwork.tabletitle')}
          loadLabel={t('global.actions.loadmore')}
          fetchHook={useFetchBusinessPartnersQuery}
          fetchHookArgs={{ expr }}
          fetchHookRefresh={refresh}
          getRowId={(row: { bpnl: string }) => row.bpnl ?? ''}
          columns={columns}
          callbackToPage={fetchAndApply}
          allItems={allItems}
        />
      </section>
    </main>
  )
}

export default PartnerNetwork
