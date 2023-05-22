/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
  Dialog,
  DialogActions,
  DialogContent,
  LoadingButton,
  Typography,
} from 'cx-portal-shared-components'
import { Trans, useTranslation } from 'react-i18next'
import { useState } from 'react'
import './style.scss'
import { CustomDialogHeader } from 'components/shared/basic/Dailog/CustomDialogHeader'
import { Box } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useFetchServiceTechnicalUserProfilesQuery } from 'features/serviceManagement/apiSlice'

export default function ActivateserviceSubscription({
  offerId,
  companyId,
  isTechUser,
  handleOverlayClose,
}: {
  offerId: string
  companyId: string
  isTechUser: boolean
  handleOverlayClose: () => void
}) {
  const { t } = useTranslation('servicerelease')
  const [loading, setLoading] = useState(false)
  const [activationResponse, setActivationResponse] = useState<boolean>(false)
  const { data } = useFetchServiceTechnicalUserProfilesQuery(offerId)

  const ActivationOverlay = () => (
    <div className="activation">
      <CustomDialogHeader
        title={t('serviceSubscription.activation.title')}
        icon={true}
        subtitle={
          t('serviceSubscription.activation.subtitle') + ' company name'
        }
        additionalContainerStyles={{
          display: 'flex',
          placeContent: 'flex-start',
          placeItems: 'center',
        }}
        additionalTitleStyles={{
          paddingLeft: '20px',
        }}
      />
      <DialogContent>
        <Box
          sx={{
            marginBottom: '40px',
            paddingLeft: '10px',
          }}
        >
          <Trans
            i18nKey={t(
              'serviceSubscription.activation.successDescriptionWithTechUser'
            )}
            values={{
              company: 'Catena-X',
            }}
          >
            <Typography sx={{ fontWeight: 600 }} variant="caption1">
              {isTechUser
                ? t(
                    'serviceSubscription.activation.successDescriptionWithTechUser'
                  )
                : t('serviceSubscription.activation.successDescription')}
            </Typography>
          </Trans>
        </Box>
        {isTechUser && (
          <>
            <Typography
              sx={{
                marginLeft: '10px',
              }}
              variant="h3"
            >
              {t('serviceSubscription.activation.tableheader')}
            </Typography>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {t('serviceSubscription.activation.userId')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">jkshdfskjd</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {t('serviceSubscription.activation.sercret')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">lksdfkladf</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {t('serviceSubscription.activation.url')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">lksdfkladf</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {t('serviceSubscription.activation.technicaluserType')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle1">lksdfkladf</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleOverlayClose()}>
          {t('serviceSubscription.activation.close')}
        </Button>
      </DialogActions>
    </div>
  )

  const RegisterOverlay = () => (
    <>
      <CustomDialogHeader
        title={t('serviceSubscription.register.title')}
        icon={false}
        subtitle={t('serviceSubscription.register.subtitle') + ' company name'}
        additionalContainerStyles={{
          display: 'flex',
          placeContent: 'flex-start',
          placeItems: 'center',
        }}
        additionalTitleStyles={{
          paddingLeft: '10px',
        }}
      />
      <DialogContent>
        <Box
          sx={{
            marginBottom: '40px',
            paddingLeft: '10px',
          }}
        >
          <Trans
            i18nKey={
              isTechUser
                ? t('serviceSubscription.register.descriptionWithTechUser')
                : t('serviceSubscription.register.description')
            }
            values={{
              company: 'Catena-X',
            }}
          >
            <Typography sx={{ fontWeight: 600 }} variant="caption1">
              {isTechUser
                ? t('serviceSubscription.register.descriptionWithTechUser')
                : t('serviceSubscription.register.description')}
            </Typography>
          </Trans>
          {isTechUser && (
            <>
              <Box
                sx={{
                  marginTop: '30px',
                }}
              >
                <Typography variant="h3" sx={{ marginBottom: '20px' }}>
                  {t('serviceSubscription.register.sectionHeader')}
                </Typography>
                <Typography variant="caption1">
                  {t('serviceSubscription.register.sectionDescription')}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: '30px',
                  display: 'flex',
                  placeItems: 'center',
                  placeContent: 'flex-start',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  window.open(
                    'https://portal.dev.demo.catena-x.net/documentation/?path=docs%2F05.+Service%28s%29%2F03.+Service+Subscription%2F01.+Service+Subscription.md',
                    '_blank',
                    'noopener'
                  )
                }
              >
                <HelpOutlineIcon
                  sx={{
                    fontSize: '30px',
                    color: '#0f71cb',
                    marginRight: '10px',
                  }}
                />
                <Typography
                  variant="caption1"
                  sx={{ color: '#0f71cb', fontWeight: '600' }}
                >
                  {t('serviceSubscription.register.help')}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleOverlayClose()}>
          {t('serviceSubscription.register.close')}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="medium"
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => setActivationResponse(true)}
          >
            {t('serviceSubscription.register.confirm')}
          </Button>
        )}
      </DialogActions>
    </>
  )

  return (
    <>
      <Dialog
        open={true}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        {activationResponse && <ActivationOverlay />}
        {!activationResponse && <RegisterOverlay />}
      </Dialog>
    </>
  )
}
