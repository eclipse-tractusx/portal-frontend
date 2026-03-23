/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
  Dialog,
  DialogContent,
  Button,
  Typography,
  BackButton,
} from '@arena2036/portal-shared-components-construct-x'
import Box from '@mui/material/Box'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import './styles.scss'

interface RetryOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  description: string
  title: string
}

const RetryOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  description,
  title,
}: RetryOverlayProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: '25%',
        }}
      >
        <DialogContent
          sx={{
            padding: '10px 0px',
          }}
        >
          <Box className="headerSection">
            <ErrorOutlineIcon
              sx={{ paddingRight: '10px', fontSize: 35 }}
              color="error"
            />

            <Typography variant="h4">{title}</Typography>
          </Box>
          <Typography variant="body1" className="descriptionText">
            {description}
          </Typography>
          <Box className="buttonSection app-back">
            <BackButton
              backButtonLabel={t('global.actions.back')}
              backButtonVariant="text"
              onBackButtonClick={(e) => {
                handleOverlayClose(e)
              }}
            />
            <Button
              variant="contained"
              color="success"
              className="retryButton"
              onClick={(e) => {
                handleConfirmClick(e)
              }}
            >
              {t('global.actions.retry')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RetryOverlay
