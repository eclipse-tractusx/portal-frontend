/********************************************************************************
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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Cards,
  CategoryDivider,
} from '@arena2036/portal-shared-components-construct-x'
import { fetchImageWithToken } from 'services/ImageService'
import type { AppMarketplaceCard } from 'features/apps/types'

export const AppListGroup = ({
  category,
  items,
}: {
  category: string
  items: AppMarketplaceCard[]
}) => {
  const { t } = useTranslation()
  const [itemsShown, setItemsShown] = useState(4)
  const itemsToShow = items.slice(0, Number(itemsShown))

  return (
    <>
      <CategoryDivider
        buttonText={
          items.length <= 4 || itemsToShow.length < items.length
            ? t('global.actions.more')
            : t('global.actions.collapse')
        }
        categoryItemsLength={items.length}
        categoryName={t(
          'content.appstore.appOverviewSection.categories.' +
            category.replace(/\s+/g, '').toLowerCase()
        )}
        disabled={items.length <= 4}
        onButtonClick={() => {
          setItemsShown(itemsToShow.length >= items.length ? 4 : items.length)
        }}
      />
      <Cards
        buttonText={t('global.actions.details')}
        columns={4}
        imageShape={'round'}
        imageSize={'small'}
        items={itemsToShow}
        variant={'compact'}
        expandOnHover={true}
        imageLoader={fetchImageWithToken}
        boxClickable={true}
        showFavIcon={true}
      />
    </>
  )
}
