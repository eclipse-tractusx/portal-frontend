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

import { Typography } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { statusSelector } from 'features/companyData/slice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function StatusInformation() {
  const { t } = useTranslation()
  const status = useSelector(statusSelector)

  const statusIcon: Record<string, JSX.Element> = {
    Success: <CheckCircleIcon />,
    Pending: <HourglassBottomIcon />,
    Ready: <WarningAmberIcon />,
    Initial: <WarningAmberIcon />,
    Error: <WarningAmberIcon />,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: '50px',
        padding: '0px 10%',
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
        {statusIcon[status]}
        <Typography
          sx={{
            marginLeft: '10px',
          }}
          variant="body1"
        >
          {status}
        </Typography>
      </Box>
    </Box>
  )
}
