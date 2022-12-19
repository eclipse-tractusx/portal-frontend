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

import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay/actions'
import { useState } from 'react'
import {
  useEnableIDPMutation,
  useAddUserIDPMutation,
  useUpdateUserIDPMutation,
  IdentityProviderUser,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { EnableIDPContent } from './EnableIDPContent'
import { useFetchOwnUserDetailsQuery } from 'features/admin/userApiSlice'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { OVERLAYS } from 'types/Constants'

export const EnableIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useFetchOwnUserDetailsQuery()
  const idpData = useFetchIDPDetailQuery(id).data
  const [enableIdp] = useEnableIDPMutation()
  const [addUserIDP] = useAddUserIDPMutation()
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
        await addUserIDP(idpUser).unwrap()
      } catch (e) {
        await updateUserIDP(idpUser).unwrap()
      }
      dispatch(updateData(UPDATES.IDP_LIST))
      dispatch(show(OVERLAYS.ENABLE_IDP_SUCCESS, id))
    } catch (err) {
      console.log(err)
    }
  }

  console.log(id, data, data?.companyUserId, idpEnableData, idpEnableData?.userId)

  return (
    <>
      <DialogHeader
        title={t('content.idpmanagement.enableIdpHeadline', {
          idp: idpData?.displayName,
        })}
        intro={t('content.idpmanagement.enableIdpSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <Typography>
          {t('Before enabling we have to link your user to the new IDP.')}
        </Typography>
        <Typography>
          {t('Please enter the User ID (not name) of your user from there.')}
        </Typography>
        <EnableIDPContent onValid={setIdpEnableData} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={
            !(
              !!id &&
              !!data?.companyUserId &&
              !!idpEnableData?.userId
            )
          }
          onClick={doEnableIDP}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
