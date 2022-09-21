/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import './AppListGroupView.scss'
import { Box } from '@mui/material'
import { Cards } from 'cx-portal-shared-components'
import { multiMapBy } from 'utils/multiMapBy'
import { useTranslation } from 'react-i18next'
import { AppListGroup } from '../AppListGroup'

export const AppListGroupView = ({
  items,
  groupKey,
}: {
  items: any[]
  groupKey: string
}) => {
  const { t } = useTranslation()

  if (!groupKey || groupKey === '') {
    return (
      <Box sx={{ marginTop: '52px' }}>
        <Cards
          buttonText={t('global.actions.details')}
          columns={4}
          imageShape={'round'}
          imageSize={'small'}
          items={items}
          variant={'compact'}
          expandOnHover={true}
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
