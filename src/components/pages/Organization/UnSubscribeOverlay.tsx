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
} from '@catena-x/portal-shared-components'
import Box from '@mui/material/Box'
import { useFetchSubscriptionAppQuery } from 'features/apps/apiSlice'
import './Organization.scss'
import { SubscriptionStatus } from 'features/apps/types'

interface UnSubscribeOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  loading?: boolean
  subscriptionId: string
  appId: string
  enableErrorMessage: boolean
}

const UnSubscribeOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
  subscriptionId,
  appId,
  enableErrorMessage,
}: UnSubscribeOverlayProps) => {
  const { t } = useTranslation()
  const { data } = useFetchSubscriptionAppQuery({ appId, subscriptionId })
  const [checkBoxSelected, setCheckBoxSelected] = useState<boolean>(false)
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
          <DialogHeader
            title={t('content.organization.unsubscribe.title')}
            intro={`For ${data?.name}`}
          />
          <DialogContent>
            <Typography variant="body3">
              {t('content.organization.unsubscribe.descriptionNote')}
            </Typography>
            <Typography variant="body3">
              {t('content.organization.unsubscribe.description')}
            </Typography>
            <Box sx={{ mt: '20px' }}>
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
                      t('content.organization.unsubscribe.table.status'),
                      data?.offerSubscriptionStatus ===
                      SubscriptionStatus.ACTIVE
                        ? t('content.organization.unsubscribe.subscribed')
                        : '',
                    ],
                    [
                      t('content.organization.unsubscribe.table.connector'),
                      data?.connectorData[0]?.name ?? '',
                    ],
                    [
                      t('content.organization.unsubscribe.table.techUser'),
                      data?.technicalUserData[0]?.name ?? '',
                    ],
                  ],
                }}
                horizontal={false}
              />
            </Box>
            <Box
              sx={{
                alignContent: 'left',
                display: 'grid',
                padding: '44px 0 12px 0',
              }}
            >
              <Checkbox
                label={t('content.organization.unsubscribe.checkBoxLabel')}
                checked={checkBoxSelected}
                onClick={() => {
                  setCheckBoxSelected(!checkBoxSelected)
                }}
              />
              <Typography variant="body2" sx={{ ml: 4 }}>
                {t('content.organization.unsubscribe.checkBoxLabelDescription')}
              </Typography>
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
                  disabled={!checkBoxSelected}
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
