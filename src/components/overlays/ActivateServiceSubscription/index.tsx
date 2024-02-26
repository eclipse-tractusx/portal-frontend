/********************************************************************************
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
  DialogHeader,
  LoadingButton,
  StaticTable,
  type TableType,
  Typography,
} from '@catena-x/portal-shared-components'
import { Trans, useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import './style.scss'
import { Box } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import {
  type ActivateSubscriptionResponse,
  useActivateSubscriptionMutation,
  useFetchServiceTechnicalUserProfilesQuery,
} from 'features/serviceManagement/apiSlice'
import { Link } from 'react-router-dom'

const ProfileHelpURL =
  '/documentation/?path=user%2F05.+Service%28s%29%2F03.+Service+Subscription%2F01.+Service+Subscription.md'

export default function ActivateserviceSubscription({
  offerId,
  subscriptionId,
  isTechUser,
  companyName,
  handleOverlayClose,
}: {
  offerId: string
  subscriptionId: string
  isTechUser: boolean
  companyName: string
  handleOverlayClose: () => void
}) {
  const { t } = useTranslation('servicerelease')
  const [loading, setLoading] = useState(false)
  const [activationResponse, setActivationResponse] = useState<boolean>(false)
  const [techUserInfo, setTechuserInfo] =
    useState<ActivateSubscriptionResponse>()
  const { data } = useFetchServiceTechnicalUserProfilesQuery(offerId, {
    refetchOnMountOrArgChange: true,
  })
  const [subscribe] = useActivateSubscriptionMutation()

  const techUserProfiles = useMemo(
    () =>
      data &&
      data?.length > 0 &&
      data[0]?.userRoles.map((i: { roleName: string }) => i.roleName),
    [data]
  )

  const handleConfrim = async () => {
    setLoading(true)
    try {
      const result = await subscribe({
        requestId: subscriptionId,
        offerUrl: 'https://testonly.google.de|https://testonly.google.de/',
      }).unwrap()
      setActivationResponse(true)
      setTechuserInfo(result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const tableData: TableType = {
    head: [t('serviceSubscription.activation.tableheader'), ''],
    body: [
      [
        t('serviceSubscription.activation.userId'),
        techUserInfo?.technicalUserInfo.technicalClientId ?? '',
      ],
      [
        t('serviceSubscription.activation.sercret'),
        techUserInfo?.technicalUserInfo.technicalUserSecret ?? '',
      ],
      [
        t('serviceSubscription.activation.url'),
        techUserInfo?.clientInfo?.clientUrl ?? 'n/a',
      ],
      [
        t('serviceSubscription.activation.technicaluserType'),
        techUserInfo?.technicalUserInfo.technicalUserPermissions.join(', ') ??
          '',
      ],
    ],
    edit: [
      [
        {
          icon: false,
        },
        {
          icon: false,
        },
      ],
      [
        {
          icon: false,
        },
        {
          icon: false,
          copyValue: techUserInfo?.technicalUserInfo.technicalUserSecret,
        },
      ],
    ],
  }

  return (
    <Dialog
      open={true}
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '45%',
        },
      }}
    >
      {activationResponse && (
        <div className="activation">
          <DialogHeader
            title={
              <>
                <CheckCircleOutlineOutlinedIcon color="success" />{' '}
                {t('serviceSubscription.activation.title')}
              </>
            }
            intro={t('serviceSubscription.activation.subtitle') + companyName}
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
                  company: companyName,
                }}
              >
                <Typography variant="body2">
                  {isTechUser
                    ? t(
                        'serviceSubscription.activation.successDescriptionWithTechUser'
                      )
                    : t('serviceSubscription.activation.successDescription')}
                </Typography>
              </Trans>
            </Box>
            <StaticTable data={tableData} horizontal={false} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleOverlayClose()
              }}
            >
              {t('serviceSubscription.activation.close')}
            </Button>
          </DialogActions>
        </div>
      )}
      {!activationResponse && (
        <>
          <DialogHeader
            title={t('serviceSubscription.register.title')}
            intro={t('serviceSubscription.register.subtitle') + companyName}
            closeWithIcon={false}
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
                  company: companyName,
                }}
              >
                <Typography variant="body2">
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
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                      {t('serviceSubscription.register.technicalUserDetails')}
                    </Typography>

                    <Typography variant="body2">
                      {t('serviceSubscription.register.sectionDescription')}
                    </Typography>
                  </Box>
                  <Link to={ProfileHelpURL} target="_blank">
                    <Typography variant="body2" className="helpText">
                      <HelpOutlineIcon />
                      {t('serviceSubscription.register.help')}
                    </Typography>
                  </Link>
                  <Box
                    sx={{
                      marginTop: '30px',
                    }}
                  >
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                      {t('serviceSubscription.register.sectionHeader')}
                    </Typography>
                    {techUserProfiles && techUserProfiles?.length > 0 ? (
                      <Typography variant="body2">
                        {techUserProfiles.join(', ')}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {t('serviceSubscription.register.loading')}
                      </Typography>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleOverlayClose()
              }}
            >
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
                onButtonClick={() => {
                  // do nothing
                }}
                sx={{ marginLeft: '10px' }}
              />
            ) : (
              <Button variant="contained" onClick={() => handleConfrim()}>
                {t('serviceSubscription.register.confirm')}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
