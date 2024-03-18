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

import { Trans, useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from '@catena-x/portal-shared-components'
import { useFetchOperatorBpnQuery } from 'features/connector/connectorApiSlice'
import { getCentralIdp, getMiwBase } from 'services/EnvironmentService'
import './EdcConnector.scss'

interface ConfigurationDetailsOverlayProps {
  openDialog: boolean
  handleOverlayClose: () => void
}

const ConfigurationDetailsOverlay = ({
  openDialog = false,
  handleOverlayClose,
}: ConfigurationDetailsOverlayProps) => {
  const { t } = useTranslation()
  const { data } = useFetchOperatorBpnQuery()

  return (
    <div className="detailsOverlay">
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: '45%',
        }}
      >
        <DialogHeader
          title={t('content.edcconnector.configurationDetails.title')}
          intro={t('content.edcconnector.configurationDetails.description')}
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
          <Typography
            variant="body1"
            sx={{
              marginBottom: '10px',
            }}
          >
            {t('content.edcconnector.configurationDetails.orderList.title')}
          </Typography>
          <Trans
            values={{
              env: t(getCentralIdp()),
            }}
          >
            <Typography variant="body2" className="detailsBodyText">
              {t(
                'content.edcconnector.configurationDetails.orderList.centralAuth'
              )}
            </Typography>
          </Trans>

          <Typography variant="body2" className="detailsBodyText">
            {t('content.edcconnector.configurationDetails.orderList.clientId')}{' '}
            <span
              className="detailsBodyLink"
              onClick={() =>
                window.open(
                  t(
                    'content.edcconnector.configurationDetails.orderList.clientSecretLink'
                  ),
                  '_blank'
                )
              }
              onKeyUp={() => {
                // do nothing
              }}
            >
              {t(
                'content.edcconnector.configurationDetails.orderList.clickhere'
              )}
            </span>
          </Typography>
          <Typography variant="body2" className="detailsBodyText">
            {t(
              'content.edcconnector.configurationDetails.orderList.clientSecret'
            )}{' '}
            <span
              className="detailsBodyLink"
              onClick={() =>
                window.open(
                  t(
                    'content.edcconnector.configurationDetails.orderList.clientSecretLink'
                  ),
                  '_blank'
                )
              }
              onKeyUp={() => {
                // do nothing
              }}
            >
              {t(
                'content.edcconnector.configurationDetails.orderList.clickhere'
              )}
            </span>
          </Typography>
          {data && (
            <Trans
              values={{
                bpn: data[0]?.bpn,
              }}
            >
              <Typography variant="body2" className="detailsBodyText">
                {t(
                  'content.edcconnector.configurationDetails.orderList.authorityBpn'
                )}
              </Typography>
            </Trans>
          )}
          <Trans
            values={{
              managedIdentityWalletApiBase: t(getMiwBase()),
            }}
          >
            <Typography variant="body2" className="detailsBodyText">
              {t('content.edcconnector.configurationDetails.orderList.miwUrl')}
            </Typography>
          </Trans>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ConfigurationDetailsOverlay
