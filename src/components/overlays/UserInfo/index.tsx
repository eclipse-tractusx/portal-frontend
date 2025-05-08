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

import { DialogContent, DialogHeader } from '@catena-x/portal-shared-components'
import { useFetchAnyQuery } from 'features/admin/userOwn/apiSlice'
import { UserdetailSelector } from 'features/admin/userOwn/slice'
import { show } from 'features/control/overlay'
import type { AppDispatch } from 'features/store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function UserInfo({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const storedUserInfo = useSelector(UserdetailSelector)
  const { data: userInfo } = useFetchAnyQuery(id)

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.account.userAccount'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <pre>{JSON.stringify(userInfo ?? storedUserInfo, null, 2)}</pre>
      </DialogContent>
    </>
  )
}
