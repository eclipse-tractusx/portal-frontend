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

import { CardItems, Cards } from '@catena-x/portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PAGES } from 'types/Constants'
import { AppInfo } from 'features/apps/apiSlice'
import { fetchImageWithToken } from 'services/ImageService'

enum AppSubMenuItems {
  DEACTIVATE = 'deactivate',
  CHANGE_IMAGE = 'changeImage',
  CHANGE_DESCRIPTION = 'changeDescription',
  ADD_ROLES = 'addRoles',
  CHANGE_DOCUMENTS = 'changeDocuments',
}

export const AppOverviewList = ({
  filterItem,
  showOverlay,
}: {
  filterItem: CardItems[]
  showOverlay: (item: AppInfo) => void
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const submenuOptions = [
    {
      label: t('content.appoverview.sortOptions.deactivate'),
      value: AppSubMenuItems.DEACTIVATE,
      url: '',
    },
    {
      label: t('content.appoverview.sortOptions.changeImage'),
      value: AppSubMenuItems.CHANGE_IMAGE,
      url: '',
    },
    {
      label: t('content.appoverview.sortOptions.changeDescription'),
      value: AppSubMenuItems.CHANGE_DESCRIPTION,
      url: '',
    },
    {
      label: t('content.appoverview.sortOptions.addRoles'),
      value: AppSubMenuItems.ADD_ROLES,
      url: '',
    },
    {
      label: t('content.appoverview.sortOptions.changeDocuments'),
      value: AppSubMenuItems.CHANGE_DOCUMENTS,
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
        onCardClick={(item: unknown) => {
          showOverlay(item as AppInfo)
        }}
        subMenu={true}
        submenuOptions={submenuOptions}
        submenuClick={(sortMenu: string, id: string | undefined) => {
          sortMenu === AppSubMenuItems.DEACTIVATE &&
            navigate(`/${PAGES.DEACTIVATE}/${id}`, {
              state: filterItem,
            })
          sortMenu === AppSubMenuItems.CHANGE_IMAGE &&
            navigate(`/${PAGES.CHANGE_IMAGE}/${id}`, {
              state: filterItem,
            })
          sortMenu === AppSubMenuItems.CHANGE_DESCRIPTION &&
            navigate(`/${PAGES.CHANGE_DESCRIPTION}/${id}`, {
              state: filterItem,
            })
          sortMenu === AppSubMenuItems.ADD_ROLES &&
            navigate(`/${PAGES.ADD_ROLES}/${id}`, {
              state: filterItem,
            })
          sortMenu === AppSubMenuItems.CHANGE_DOCUMENTS &&
            navigate(`/${PAGES.CHANGE_DOCUMENTS}/${id}`, {
              state: filterItem,
            })
          return undefined
        }}
        tooltipText={t('content.appoverview.submenuNotAvail')}
      />
    </div>
  )
}
