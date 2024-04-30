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

import { UpdateIDPContent } from 'components/overlays/UpdateIDP/UpdateIDPContent'
import {
  Button,
  DialogActions,
  IconButton,
  Typography,
} from '@nidhi.garg/portal-shared-components'
import type { IdentityProvider } from 'features/admin/idpApiSlice'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { t } from 'i18next'
import './style.scss'

export const IDPDetailContent = ({
  idp,
  onClose,
}: {
  idp: IdentityProvider
  onClose?: () => void
}) => {
  return (
    <div className="idp-detail-content">
      {onClose && (
        <Box p={1} display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <div className="idp-detail-content-header">
        <Typography variant="h4">{t('content.idpdetail.title')}</Typography>
      </div>
      <div className="idp-detail-content-main">
        <UpdateIDPContent idp={idp} onValid={console.log} />
      </div>
      <DialogActions>
        <Button variant="contained" onClick={console.log}>
          {t('global.actions.save')}
        </Button>
      </DialogActions>
    </div>
  )
}
