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

import './AppListGroupView.scss'
import { Box } from '@mui/material'
import { Cards } from '@catena-x/portal-shared-components'
import { multiMapBy } from 'utils/multiMapBy'
import { useTranslation } from 'react-i18next'
import { AppListGroup } from '../AppListGroup'
import NoItems from 'components/pages/NoItems'
import { fetchImageWithToken } from 'services/ImageService'

export const AppListGroupView = ({
  items,
  groupKey,
}: {
  // Add an ESLint exception until there is a solution
  /* eslint @typescript-eslint/no-explicit-any: "off" */
  items: any[]
  groupKey: string
}) => {
  const { t } = useTranslation()

  if (items && items.length === 0) {
    return <NoItems />
  }

  if (!groupKey || groupKey === '') {
    return (
      <Box>
        <Cards
          buttonText={t('global.actions.details')}
          columns={4}
          imageShape={'round'}
          imageSize={'small'}
          items={items}
          variant={'compact'}
          expandOnHover={true}
          imageLoader={fetchImageWithToken}
          boxClickable={true}
        />
      </Box>
    )
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
    <>
      <ul className="AppListGroupView">
        {Object.entries(group).map((v) => (
          <li key={v[0]}>
            <AppListGroup category={v[0]} items={v[1]} />
          </li>
        ))}
      </ul>
    </>
  )
}
