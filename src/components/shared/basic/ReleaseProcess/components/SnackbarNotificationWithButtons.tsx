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

import {
  Button,
  CircleProgress,
  IconButton,
  PageNotifications,
  PageSnackbar,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { Divider, Box, Grid } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import '../ReleaseProcessSteps.scss'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'

type NotificationObject = {
  title: string
  description: string
}

type SnackbarNotificationWithButtonsType = {
  pageNotification?: boolean
  pageSnackbar?: boolean
  setPageNotification?: (value: boolean) => void
  setPageSnackbar?: (value: boolean) => void
  onBackIconClick?: () => void
  onSaveAndProceed?: () => void
  onSave?: () => void
  isValid?: boolean
  pageSnackBarDescription?: string
  pageNotificationsObject?: NotificationObject
  pageSnackBarType?: SuccessErrorType.SUCCESS | SuccessErrorType.ERROR
  loader?: boolean
  helpUrl: string
}

export default function SnackbarNotificationWithButtons({
  pageNotification,
  pageSnackbar,
  setPageNotification,
  setPageSnackbar,
  onBackIconClick,
  onSaveAndProceed,
  onSave,
  isValid = true,
  pageSnackBarDescription,
  pageNotificationsObject,
  pageSnackBarType = SuccessErrorType.SUCCESS,
  loader,
  helpUrl,
}: SnackbarNotificationWithButtonsType) {
  const { t } = useTranslation('servicerelease')

  return (
    <Box mb={2}>
      {pageNotification && (
        <Grid container xs={12} sx={{ mb: 2 }}>
          <Grid xs={6}></Grid>
          <Grid xs={6}>
            <PageNotifications
              title={pageNotificationsObject?.title}
              description={pageNotificationsObject?.description}
              open
              severity="error"
              onCloseNotification={() => {
                if (setPageNotification) {
                  setPageNotification(false)
                }
              }}
            />
          </Grid>
        </Grid>
      )}
      <PageSnackbar
        open={pageSnackbar ?? false}
        onCloseNotification={() => {
          setPageSnackbar?.(false)
        }}
        severity={pageSnackBarType}
        description={pageSnackBarDescription}
        autoClose={true}
      />
      <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
      <Button
        sx={{ mr: 1 }}
        variant="outlined"
        startIcon={<HelpOutlineIcon />}
        onClick={() => window.open(helpUrl, '_blank')}
      >
        {t('footerButtons.help')}
      </Button>
      <IconButton
        onClick={() => {
          onBackIconClick?.()
        }}
        color="secondary"
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {loader ? (
        <span
          style={{
            float: 'right',
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
        </span>
      ) : (
        <>
          <Button
            sx={{ float: 'right' }}
            disabled={!isValid}
            variant="contained"
            onClick={() => {
              onSaveAndProceed?.()
            }}
          >
            {t('footerButtons.saveAndProceed')}
          </Button>
          <Button
            variant="outlined"
            name="send"
            sx={{ float: 'right', mr: 1 }}
            onClick={() => {
              onSave?.()
            }}
          >
            {t('footerButtons.save')}
          </Button>
        </>
      )}
    </Box>
  )
}
