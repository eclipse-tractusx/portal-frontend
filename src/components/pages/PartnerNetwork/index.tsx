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

import './style.scss'
import { useTranslation } from 'react-i18next'
import {
  useFetchBusinessPartnersMutation,
  useFetchBusinessPartnerAddressMutation,
} from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import {
  PageHeader2,
  Table,
  type PaginResult,
} from '@arena2036/portal-shared-components-construct-x'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updatePartnerSelector } from 'features/control/updates'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import type { BusinessPartner } from 'features/newPartnerNetwork/types'
import Patterns, { isBPN } from 'types/Patterns'
import { useFetchMemberCompaniesQuery } from 'features/newPartnerNetwork/partnerNetworkPortalApiSlice'
import {
  isContentPresent,
  addCountryAttribute,
  addMemberAttribute,
} from './PartnerList/Helper'
import { type BusinessPartnerAddressResponse } from 'features/partnerNetwork/types'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const [expr, setExpr] = useState<string>('')
  const [bpn, setBpn] = useState<string>('')
  const searchInputData = useSelector(updatePartnerSelector)
  const columns = PartnerNetworksTableColumns(t)
  const [mutationRequest] = useFetchBusinessPartnerAddressMutation()
  const { data } = useFetchMemberCompaniesQuery()
  const [fetchMembers] = useFetchBusinessPartnersMutation()

  const validateSearchText = (text: string): boolean =>
    Patterns.SEARCH.test(text.trim())
  const [page, setPage] = useState<number>(0)
  const [allItems, setAllItems] = useState<BusinessPartner[]>([])
  const [memberData, setMemberData] = useState<PaginResult<BusinessPartner>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchArgs, setFetchArgs] = useState({
    args: {
      expr,
    },
    page,
  })

  const fetchAllMembers = async () => {
    await fetchMembers(fetchArgs)
      .unwrap()
      .then((payload) => {
        setMemberData(payload)
        if (isContentPresent(payload) && payload.content.length === 0) {
          setAllItems([])
          setLoading(false)
        } else {
          setCountryAttributes(payload)
        }
      })
      .catch(() => {
        setAllItems([])
      })
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (data && data.length > 0) fetchAllMembers()
  }, [data, fetchArgs])

  const setCountryAttributes = (payload: PaginResult<BusinessPartner>) => {
    let finalObj = JSON.parse(JSON.stringify(payload?.content))
    finalObj = addCountryAttribute(
      finalObj,
      payload.content as unknown as BusinessPartnerAddressResponse[]
    )
    finalObj = addMemberAttribute(finalObj, data)
    setAllItems((i) => (page === 0 ? finalObj : i.concat(finalObj)))
  }

  const fetchAndApply = async (result: string[]) => {
    await mutationRequest({ bpnLs: result, legalName: '' })
      .unwrap()
      .then((payload) => {
        setCountryAttributes(payload)
      })
      .catch(() => {
        setAllItems([])
      })

    setLoading(false)
  }

  useEffect(() => {
    setFetchArgs({
      args: {
        expr,
      },
      page,
    })
  }, [page, expr])

  useEffect(() => {
    if (bpn === '') {
      setFetchArgs({
        args: {
          expr: '',
        },
        page: 0,
      })
    }
    setLoading(true)
    fetchAndApply([bpn])
  }, [bpn])

  return (
    <main className="partner-network-page-container">
      <PageHeader2
        title={t('content.partnernetwork.headertitle')}
        topPage={false}
        headerHeight={200}
      />

      <section id="identity-management-id">
        <Table
          autoFocus={false}
          searchExpr={expr || bpn}
          toolbarVariant={'ultimate'}
          hasBorder={false}
          columnHeadersBackgroundColor={'transparent'}
          searchPlaceholder={t('content.partnernetwork.searchfielddefaulttext')}
          searchInputData={searchInputData}
          onSearch={(expr: string) => {
            if (expr === '') {
              setBpn('')
              setExpr('')
              setPage(0)
              return
            }
            if (expr !== '' && !validateSearchText(expr)) return
            setAllItems([])
            if (isBPN(expr)) setBpn(expr)
            else setExpr(expr)
          }}
          searchDebounce={1000}
          title={t('content.partnernetwork.tabletitle')}
          loadLabel={t('global.actions.loadmore')}
          getRowId={(row: { bpnl: string }) => row.bpnl ?? ''}
          columns={columns}
          loading={loading}
          rows={allItems}
          rowsCount={allItems?.length}
          noRowsMsg={t('content.companyData.table.noRowsMsg')}
          nextPage={() => {
            setPage(page + 1)
          }}
          hasMore={
            memberData?.meta &&
            memberData.meta.page < memberData.meta.totalPages - 1
          }
          hideFooterPagination={true}
        />
      </section>
    </main>
  )
}

export default PartnerNetwork
