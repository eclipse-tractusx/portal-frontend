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

import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import type { IdentityProvider } from 'features/admin/idpApiSlice'

export const AddUserDeny = ({ idps }: { idps: IdentityProvider[] }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <DialogHeader
        title={t('add user not possible')}
        intro={t(
          'your action is required before selecting your desired functionality'
        )}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div>
          {t(
            'Add user not possible because currently you have enabled not exactly one Identity Provider. Before adding users go to the Identity Provider Configuration and choose exactly one IdP where users should log in and disable the others.'
          )}
        </div>
        <div style={{ marginTop: '30px' }}>
          {t('The following Identity Providers are enabled')}
          <ul>
            {idps.map((idp) => (
              <li key={idp.identityProviderId}>{`${idp.alias} ${
                idp.displayName ? `(${idp.displayName})` : ''
              }`}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(closeOverlay())}
          sx={{ textTransform: 'none' }}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/${PAGES.IDP_MANAGEMENT}`)
            dispatch(closeOverlay())
          }}
          sx={{ textTransform: 'none' }}
        >
          {t('pages.idpManagement')}
        </Button>
      </DialogActions>
    </>
  )
}
