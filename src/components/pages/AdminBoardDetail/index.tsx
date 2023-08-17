/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { Button } from '@catena-x/portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useFetchBoardAppDetailsQuery } from 'features/adminBoard/adminBoardApiSlice'
import BoardContentDetails from './BoardContentDetails'
import './AdminBoardDetail.scss'

export default function AdminBoardDetail() {
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data } = useFetchBoardAppDetailsQuery(appId ?? '')

  return (
    <main className="adminboard-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/adminboard')}
      >
        {t('global.actions.back')}
      </Button>
      {data && <BoardContentDetails item={data} />}
    </main>
  )
}
