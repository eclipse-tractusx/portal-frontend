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

import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  StaticTable,
  type TableType,
  Typography,
} from '@catena-x/portal-shared-components'
import { useFetchDecentralIdentityUrlsQuery } from 'features/connector/connectorApiSlice'
import './EdcConnector.scss'
import { Box } from '@mui/material'

interface ConfigurationDetailsOverlayProps {
  openDialog: boolean
  handleOverlayClose: () => void
}

const ConfigurationDetailsOverlay = ({
  openDialog = false,
  handleOverlayClose,
}: ConfigurationDetailsOverlayProps) => {
  const { t } = useTranslation()
  const { data } = useFetchDecentralIdentityUrlsQuery()

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
          icon: true,
          copyValue: data?.trusted_issuer ?? '',
        },
      ],
      [
        {
          icon: true,
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
          icon: true,
          copyValue: data?.decentralIdentityManagementServiceUrl ?? '',
        },
      ],
      [
        {
          icon: true,
          copyValue: data?.participant_id ?? '',
        },
      ],
      [
        {
          icon: true,
          copyValue: data?.iatp_id ?? '',
        },
      ],
      [
        {
          icon: true,
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
          title={
            <Typography variant="h3">
              {t('content.edcconnector.configurationDetails.title')}
            </Typography>
          }
          intro={
            <Box
              sx={{
                textAlign: 'center',
                margin: '50px auto 0px',
                display: 'grid',
              }}
            >
              <Typography variant="label3">
                {t('content.edcconnector.configurationDetails.description1')}
              </Typography>
              <Typography variant="label3">
                {t('content.edcconnector.configurationDetails.description2')}
              </Typography>
              <Typography variant="label3">
                {t('content.edcconnector.configurationDetails.description3')}
              </Typography>
              <Typography variant="label3">
                {t('content.edcconnector.configurationDetails.description4')}
              </Typography>
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
          <StaticTable data={tableData} horizontal={true} />

          <Typography variant="body3" sx={{ mt: 2 }}>
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
