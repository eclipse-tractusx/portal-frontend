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

import { useTranslation } from 'react-i18next'
import { CXValidatingOverlay } from '../CXValidatingOverlay'
import type { IHashMap } from 'types/MainTypes'
import {
  isMail,
  isURL,
  isDomainOrEmpty,
  isUUIDOrEmpty,
  isBPNOrEmpty,
} from 'types/Patterns'

export const SampleForm = () => {
  const { t } = useTranslation()
  const onSubmit = (formData: IHashMap<string>) =>
    console.log('submit', JSON.stringify(formData, null, 2))

  const fields = [
    { key: 'email', label: '', valid: isMail },
    { key: 'url', label: 'Metadata URL', valid: isURL },
    { key: 'domain', valid: isDomainOrEmpty },
    { key: 'uuid', valid: isUUIDOrEmpty, sx: { paddingLeft: '40px' } },
    { key: 'bpn', valid: isBPNOrEmpty },
    {
      key: 'even',
      valid: (expr: string) => Number.parseInt(expr) % 2 === 0,
    },
  ]

  return (
    <CXValidatingOverlay
      title={t('Sample Form')}
      subtitle={t('description of the sample form')}
      submitLabel={t('global.actions.confirm')}
      fields={fields}
      onSubmit={onSubmit}
    />
  )
}
