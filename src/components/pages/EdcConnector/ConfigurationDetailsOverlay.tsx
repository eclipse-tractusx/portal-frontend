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

import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from '@catena-x/portal-shared-components'
import { useFetchDecentralIdentityUrlsQuery } from 'features/connector/connectorApiSlice'
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
  const { data } = useFetchDecentralIdentityUrlsQuery()

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
          <Typography variant="body2" className="detailsBodyText">
            <b>
              {t(
                'content.edcconnector.configurationDetails.section.part1.title'
              )}
            </b>
            {t(
              'content.edcconnector.configurationDetails.section.part1.description'
            )}
            <span
              className="detailsBodyLink"
            >
              {data?.decentralIdentityManagementAuthUrl}
            </span>
          </Typography>
          <Typography variant="body2" className="detailsBodyText">
            <b>
              {t(
                'content.edcconnector.configurationDetails.section.part2.title'
              )}
            </b>
            {t(
              'content.edcconnector.configurationDetails.section.part2.description1'
            )}
            <span
              className="detailsBodyLink"
              style={{
                textDecoration: 'underline',
              }}
              onClick={() => window.open('/technicaluser', '_blank')}
              onKeyUp={() => {
                // do nothing
              }}
            >
              {t('content.edcconnector.configurationDetails.section.part2.key')}
            </span>
            {t(
              'content.edcconnector.configurationDetails.section.part2.description2'
            )}
          </Typography>
          <Typography variant="body2" className="detailsBodyText">
            <b>
              {t(
                'content.edcconnector.configurationDetails.section.part3.title'
              )}
            </b>
            {t(
              'content.edcconnector.configurationDetails.section.part3.description'
            )}
            <span
              className="detailsBodyLink"
              style={{
                textDecoration: 'underline',
              }}
              onClick={() => window.open('/technicaluser', '_blank')}
              onKeyUp={() => {
                // do nothing
              }}
            >
              {t('content.edcconnector.configurationDetails.section.part3.key')}
            </span>
          </Typography>
          <Typography variant="body2" className="detailsBodyText">
            <b>
              {t(
                'content.edcconnector.configurationDetails.section.part4.title'
              )}
            </b>
            {t(
              'content.edcconnector.configurationDetails.section.part4.description'
            )}
            <span
              className="detailsBodyLink"
            >
              {data?.decentralIdentityManagementServiceUrl}
            </span>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ConfigurationDetailsOverlay
