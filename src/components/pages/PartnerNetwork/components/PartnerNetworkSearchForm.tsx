/********************************************************************************
 * 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import React from 'react'
import { SearchInput } from '@nidhi.garg/portal-shared-components'
import { useTranslation } from 'react-i18next'

type SearchFormProps = {
  onSearchTextChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  searchError: string | null
  searchText: string
}

const PartnerNetworkSearchForm = ({
  onSearchTextChange,
  searchText,
  searchError,
}: SearchFormProps) => {
  const { t } = useTranslation()

  return (
    <div className="advance-search-fields-container">
      <div className="identifier-fields-container">
        <SearchInput
          variant="outlined"
          placeholder={t('content.partnernetwork.searchfielddefaulttext')}
          margin="dense"
          onChange={(e) => onSearchTextChange(e)}
          value={searchText}
          error={Boolean(searchError)}
          helperText={searchError}
        />
      </div>
    </div>
  )
}

export default PartnerNetworkSearchForm
