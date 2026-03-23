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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  Typography,
  Checkbox,
  StaticTable,
  LoadingButton,
} from '@arena2036/portal-shared-components-construct-x'
import Box from '@mui/material/Box'
import { useFetchSubscriptionAppQuery } from 'features/apps/apiSlice'
import './style.scss'
import { type SubscribeTechnicalUserData } from 'features/apps/types'
import {
  OfferSubscriptionStatus,
  useFetchSubscriptionServiceQuery,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import LoadingProgress from 'components/shared/basic/LoadingProgress'

interface UnSubscribeOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  loading?: boolean
  subscriptionId: string
  appId: string
  enableErrorMessage: boolean
  activeTab: number
}

const UnSubscribeOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
  subscriptionId,
  appId,
  enableErrorMessage,
  activeTab,
}: UnSubscribeOverlayProps) => {
  const { t } = useTranslation()
  const {
    data: appData,
    error: appError,
    isFetching: isAppFetching,
  } = useFetchSubscriptionAppQuery(
    { appId, subscriptionId },
    { skip: activeTab === 1 }
  )
  const {
    data: serviceData,
    error: serviceError,
    isFetching: isServiceFetching,
  } = useFetchSubscriptionServiceQuery(
    { serviceId: appId, subscriptionId },
    { skip: activeTab === 0 }
  )
  const [checkBoxSelected, setCheckBoxSelected] = useState<boolean>(false)

  const data = activeTab === 0 ? appData : serviceData

  const isFetching: boolean = isAppFetching ?? isServiceFetching

  // To-Do fix the type issue with status and data from FetchBaseQueryError
  // eslint-disable-next-line
  const error: any = activeTab === 0 ? appError : serviceError

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <div className="unsubscribeOverlay">
          <DialogHeader title={t('content.organization.unsubscribe.title')} />
          <DialogContent>
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '30px',
              }}
            >
              <Typography variant="body3">
                {error ? '' : `${data?.name}`}
              </Typography>
            </div>
            <Box sx={{ mt: '20px' }}>
              {isFetching ? (
                <div style={{ textAlign: 'center', margin: 30 }}>
                  <LoadingProgress />
                </div>
              ) : (
                <>
                  {error ? (
                    <Typography
                      variant="body2"
                      sx={{ ml: 0, textAlign: 'center' }}
                    >
                      {error.data.title}
                    </Typography>
                  ) : (
                    <>
                      <StaticTable
                        data={{
                          head: [
                            t(
                              'content.organization.unsubscribe.table.listOfConnectedObjects'
                            ),
                            '',
                          ],
                          body: [
                            [
                              t('content.organization.unsubscribe.table.app'),
                              data?.name ?? '',
                            ],
                            [
                              t(
                                'content.organization.unsubscribe.table.status'
                              ),
                              data?.offerSubscriptionStatus ===
                              OfferSubscriptionStatus.ACTIVE
                                ? t(
                                    'content.organization.unsubscribe.subscribed'
                                  )
                                : '',
                            ],
                            [
                              t(
                                'content.organization.unsubscribe.table.connector'
                              ),
                              data?.connectorData[0]?.name ?? '',
                            ],
                            [
                              t(
                                'content.organization.unsubscribe.table.techUser'
                              ),
                              data?.technicalUserData
                                ?.map(
                                  (userdata: SubscribeTechnicalUserData) =>
                                    userdata.name
                                )
                                .toString() ?? '',
                            ],
                          ],
                        }}
                        horizontal={false}
                      />
                      <Box
                        sx={{
                          alignContent: 'left',
                          display: 'grid',
                          padding: '44px 0 12px 0',
                        }}
                      >
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          <span style={{ fontWeight: 'bold' }}>
                            {t(
                              'content.organization.unsubscribe.checkBoxDescriptionAlert'
                            )}
                          </span>{' '}
                          {t(
                            'content.organization.unsubscribe.checkBoxLabelDescription'
                          )}
                        </Typography>

                        <Checkbox
                          label={t(
                            'content.organization.unsubscribe.checkBoxLabel'
                          )}
                          checked={checkBoxSelected}
                          onClick={() => {
                            setCheckBoxSelected(!checkBoxSelected)
                          }}
                        />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ display: 'block', textAlign: 'center' }}>
            {enableErrorMessage && (
              <Typography
                variant="label3"
                sx={{ color: '#D91E18', mb: 2, display: 'inline-block' }}
              >
                {t('content.organization.unsubscribe.unsubscribeError')}
              </Typography>
            )}
            <Box sx={{ display: loading ? 'inline-flex' : 'block' }}>
              <Button
                variant="outlined"
                onClick={(e) => {
                  handleOverlayClose(e)
                }}
                sx={{ textTransform: 'none' }}
              >
                {t('global.actions.cancel')}
              </Button>
              {loading ? (
                <LoadingButton
                  color="primary"
                  helperText=""
                  helperTextColor="success"
                  label=""
                  loadIndicator={t(
                    'content.organization.unsubscribe.unsubscriptionOnProgress'
                  )}
                  loading
                  size="medium"
                  onButtonClick={() => {
                    // do nothing
                  }}
                  sx={{ ml: 2, textTransform: 'none' }}
                />
              ) : (
                <Button
                  variant="contained"
                  disabled={!checkBoxSelected || error}
                  onClick={(e) => {
                    handleConfirmClick(e)
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  {t('content.organization.unsubscribe.buttonText')}
                </Button>
              )}
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default UnSubscribeOverlay
