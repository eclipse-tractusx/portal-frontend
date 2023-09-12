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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  CircleProgress,
  Typography,
  Checkbox,
  StaticTable,
} from '@catena-x/portal-shared-components'
import Box from '@mui/material/Box'
import { useFetchSubscriptionAppQuery } from 'features/apps/apiSlice'
import './Organization.scss'

interface UnSubscribeOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  loading?: boolean
  subscriptionId: string
  appId: string
}

const UnSubscribeOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
  subscriptionId,
  appId,
}: UnSubscribeOverlayProps) => {
  const { t } = useTranslation()
  const { data } = useFetchSubscriptionAppQuery({ appId, subscriptionId })
  const [checkBoxSelected, setCheckBoxSelected] = useState<boolean>(false)
  console.log(data)
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
        <DialogHeader title={t('content.organization.unsubscribe.title')} />
        <DialogContent
          sx={{
            textAlign: 'center',
            marginBottom: '25px',
            paddingTop: '0px',
          }}
        >
          {t('content.organization.unsubscribe.description')}

          <Box className="noteBox">
            <Typography className="noteText" variant="body2">
              {t('content.organization.unsubscribe.note')}
            </Typography>
          </Box>
          <Box className="detailsTable">
            <StaticTable
              data={{
                head: [
                  t('content.organization.unsubscribe.table.app'),
                  t('content.organization.unsubscribe.table.status'),
                  t('content.organization.unsubscribe.table.connector'),
                  t('content.organization.unsubscribe.table.techUser'),
                ],
                body: [
                  [data?.name || ''],
                  [data?.offerSubscriptionStatus || ''],
                  [data?.technicalUserData[0]?.name || ''],
                  [data?.connectorData[0]?.name || ''],
                ],
              }}
              horizontal={true}
            />
          </Box>
          <Box
            sx={{
              marginTop: '50px',
            }}
          >
            <Checkbox
              label={t('content.organization.unsubscribe.checkBoxLabel')}
              checked={checkBoxSelected}
              onClick={() => setCheckBoxSelected(!checkBoxSelected)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={(e) => handleOverlayClose(e)}>
            {t('global.actions.cancel')}
          </Button>
          {!loading && (
            <Button
              variant="contained"
              disabled={!checkBoxSelected}
              onClick={(e) => handleConfirmClick(e)}
            >
              {t('content.organization.unsubscribe.buttonText')}
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
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UnSubscribeOverlay
