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

import { useDispatch } from 'react-redux'
import { store } from 'features/store'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from '@nidhi.garg/portal-shared-components'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'

export default function AddMultipleUser() {
  const dispatch = useDispatch<typeof store.dispatch>()

  return (
    <>
      <DialogHeader
        {...{
          title: 'Manage BPNs',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <div className="manageBPN">TEST</div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )
}
