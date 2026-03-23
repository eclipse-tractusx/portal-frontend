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

import {
  Button,
  Chip,
  IconButton,
  PageNotifications,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import {
  appIdSelector,
  appRedirectStatusSelector,
  decrement,
  increment,
  setAppRedirectStatus,
} from 'features/appManagement/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useFetchAppStatusQuery } from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { getAssetBase } from 'services/EnvironmentService'
import { isStepCompleted } from '../AppStepHelper'

export default function BetaTest() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const hasDispatched = useRef(false)
  const [betaTestNotification, setBetaTestNotification] = useState(false)
  const appId = useSelector(appIdSelector)
  const appRedirectStatus = useSelector(appRedirectStatusSelector)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  const onBackIconClick = () => {
    dispatch(setAppRedirectStatus(false))
    dispatch(decrement())
  }

  useEffect(() => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  useEffect(() => {
    if (hasDispatched.current) return
    if (
      fetchAppStatus &&
      isStepCompleted(fetchAppStatus, 5, appRedirectStatus)
    ) {
      hasDispatched.current = true
    }
  }, [fetchAppStatus, hasDispatched])

  return (
    <>
      <ReleaseStepHeader
        title={t('content.apprelease.betaTest.headerTitle')}
        description={t('content.apprelease.betaTest.headerDescription')}
      />
      <form className="header-description">
        <Typography variant="h4" mb={5}>
          {t('content.apprelease.betaTest.betaTests')}
        </Typography>
        <Grid container sx={{ mt: 0 }}>
          <Grid item md={3}>
            <img
              src={`${getAssetBase()}/images/content/teaser.png`}
              alt="idp teaser"
              height="164px"
              width="164px"
              style={{ borderRadius: '16px' }}
            />
          </Grid>
          <Grid item md={8} marginLeft="20px">
            <div style={{ display: 'flex' }}>
              <Typography variant="h4">
                {t('content.apprelease.betaTest.technicalIntegrationTest')}
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
                'content.apprelease.betaTest.technicalIntegrationTestDescription'
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
                onCloseNotification={() => {
                  setBetaTestNotification(false)
                }}
              />
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
          sx={{ mr: 1 }}
          onClick={() =>
            window.open(
              '/documentation/?path=user%2F04.+App%28s%29%2F02.+App+Release+Process',
              '_blank'
            )
          }
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton onClick={onBackIconClick} color="secondary">
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
