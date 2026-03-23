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

import { MainHeader } from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { getAssetBase } from 'services/EnvironmentService'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-home">
      <MainHeader
        title={t('content.usermanagement.title')}
        subTitle={t('content.usermanagement.description')}
        headerHeight={600}
        subTitleWidth={787}
        background="LinearGradient1"
        imagePath={`${getAssetBase()}/images/frame/Frame.jpg`}
      />
    </div>
  )
}
