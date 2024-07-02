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
import { Box } from '@mui/material'
import { statusSelector } from 'features/companyData/slice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { SharingStateStatusType } from 'features/companyData/companyDataApiSlice'

export default function StatusInformation() {
  const { t } = useTranslation()
  const status = useSelector(statusSelector)

  const statusIcon: Record<string, JSX.Element> = {
    Success: <CheckCircleIcon />,
    Pending: <HourglassBottomIcon />,
    Ready: <HourglassBottomIcon />,
    Initial: <HourglassBottomIcon />,
    Error: <WarningAmberIcon />,
  }

  const getStatusColor = (status: string | undefined) => {
    if (status === SharingStateStatusType.Success) {
      return 'success'
    } else if (
      status === SharingStateStatusType.Pending ||
      status === SharingStateStatusType.Initial
    ) {
      return 'warning'
    } else {
      return 'error'
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: '50px',
        padding: '0px 10%',
        marginTop: '50px',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '18px',
          width: '200px',
        }}
      >
        {t('content.companyData.statusInfo.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '20%',
        }}
      >
        <Chip
          icon={statusIcon[status]}
          color={getStatusColor(status)}
          variant="filled"
          label={status}
          size="medium"
          withIcon={true}
          sx={{
            marginRight: '0 !important',
            margin: '0 auto',
            width: '100px',
            maxWidth: '100px',
          }}
        />
      </Box>
    </Box>
  )
}
