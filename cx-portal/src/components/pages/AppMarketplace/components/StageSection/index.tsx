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

import { Button, MainHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import PageService from 'services/PageService'
import { label as AppList } from '../AppListSection'
import FavoriteSection from '../FavoriteSection'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-app-store">
      <MainHeader
        title={t('content.appstore.stage.title')}
        subTitle={t('content.appstore.stage.subtitle')}
        headerHeight={731}
        subTitleWidth={787}
        background="LinearGradient1"
        imagePath="./app-store-stage-desktop.png"
      >
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => PageService.scrollTo(AppList)}
        >
          {t('content.appstore.stage.appButton')}
        </Button>
        <FavoriteSection />
      </MainHeader>
    </div>
  )
}
