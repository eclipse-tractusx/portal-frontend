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

import CommonAdminBoard from 'components/shared/templates/AdminBoard'
import { useFetchAppReleaseAppsQuery } from 'features/adminBoard/adminBoardApiSlice'
import { useTranslation } from 'react-i18next'

export default function AdminBoard() {
  const { t } = useTranslation()
  return (
    <CommonAdminBoard
      headerTitle={t('content.adminBoard.headerTitle')}
      searchText={t('content.adminBoard.search')}
      filterOptionText={{
        open: t('content.adminBoard.tabs.open'),
        all: t('content.adminBoard.tabs.all'),
      }}
      sortOptionText={{
        newFirst: t('content.adminBoard.sortOptions.newFirst'),
        AppTitle: t('content.adminBoard.sortOptions.AppTitle'),
      }}
      fetchQuery={useFetchAppReleaseAppsQuery}
      successApproveMsg={t('content.adminBoard.successMsg')}
      errorApproveMsg={t('content.adminBoard.errorMsg')}
      successDeclineMsg={t('content.adminBoard.successMsg')}
      errorDeclineMsg={t('content.adminBoard.errorMsg')}
    />
  )
}
