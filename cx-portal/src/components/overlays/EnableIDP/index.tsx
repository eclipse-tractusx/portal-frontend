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
  Typography,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay'
import { useState } from 'react'
import {
  useEnableIDPMutation,
  useUpdateUserIDPMutation,
  IdentityProviderUser,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { EnableIDPContent } from './EnableIDPContent'
import { useFetchOwnUserDetailsQuery } from 'features/admin/userApiSlice'
import { OVERLAYS } from 'types/Constants'
import UserService from 'services/UserService'
import { error, success } from 'services/NotifyService'

export const EnableIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchOwnUserDetailsQuery()
  const idpData = useFetchIDPDetailQuery(id).data
  const [enableIdp] = useEnableIDPMutation()
  const [updateUserIDP] = useUpdateUserIDPMutation()
  const [idpEnableData, setIdpEnableData] = useState<
    IdentityProviderUser | undefined
  >(undefined)

  const doEnableIDP = async () => {
    if (!(data && idpEnableData)) return
    try {
      await enableIdp({
        id: id,
        enabled: true,
      }).unwrap()
      const idpUser: IdentityProviderUser = {
        ...idpEnableData,
        ...{
          identityProviderId: id,
          companyUserId: data.companyUserId,
        },
      }
      try {
        await updateUserIDP(idpUser).unwrap()
        dispatch(show(OVERLAYS.ENABLE_IDP_SUCCESS, id))
        success(t('enable.success'))
      } catch (err) {
        error(t('enable.error'), '', err as object)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('enable.title', {
          idp: idpData?.displayName,
        })}
        intro={t('enable.subtitle')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <Typography>{t('enable.desc')}</Typography>
        <Typography variant="body1">
          {t('enable.current', { name: UserService.getName() })}
        </Typography>
        <EnableIDPContent
          onValid={setIdpEnableData}
          identityProviderId={id}
          companyUserId={data?.companyUserId || ''}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={!(!!id && !!data?.companyUserId && !!idpEnableData?.userId)}
          onClick={doEnableIDP}
        >
          {t('action.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
