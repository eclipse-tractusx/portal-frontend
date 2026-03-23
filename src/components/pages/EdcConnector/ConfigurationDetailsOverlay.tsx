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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  StaticTable,
  type TableType,
  Typography,
  CircleProgress,
  ErrorBar,
} from '@arena2036/portal-shared-components-construct-x'
import { useFetchDecentralIdentityUrlsQuery } from 'features/connector/connectorApiSlice'
import './style.scss'
import { Box } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface ConfigurationDetailsOverlayProps {
  openDialog: boolean
  handleOverlayClose: () => void
}

const ConfigurationDetailsOverlay = ({
  openDialog = false,
  handleOverlayClose,
}: ConfigurationDetailsOverlayProps) => {
  const { t } = useTranslation()
  const { data, isFetching, error, isError, refetch } =
    useFetchDecentralIdentityUrlsQuery()

  // To-Do fix the type issue with status and data from FetchBaseQueryError
  // eslint-disable-next-line
  const decentralIdentityUrlsError = error as any

  const handleIconDisplay = (value: string | undefined) => {
    if (value) return true
    else return false
  }

  const tableData: TableType = {
    head: [
      'trusted_issuer:',
      'iatp.sts.oauth.token_url*:',
      'iatp.sts.oauth.client.id*:',
      'iatp.sts.oauth.client.secret_alias*:',
      'iatp.sts.dim.url*:',
      'participant_id:',
      'iatp.id:',
      'DID Resolver:',
    ],
    body: [
      [data?.trusted_issuer ?? ''],
      [data?.decentralIdentityManagementAuthUrl ?? ''],
      [t('content.edcconnector.configurationDetails.clientId') ?? ''],
      [t('content.edcconnector.configurationDetails.secret') ?? ''],
      [data?.decentralIdentityManagementServiceUrl ?? ''],
      [data?.participant_id ?? ''],
      [data?.iatp_id ?? ''],
      [data?.did_resolver ?? ''],
    ],
    copy: [
      [
        {
          icon: handleIconDisplay(data?.trusted_issuer),
          copyValue: data?.trusted_issuer ?? '',
        },
      ],
      [
        {
          icon: handleIconDisplay(data?.decentralIdentityManagementAuthUrl),
          copyValue: data?.decentralIdentityManagementAuthUrl ?? '',
        },
      ],
      [
        {
          icon: false,
        },
      ],
      [
        {
          icon: false,
        },
      ],
      [
        {
          icon: handleIconDisplay(data?.decentralIdentityManagementServiceUrl),
          copyValue: data?.decentralIdentityManagementServiceUrl ?? '',
        },
      ],
      [
        {
          icon: handleIconDisplay(data?.participant_id),
          copyValue: data?.participant_id ?? '',
        },
      ],
      [
        {
          icon: handleIconDisplay(data?.iatp_id),
          copyValue: data?.iatp_id ?? '',
        },
      ],
      [
        {
          icon: handleIconDisplay(data?.did_resolver),
          copyValue: data?.did_resolver ?? '',
        },
      ],
    ],
  }

  return (
    <div className="detailsOverlay">
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: '60%',
        }}
      >
        <DialogHeader
          title={t('content.edcconnector.configurationDetails.title')}
          intro={
            <Box
              sx={{
                textAlign: 'center',
                margin: '50px auto 20px',
                display: 'grid',
              }}
            >
              <Trans>
                <Typography variant="label3">
                  {t('content.edcconnector.configurationDetails.description')}
                </Typography>
              </Trans>
            </Box>
          }
          closeWithIcon={true}
          onCloseWithIcon={() => {
            handleOverlayClose()
          }}
        />
        <DialogContent
          sx={{
            padding: '0px 120px 40px 120px',
          }}
        >
          {isFetching ? (
            <div
              style={{
                width: '100%',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircleProgress
                colorVariant="primary"
                size={80}
                thickness={8}
                variant="indeterminate"
              />
            </div>
          ) : (
            <>
              {!isError ? (
                <StaticTable data={tableData} horizontal={true} />
              ) : (
                <ErrorBar
                  errorText={
                    decentralIdentityUrlsError.code >= 400 &&
                    decentralIdentityUrlsError.code < 500
                      ? t('error.description') +
                        ' ' +
                        t('error.additionalDescription')
                      : t('error.errorBar')
                  }
                  showButton={
                    decentralIdentityUrlsError.code >= 500 &&
                    decentralIdentityUrlsError.code < 600
                  }
                  buttonText={t('error.tryAgain')}
                  handleButton={refetch}
                />
              )}
              <Typography
                variant="label3"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#0088CC',
                  textDecoration: 'underline',
                  m: '36px auto',
                  fontWeight: 400,
                }}
              >
                <HelpOutlineIcon
                  sx={{
                    width: '22px',
                    height: '22px',
                    mr: '14px',
                  }}
                />
                {t('content.edcconnector.configurationDetails.learnMore')}
              </Typography>
              <Typography variant="body3">
                {' '}
                {t('content.edcconnector.configurationDetails.section.text1')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.configurationDetails.section.text2')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.configurationDetails.section.text3')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.configurationDetails.section.text4')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.configurationDetails.section.text5')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.configurationDetails.section.text6')}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleOverlayClose()
            }}
          >
            {t('global.actions.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfigurationDetailsOverlay
