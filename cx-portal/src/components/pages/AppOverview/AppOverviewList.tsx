/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { CardItems, Cards } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NoItems from 'components/pages/NoItems'
import { PAGES } from 'types/Constants'
import { AppInfo } from 'features/apps/apiSlice'
import { fetchImageWithToken } from 'services/ImageService'

export const AppOverviewList = ({
  filterItem,
  showOverlay,
}: {
  filterItem: CardItems[]
  showOverlay: (item: AppInfo) => void
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  if (filterItem && filterItem.length === 0) {
    return <NoItems />
  }

  const submenuOptions = [
    {
      label: t('content.appoverview.sortOptions.deactivate'),
      value: 'deactivate',
      url: '',
    },
  ]

  return (
    <div className="desc-card">
      <Cards
        items={filterItem}
        columns={4}
        buttonText="Details"
        variant="minimal"
        filledBackground={false}
        imageSize={'small'}
        imageLoader={fetchImageWithToken}
        showAddNewCard={true}
        newButtonText={t('content.appoverview.addbtn')}
        onNewCardButton={() => navigate(`/${PAGES.APPRELEASEPROCESS}/form`)}
        onCardClick={(item: AppInfo) => {
          showOverlay(item)
        }}
        subMenu={true}
        submenuOptions={submenuOptions}
        submenuClick={(value: string, appId: string) =>
          value === 'deactivate' &&
          navigate(`/deactivate/${appId}`, {
            state: filterItem,
          })
        }
        tooltipText={t('content.appoverview.submenuNotAvail')}
      />
    </div>
  )
}
