/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import {
  Button,
  IconButton,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import { decrement, increment } from 'features/appManagement/slice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function BetaTest() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [betaTestNotification, setBetaTestNotification] = useState(false)

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
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button variant="outlined" name="send" sx={{ float: 'right', mr: 1 }}>
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </>
  )
}
