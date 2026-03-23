/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
} from '@arena2036/portal-shared-components-construct-x'
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
    <div className="registration-review-dialog-main">
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: isMobile ? '100%' : '50%',
          margin: isMobile ? '80px 0 0' : '',
          borderRadius: '32px 32px 0px 0px',
        }}
      >
        <DialogHeader title={t('content.registrationInreview.title')} />
        <DialogContent
          sx={{
            padding: isMobile ? '0 20px' : '0 120px',
            marginBottom: '20px',
          }}
        >
          <div className="registration-review">
            <Trans>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                className="description"
              >
                {t('content.registrationInreview.description')}
              </Typography>
            </Trans>
            <RegistrationReviewContent />
          </div>
        </DialogContent>
        <DialogActions
          helperText={
            <Trans
              i18nKey={t('content.registrationInreview.helperText')}
              components={[<span style={{ color: '#0f71cb' }} key="0"></span>]}
            ></Trans>
          }
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
