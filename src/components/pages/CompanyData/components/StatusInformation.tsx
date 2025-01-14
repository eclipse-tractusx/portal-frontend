/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Chip, Typography } from '@catena-x/portal-shared-components'
import { Box, List, ListItem } from '@mui/material'
import { statusSelector } from 'features/companyData/slice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import DoneIcon from '@mui/icons-material/Done'
import {
  SharingStateStatusType,
  type SharingStateType,
} from 'features/companyData/companyDataApiSlice'

import { statusColorMap } from 'utils/dataMapper'

export default function StatusInformation({
  error,
}: {
  readonly error?: SharingStateType
}) {
  const { t } = useTranslation()
  const status = useSelector(statusSelector)

  const statusIcon: Record<string, JSX.Element> = {
    Success: <DoneIcon />,
    Pending: <HourglassEmptyIcon />,
    Ready: <HourglassEmptyIcon />,
    Initial: <HourglassEmptyIcon />,
    Error: <ErrorOutlineIcon />,
  }
  const validationPoints: string[] = [
    'content.companyData.site.errorGroup.error1',
    'content.companyData.site.errorGroup.error2',
    'content.companyData.site.errorGroup.error3',
  ]
  const statusDisplayMap: Record<SharingStateStatusType, string> = {
    [SharingStateStatusType.Success]: 'Success',
    [SharingStateStatusType.Ready]: 'Ready',
    [SharingStateStatusType.Pending]: 'Processing',
    [SharingStateStatusType.Initial]: 'Processing',
    [SharingStateStatusType.Error]: 'Error',
    [SharingStateStatusType.Default]: '',
  }

  function filterStatus(status: string | undefined): string {
    return statusDisplayMap[status as SharingStateStatusType] ?? status
  }
  return (
    <>
      <Box
        className={'cx-company-data__details cx-company-data__details--status'}
      >
        <Box className={'cx-company-data__details--left'}>
          <Box className={'cx-company-data__details--heading'}>
            <Typography variant="body1">
              {t('content.companyData.statusInfo.title')}
            </Typography>
          </Box>
        </Box>
        <Box className={'cx-company-data__details--right'}>
          <Chip
            className={'cx-company-data__details--chip'}
            icon={statusIcon[status]}
            color={
              status
                ? statusColorMap[status as SharingStateStatusType]
                : 'error'
            }
            variant="filled"
            label={filterStatus(status)}
            size="medium"
            withIcon={true}
          />
          {error && (
            <Box className={'cx-company-data__errors'}>
              <Box className={'cx-company-data__errors--box'}>
                <Typography
                  className={'cx-company-data__errors--typography'}
                  variant="body1"
                >
                  {error.sharingErrorMessage}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {error && (
        <Box className={'cx-company-data__error-block'}>
          <Typography
            variant="body1"
            className={'cx-company-data__error-block--heading'}
          >
            <span className="error-note">
              {t('content.companyData.site.errorGroup.errorNote')}
            </span>
            <span className="error-desc">
              {t('content.companyData.site.errorGroup.errorDescription')}
            </span>
          </Typography>
          <List className={'cx-company-data__error-block--list'}>
            {validationPoints.map((point, index) => (
              <ListItem
                key={index}
                className={'cx-company-data__error-block--list-item'}
              >
                <Typography
                  className={'cx-company-data__error-block--typography'}
                  variant="body1"
                >
                  {t(point)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  )
}
