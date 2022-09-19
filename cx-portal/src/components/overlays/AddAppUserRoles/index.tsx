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

import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppRoles } from './AppRoles'
import UserListContent from './UserListContent'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './AddAppUserRoles.scss'

export default function AddAppUserRoles() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      <DialogHeader
        title={t('content.addUserRight.headline')}
        intro={t('content.addUserRight.subheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(show(OVERLAYS.NONE, ''))}
      />

      <DialogContent className="add-user-overlay-content">
        <div className="add-user-overlay-content-roles">
          <AppRoles />
        </div>

        <div className="add-user-overlay-content-content">
          <UserListContent />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={() => console.log('confirm')}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
