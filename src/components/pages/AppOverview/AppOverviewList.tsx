/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import {
  type CardItems,
  Cards,
} from '@arena2036/portal-shared-components-construct-x'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PAGES } from 'types/Constants'
import type { AppInfo } from 'features/apps/types'
import { fetchImageWithToken } from 'services/ImageService'

enum AppSubMenuItems {
  DEACTIVATE = 'deactivate',
  CHANGE_IMAGE = 'changeImage',
  CHANGE_DESCRIPTION = 'changeDescription',
  ADD_ROLES = 'addRoles',
  CHANGE_DOCUMENTS = 'changeDocuments',
  VIEW_DETAILS = 'viewDetails',
  ACTIVATE = 'activate',
  DELETE = 'delete',
  VIEW_INACTIVE_APP_DETAILS = 'viewInactiveAppDetails',
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

  const activeSubmenuOptions = [
    {
      label: t('content.appOverview.sortOptions.deactivate'),
      value: AppSubMenuItems.DEACTIVATE,
    },
    {
      label: t('content.appOverview.sortOptions.changeImage'),
      value: AppSubMenuItems.CHANGE_IMAGE,
    },
    {
      label: t('content.appOverview.sortOptions.changeDescription'),
      value: AppSubMenuItems.CHANGE_DESCRIPTION,
    },
    {
      label: t('content.appOverview.sortOptions.addRoles'),
      value: AppSubMenuItems.ADD_ROLES,
    },
    {
      label: t('content.appOverview.sortOptions.changeDocuments'),
      value: AppSubMenuItems.CHANGE_DOCUMENTS,
    },
    {
      label: t('content.appOverview.sortOptions.viewDetails'),
      value: AppSubMenuItems.VIEW_DETAILS,
    },
  ]

  const inactiveSubmenuOptions = [
    {
      label: t('content.appOverview.sortOptions.activate'),
      value: AppSubMenuItems.ACTIVATE,
      disabled: true,
    },
    {
      label: t('content.appOverview.sortOptions.delete'),
      value: AppSubMenuItems.DELETE,
      disabled: true,
    },
    {
      label: t('content.appOverview.sortOptions.viewDetails'),
      value: AppSubMenuItems.VIEW_INACTIVE_APP_DETAILS,
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
        newButtonText={t('content.appOverview.addbtn')}
        onNewCardButton={() => {
          navigate(`/${PAGES.APP_RELEASE_PROCESS}/form`)
        }}
        onCardClick={(item: unknown) => {
          showOverlay(item as AppInfo)
        }}
        subMenu={true}
        activeSubmenuOptions={activeSubmenuOptions}
        inactiveSubmenuOptions={inactiveSubmenuOptions}
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
          sortMenu === AppSubMenuItems.VIEW_DETAILS &&
            navigate(`/${PAGES.VIEW_DETAILS}/${id}`, {
              state: filterItem,
            })
          sortMenu === AppSubMenuItems.VIEW_INACTIVE_APP_DETAILS &&
            navigate(`/${PAGES.VIEW_DETAILS}/${id}`, {
              state: filterItem,
            })
          return undefined
        }}
        tooltipText={t('content.appOverview.submenuNotAvail')}
      />
    </div>
  )
}
