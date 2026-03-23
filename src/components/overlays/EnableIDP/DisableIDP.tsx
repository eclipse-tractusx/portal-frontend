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
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import {
  useEnableIDPMutation,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { error, success } from 'services/NotifyService'

export const DisableIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [enableIDP] = useEnableIDPMutation()

  const doDisable = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      await enableIDP({ id, enabled: false })
      dispatch(closeOverlay())
      success(t('disable.success'))
    } catch (err) {
      error(t('disable.error'), '', err as object)
    }
  }

  return (
    <Dialog open={true}>
      <DialogHeader
        title={t('disable.title', {
          idp: data?.displayName,
        })}
        intro={t('disable.subtitle')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography>{t('disable.desc')}</Typography>
        </div>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h5">
            {data?.displayName} - {data?.alias}
          </Typography>
        </div>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography>{t('disable.ask')}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.cancel')}
        </Button>
        <Button variant="contained" onClick={doDisable}>
          {t('action.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
