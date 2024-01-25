/********************************************************************************
 * Copyright (c) 2021, 2024 BMW Group AG
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import DebouncedSearchInput from 'components/shared/basic/Input/DebouncedSearchInput'
import { useTranslation } from 'react-i18next'

export default function SearchSection() {
  const { t } = useTranslation()

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log('group', e.currentTarget.value)
  }

  const triggerSearch = (expr: string) => {
    console.log(expr)
  }

  const categoryViews = [
    {
      buttonText: t('content.appstore.appOverviewSection.categoryViews.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.categoryViews.useCases'
      ),
      buttonValue: 'useCases',
      onButtonClick: setView,
    },
  ]

  return (
    <>
      <ViewSelector activeView={''} views={categoryViews} />

      <div style={{ width: '100%', textAlign: 'center' }}>
        <DebouncedSearchInput
          sx={{ minWidth: '544px', marginBottom: '50px' }}
          placeholder={t('content.home.searchSection.inputPlaceholder')}
          debounceTime={500}
          onSearch={triggerSearch}
        />
      </div>
    </>
  )
}
