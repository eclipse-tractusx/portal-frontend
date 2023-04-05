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
import { closeOverlay, show } from 'features/control/overlay/actions'
import { useFetchIDPDetailQuery } from 'features/admin/idpApiSlice'
import { OVERLAYS } from 'types/Constants'

export const UpdateIDPSuccess = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)

  const doUpdateIDP = async () => {
    dispatch(show(OVERLAYS.ENABLE_IDP, id))
  }

  return (
    <>
      <DialogHeader
        title={t('updatesuccess.title')}
        intro={t('updatesuccess.subtitle')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <Typography>{t('updatesuccess.desc')}</Typography>
        <Typography>{t('updatesuccess.note')}</Typography>
        {data && <Typography variant={'h5'}>{data.displayName}</Typography>}
        <Typography>{t('updatesuccess.understood')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.cancel')}
        </Button>
        <Button variant="contained" onClick={doUpdateIDP}>
          {t('action.understood')}
        </Button>
      </DialogActions>
    </>
  )
}
