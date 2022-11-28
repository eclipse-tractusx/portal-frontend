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

import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay/actions'
import { useState } from 'react'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import {
  IdentityProviderUpdate,
  useFetchIDPDetailQuery,
  useUpdateIDPMutation,
} from 'features/admin/idpApiSlice'
import { UpdateIDPContent } from './UpdateIDPContent'
import { OVERLAYS } from 'types/Constants'

export const UpdateIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [updateIdp] = useUpdateIDPMutation()
  const [idpUpdateData, setIdpUpdateData] = useState<
    IdentityProviderUpdate | undefined
  >(undefined)

  const doUpdateIDP = async () => {
    if (!(data && idpUpdateData)) return
    console.log(idpUpdateData)
    try {
      const idpUpdate = await updateIdp(idpUpdateData).unwrap()
      console.log(idpUpdate)
      dispatch(updateData(UPDATES.IDP_LIST))
      dispatch(show(OVERLAYS.ENABLE_IDP, id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('content.idpmanagement.updateIdpHeadline')}
        intro={t('content.idpmanagement.updateIdpSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        {data && <UpdateIDPContent idp={data} onValid={setIdpUpdateData} />}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={!idpUpdateData}
          onClick={doUpdateIDP}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
