/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { Typography, Button, CircleProgress } from 'cx-portal-shared-components'
import { Box, Divider } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import MuiDialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'

interface DeleteNotificationConfirmOverlayProps {
  title: string
  intro: string
  handleClose: any
  handleCallback: () => void
  loading: boolean
}

const DeleteNotificationConfirmOverlay = ({
  title,
  intro,
  handleClose,
  handleCallback,
  loading,
}: DeleteNotificationConfirmOverlayProps) => {
  const { t } = useTranslation()
  return (
    <div className="deleteOverlay">
      <Box sx={{ textAlign: 'left' }}>
        <MuiDialogTitle
          sx={{
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '24px 35px',
          }}
        >
          <div className="titleIcon">
            <ErrorOutlineIcon sx={{ fontSize: 20 }} color="error" />
          </div>
          {title}
        </MuiDialogTitle>
        <Divider
          sx={{
            borderColor: 'border.border01',
            flexShrink: 'unset',
            width: '100%',
          }}
        />
        <Typography variant="body2" sx={{ padding: '24px 35px' }}>
          {intro}
        </Typography>
      </Box>
      <div className="modalButton">
        <Button
          color="primary"
          variant="text"
          onClick={(e) => handleClose(e)}
          size="medium"
          sx={{
            fontSize: '14px',
            marginRight: '15px',
            borderRadius: '8px',
          }}
        >
          {t('notification.cancelButton')}
        </Button>
        {!loading && (
          <Button
            color="error"
            variant="contained"
            onClick={() => handleCallback()}
            size="large"
            sx={{
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            {t('notification.deleteButton')}
          </Button>
        )}
        {loading && (
          <Box
            sx={{
              width: '110px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircleProgress
              size={40}
              step={1}
              interval={0.1}
              colorVariant={'primary'}
              variant={'indeterminate'}
              thickness={8}
            />
          </Box>
        )}
      </div>
    </div>
  )
}

export default DeleteNotificationConfirmOverlay
