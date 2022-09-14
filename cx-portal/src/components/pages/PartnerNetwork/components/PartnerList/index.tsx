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

import { PageLoadingTable, PaginFetchArgs } from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { updatePartnerSelector } from 'features/control/updatesSlice'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import { BusinessPartner } from 'features/newPartnerNetwork/types'
import { GridCellParams } from '@mui/x-data-grid'
import Patterns from 'types/Patterns'
import { PartnerNetworksBPNTableColumns } from './PartnerNetworksBPNTableColumns'
import { useFetchBusinessPartnerAddressMutation } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { useFetchMemberCompaniesQuery } from 'features/newPartnerNetwork/partnerNetworkPortalApiSlice'

export const PartnerList = ({
  fetchHook,
  fetchHookArgs,
  onSearch,
  onTableCellClick,
}: {
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  onSearch?: (search: string) => void
  onTableCellClick: (params: GridCellParams) => void
}) => {
  const { t } = useTranslation()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updatePartnerSelector)
  const columns = PartnerNetworksTableColumns(useTranslation)
  const bpnColumns = PartnerNetworksBPNTableColumns(useTranslation)
  const [showBPNColumn, setShowBPNColumn] = useState<boolean>(false)

  const validateSearchText = (text: string): boolean =>
    /^[a-zA-ZÀ-ÿ0-9 !?@&_\-.]{3,80}$/.test(text.trim())

  const checkIfBPNLNumber = (text: string): boolean =>
    Patterns.BPN.test(text.trim())

  return (
    <section id="identity-management-id">
      <PageLoadingTable<BusinessPartner>
        onCellClick={onTableCellClick}
        additionalHooks={{
          mutation: useFetchBusinessPartnerAddressMutation,
          query: useFetchMemberCompaniesQuery,
          addCountryAttribute: true,
          checkForMember: true,
        }}
        toolbarVariant="premium"
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
      />
    </section>
  )
}
