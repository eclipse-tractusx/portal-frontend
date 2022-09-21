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

import AppDetailContentDetails from 'components/pages/AppDetail/AppDetailContentDetails'
import { DialogContent, DialogHeader } from 'cx-portal-shared-components'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function AppInfo({ id, title }: { id: string; title?: string }) {
  const dispatch = useDispatch()
  const { data } = useFetchAppDetailsQuery(id)

  return (
    <>
      <DialogHeader
        {...{
          title: title || '',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        {data && <AppDetailContentDetails item={data} />}
      </DialogContent>
    </>
  )
}
