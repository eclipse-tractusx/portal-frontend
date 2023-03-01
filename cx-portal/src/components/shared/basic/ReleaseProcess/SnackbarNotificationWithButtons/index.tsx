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

import {
  Button,
  IconButton,
  PageNotifications,
  PageSnackbar,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, Box, Grid } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import { useFetchAppStatusQuery } from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'

type SnackbarNotificationWithButtonsType = {
  appPageNotification?: boolean
  appPageSnackbar?: boolean
  setAppPageNotification?: (value: boolean) => void
  setAppPageSnackbar?: (value: boolean) => void
}

export default function SnackbarNotificationWithButtons({
  appPageNotification,
  appPageSnackbar,
  setAppPageNotification,
  setAppPageSnackbar,
}: SnackbarNotificationWithButtonsType) {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  const onBackIconClick = () => {
    dispatch(setAppStatus(fetchAppStatus))
    dispatch(decrement())
  }

  return (
    <Box mb={2}>
      {appPageNotification && (
        <Grid container xs={12} sx={{ mb: 2 }}>
          <Grid xs={6}></Grid>
          <Grid xs={6}>
            <PageNotifications
              title={t('serviceReleaseForm.error.title')}
              description={t('serviceReleaseForm.error.message')}
              open
              severity="error"
              onCloseNotification={() =>
                setAppPageNotification && setAppPageNotification(false)
              }
            />
          </Grid>
        </Grid>
      )}
      <PageSnackbar
        open={appPageSnackbar ?? false}
        onCloseNotification={() =>
          setAppPageSnackbar && setAppPageSnackbar(false)
        }
        severity="success"
        description={t('serviceReleaseForm.dataSavedSuccessMessage')}
        autoClose={true}
      />
      <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
      <Button sx={{ mr: 1 }} variant="outlined" startIcon={<HelpOutlineIcon />}>
        {t('footerButtons.help')}
      </Button>
      <IconButton onClick={() => onBackIconClick()} color="secondary">
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Button
        sx={{ float: 'right' }}
        variant="contained"
        onClick={() => dispatch(increment())}
      >
        {t('footerButtons.saveAndProceed')}
      </Button>
      <Button
        variant="outlined"
        name="send"
        sx={{ float: 'right', mr: 1 }}
        onClick={() => dispatch(increment())}
      >
        {t('footerButtons.save')}
      </Button>
    </Box>
  )
}
