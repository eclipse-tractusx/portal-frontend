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

import { Dialog } from 'cx-portal-shared-components'
import { stateSelector } from 'features/control/overlay/slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAction, getOverlay } from 'services/AccessService'
import { OVERLAYS } from 'types/Constants'

export default function MainOverlay() {
  const { overlay } = useParams()
  const ov = useSelector(stateSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (overlay) {
      navigate({
        search:
          ov.type === OVERLAYS.NONE
            ? ''
            : `?overlay=${ov.type}${ov.id ? ':' + ov.id : ''}`,
      })
    }
  }, [navigate, overlay, ov])

  return (
    <>
      {ov.type === OVERLAYS.NONE && getAction(ov.id) ? (
        getAction(ov.id)?.element
      ) : (
        <Dialog modalBorderRadius={50} open={ov.type !== OVERLAYS.NONE}>
          {getOverlay(ov)}
        </Dialog>
      )}
    </>
  )
}
