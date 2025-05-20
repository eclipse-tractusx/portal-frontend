/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { ViewSelector } from '@catena-x/portal-shared-components'
import { Stack } from '@mui/material'
import DebouncedSearchInput from 'components/shared/basic/Input/DebouncedSearchInput'
import {
  appsControlSelector,
  setAppGroup,
  setAppSearch,
} from 'features/apps/control'
import { AppGroup } from 'features/apps/types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const control = useSelector(appsControlSelector)

  const setGroup = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(setAppGroup(e.currentTarget.value as AppGroup))
  }

  const triggerSearch = (expr: string) => {
    dispatch(setAppSearch(expr))
  }

  const categoryViews = [
    {
      buttonText: t('content.appstore.appOverviewSection.categoryViews.all'),
      buttonValue: AppGroup.ALL,
      onButtonClick: setGroup,
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.categoryViews.useCases'
      ),
      buttonValue: AppGroup.USE_CASES,
      onButtonClick: setGroup,
    },
  ]

  return (
    <Stack
      justifyContent={{ sm: 'space-between', xs: 'center' }}
      direction={{ lg: 'row', xs: 'column' }}
      spacing={3}
      alignItems={'center'}
      sx={{ px: 3 }}
    >
      <div>
        <DebouncedSearchInput
          sx={{ marginBottom: '0px' }}
          placeholder={t('content.appstore.searchSection.inputPlaceholder')}
          value={control.search}
          debounceTime={500}
          onSearch={triggerSearch}
        />
      </div>
      <div>
        <ViewSelector activeView={control.group} views={categoryViews} />
      </div>
    </Stack>
  )
}
