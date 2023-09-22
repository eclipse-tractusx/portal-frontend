/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
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

import { Typography, CustomAccordion } from '@catena-x/portal-shared-components'
import type {
  ShellDescriptor,
  SubmodelDescriptors,
} from 'features/digitalTwins/types'
import { DetailGrid } from '../../shared/basic/DetailGrid'
import { Grid, Box, Divider, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const TwinDetails = ({ twin }: { twin: ShellDescriptor }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const getDesciption = (elem: ShellDescriptor | SubmodelDescriptors) => (
    <Typography sx={{ mb: 3, typography: 'body3' }}>
      {elem.description[0]
        ? elem.description[0].text
        : t('content.digitaltwin.detail.no_description')}
    </Typography>
  )

  const hasSubmodels = () => twin.submodelDescriptors.length > 0

  const primaryContent = (
    <>
      {getDesciption(twin)}
      {hasSubmodels() && (
        <>
          {twin.submodelDescriptors.length > 0 && (
            <DetailGrid
              topic={t('content.digitaltwin.detail.submodel_endpoints')}
              content={twin.submodelDescriptors.length}
            />
          )}
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <Typography sx={{ mb: 3, typography: 'label2' }}>
            {t('content.digitaltwin.detail.assetId')}
          </Typography>
          {twin.specificAssetIds.map((saId, index) => (
            <Box key={saId.key}>
              <DetailGrid
                topic={t('content.digitaltwin.detail.key')}
                content={saId.key}
              />
              <DetailGrid
                topic={t('content.digitaltwin.detail.value')}
                content={saId.value}
              />
              {saId.semanticId && (
                <>
                  <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                  <DetailGrid
                    topic={t('content.digitaltwin.detail.semanticid')}
                    content={saId.semanticId.value.join(', ')}
                  />
                </>
              )}
              {index + 1 !== twin.specificAssetIds.length && (
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
              )}
            </Box>
          ))}
        </>
      )}
    </>
  )

  const secondaryContent = (
    subModel: SubmodelDescriptors,
    semId: string,
    idKey: string
  ) => (
    <>
      {getDesciption(subModel)}
      <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
      <DetailGrid
        topic={t('content.digitaltwin.detail.semanticid')}
        link={{
          pathname: `/semantichub/${encodeURIComponent(semId)}`,
          state: semId,
        }}
        content={semId}
      />
      <Divider sx={{ mr: -2, ml: -2 }} />
      <Grid
        container
        sx={{
          width: `calc(100% + ${theme.spacing(4)})`,
          m: `0 -${theme.spacing(2)}`,
          p: 2,
          typography: 'label3',
          bgcolor: 'background.background09',
        }}
      >
        <Grid item xs={12}>
          {t('content.digitaltwin.detail.endpoints')}
        </Grid>
      </Grid>
      {subModel.endpoints.map((endpoint, indexEndpoint) => (
        <Box key={`${idKey}_${endpoint.interface}_${indexEndpoint}`}>
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.digitaltwin.detail.interface')}
            content={endpoint.interface}
          />
          <DetailGrid
            topic={t('content.digitaltwin.detail.protocol')}
            content={endpoint.protocolInformation.endpointProtocol}
          />
          <DetailGrid
            topic={t('content.digitaltwin.detail.protocol_endpoint')}
            content={endpoint.protocolInformation.endpointAddress}
          />
          <DetailGrid
            topic={t('content.digitaltwin.detail.protocol_version')}
            content={endpoint.protocolInformation.endpointProtocolVersion}
          />
        </Box>
      ))}
    </>
  )

  const accordionItems = () => {
    let items = [
      {
        title: twin.idShort,
        id: 'panel1',
        expanded: true,
        color: 'background.background09',
        children: primaryContent,
      },
    ]
    if (hasSubmodels()) {
      twin.submodelDescriptors.forEach((subModel, indexSubmodel) => {
        const idKey = `${subModel.idShort}_${indexSubmodel}`
        const item = {
          title: subModel.idShort,
          id: idKey,
          expanded: false,
          children: secondaryContent(
            subModel,
            subModel.semanticId.value[0],
            idKey
          ),
          color: '',
        }
        items.push(item)
      })
    }
    return items
  }

  return <CustomAccordion items={accordionItems()} />
}
