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
  IdentityProvider,
  useFetchIDPListQuery,
} from 'features/admin/idpApiSlice'
import { show } from 'features/control/overlay/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from 'cx-portal-shared-components'
import './style.scss'
import { updateIDPSelector } from 'features/control/updatesSlice'

export const IDPListItem = ({ idp }: { idp: IdentityProvider }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const state = idp.enabled ? 'enabled' : 'disabled'

  const doDelete = () => {
    console.log('delete ', idp.identityProviderId)
  }

  return (
    <div
      className="idp-list-item"
      onClick={() => dispatch(show(OVERLAYS.IDP, idp.identityProviderId))}
    >
      <span className="category">
        {idp.identityProviderCategoryId}
      </span>
      <span className="name">{idp.displayName || idp.alias}</span>
      <span className={`state ${state}`}>{t(`global.state.${state}`)}</span>
      <span className="action">
      {idp.enabled ||
      <Button
              size="small"
              startIcon={<DeleteForeverIcon />}
              onClick={doDelete}
            />
      }
      </span>
    </div>
  )
}

export const IDPList = () => {

  const update = useSelector(updateIDPSelector)
  const { data } = useFetchIDPListQuery(update)

  return (
    <ul className="idp-list">
      {data &&
        data.map((idp) => (
          <li key={idp.identityProviderId}>
            <IDPListItem idp={idp} />
          </li>
        ))}
    </ul>
  )
}
