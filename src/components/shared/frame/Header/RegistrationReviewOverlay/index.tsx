/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Trans, useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogActions,
  Typography,
} from '@catena-x/portal-shared-components'
import RegistrationReviewContent from './RegistrationReviewContent'
import './RegistrationReview.scss'

export type StatusTagIcon = {
  type?: 'confirmed' | 'pending' | 'declined' | 'label'
}

export type RegistrationReviewProps = {
  openDialog: boolean
  handleOverlayClose: React.MouseEventHandler
}

const RegistrationReviewOverlay = ({
  openDialog,
  handleOverlayClose,
}: RegistrationReviewProps) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  return (
    <div className={'company-detail-overlay'}>
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: isMobile ? '80%' : '50%',
        }}
      >
        <DialogHeader title={t('content.registrationInreview.title')} />
        <DialogContent
          sx={{
            padding: isMobile ? '0 30px' : '0 120px',
            marginBottom: 5,
          }}
        >
          <div className="registration-review">
            <Trans>
              <Typography variant="body1" className="description">
                {t('content.registrationInreview.description')}
              </Typography>
            </Trans>
            <RegistrationReviewContent />
          </div>
        </DialogContent>
        <DialogActions
          helperText={t('content.registrationInreview.helperText')}
        >
          <Button variant="contained" size="small" onClick={handleOverlayClose}>
            {t('global.actions.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RegistrationReviewOverlay
