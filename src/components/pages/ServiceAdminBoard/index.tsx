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
import { useFetchInReviewServicesQuery } from 'features/adminBoard/serviceAdminBoardApiSlice'
import { useTranslation } from 'react-i18next'
import { PAGES } from 'types/cfx/Constants'

export default function ServiceAdminBoard() {
  const { t } = useTranslation('servicerelease')
  return (
    <CommonAdminBoard
      headerTitle={t('adminBoard.headerTitle')}
      searchText={t('adminBoard.search')}
      filterOptionText={{
        open: t('adminBoard.tabs.open'),
        all: t('adminBoard.tabs.all'),
      }}
      sortOptionText={{
        newFirst: t('adminBoard.sortOptions.newFirst'),
        AppTitle: t('adminBoard.sortOptions.AppTitle'),
      }}
      fetchQuery={useFetchInReviewServicesQuery}
      isDynamicSearchEnabled={true}
      type={PAGES.SERVICEADMINBOARD_DETAIL}
      successApproveMsg={t('adminBoard.successApproveMsg')}
      errorApproveMsg={t('adminBoard.errorApproveMsg')}
      successDeclineMsg={t('adminBoard.successDeclineMsg')}
      errorDeclineMsg={t('adminBoard.errorDeclineMsg')}
    />
  )
}
