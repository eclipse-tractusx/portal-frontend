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
  Chip,
  IconButton,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import {
  appIdSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useFetchAppStatusQuery } from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'

export default function BetaTest() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [betaTestNotification, setBetaTestNotification] = useState(false)
  const appId = useSelector(appIdSelector)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  return (
    <>
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.betaTest.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.betaTest.headerDescription')}
          </Typography>
        </Grid>
      </Grid>

      <form className="header-description">
        <Typography variant="h4" mb={5}>
          {t('content.apprelease.betaTest.betaTests')}
        </Typography>
        <Grid container sx={{ mt: 0 }}>
          <Grid item md={3}>
            <img
              src="/teaser.png"
              alt="idp teaser"
              height="164px"
              width="164px"
              style={{ borderRadius: '16px' }}
            />
          </Grid>
          <Grid item md={8} marginLeft="20px">
            <div style={{ display: 'flex' }}>
              <Typography variant="h4">
                {t(`content.apprelease.betaTest.technicalIntegrationTest`)}
              </Typography>
              <Chip
                key={1}
                label={'Available Soon'}
                withIcon={false}
                type="plain"
                variant="filled"
                color="label"
                sx={{ ml: 5 }}
              />
            </div>
            <Typography variant="body2" marginTop="16px">
              {t(
                `content.apprelease.betaTest.technicalIntegrationTestDescription`
              )}
            </Typography>
            <a href="/" style={{ display: 'flex', marginTop: '28px' }}>
              <ArrowForwardIcon fontSize="small" /> Open test overview
            </a>
          </Grid>
        </Grid>
      </form>
      <Box mb={2}>
        {betaTestNotification && (
          <Grid container xs={12} sx={{ mb: 2 }}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <PageNotifications
                title={t('content.apprelease.appReleaseForm.error.title')}
                description={t(
                  'content.apprelease.appReleaseForm.error.message'
                )}
                open
                severity="error"
                onCloseNotification={() => setBetaTestNotification(false)}
              />
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
          sx={{ mr: 1 }}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton onClick={() => dispatch(decrement())} color="secondary">
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{ float: 'right' }}
          onClick={() => dispatch(increment())}
        >
          {t('content.apprelease.footerButtons.proceed')}
        </Button>
      </Box>
    </>
  )
}
