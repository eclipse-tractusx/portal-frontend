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

import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import {
  useFetchIDPListQuery,
  IdentityProvider,
} from 'features/admin/idpApiSlice'
import { AddUserContent } from './AddUserContent'
import { AddUserDeny } from './AddUserDeny'
import { useEffect, useState } from 'react'

export const AddUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, isFetching } = useFetchIDPListQuery()
  const [idps, setIdps] = useState<IdentityProvider[]>([])

  useEffect(
    () =>
      setIdps(data ? data.filter((idp: IdentityProvider) => idp.enabled) : []),
    [data]
  )

  return isFetching ? (
    <>
      <DialogHeader
        {...{
          title: t('Checking Identity Providers'),
          intro: t('checking intro'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay),
        }}
      />

      <DialogContent>{'checking IDPs'}</DialogContent>

      <DialogActions helperText={t('content.addUser.helperText')}>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay)}>
          {t('global.actions.cancel')}
        </Button>
      </DialogActions>
    </>
  ) : idps.length === 1 ? (
    <AddUserContent idp={idps[0]} />
  ) : (
    <AddUserDeny idps={idps} />
  )
}
