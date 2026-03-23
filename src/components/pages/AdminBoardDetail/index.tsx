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

import { BackButton } from '@arena2036/portal-shared-components-construct-x'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { t } from 'i18next'
import { useFetchBoardAppDetailsQuery } from 'features/adminBoard/adminBoardApiSlice'
import BoardContentDetails from './BoardContentDetails'
import { PAGES } from 'types/Constants'
import './style.scss'

export default function AdminBoardDetail() {
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data } = useFetchBoardAppDetailsQuery(appId ?? '')

  return (
    <main className="adminboard-main">
      <Box className="app-back">
        <BackButton
          backButtonLabel={t('global.actions.back')}
          backButtonVariant="text"
          onBackButtonClick={() => {
            navigate(`/${PAGES.APP_ADMIN_BOARD}`)
          }}
        />
      </Box>
      {data && <BoardContentDetails item={data} />}
    </main>
  )
}
