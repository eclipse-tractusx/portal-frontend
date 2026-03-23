/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import {
  CredentialSubjectStatus,
  type WalletContent,
} from 'features/compayWallet/companyWalletApiSlice'

export default function WalletActivationInfo({
  wallet,
}: {
  readonly wallet: WalletContent
}): JSX.Element {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<{
    info: string
    message: string
    icon: JSX.Element
  }>()

  const status = wallet?.status === CredentialSubjectStatus.ACTIVE

  useEffect(() => {
    if (status) {
      setCurrent({
        info: t('content.companyWallet.activate'),
        message: t('content.companyWallet.activateDescription'),
        icon: (
          <CheckCircleOutlineIcon
            style={{
              color: '#00AA55',
              height: '24px',
              width: '24px',
            }}
          />
        ),
      })
    } else {
      setCurrent({
        info: t('content.companyWallet.inactive'),
        message: t('content.companyWallet.inactiveDescription'),
        icon: (
          <ReportProblemIcon
            style={{
              color: '#FF532F',
              height: '24px',
              width: '24px',
            }}
          />
        ),
      })
    }
  }, [status])

  return (
    <Box
      className="new-container"
      sx={{
        border: status ? '1px solid #00AA55' : '1px solid #FF532F',
      }}
    >
      {current != null && (
        <div className="status-container">
          <div className="info">
            {current.icon}
            <Typography
              variant="body1"
              sx={{
                color: status ? '#00AA55' : '#FF532F',
                paddingLeft: '10px',
                fontWeight: '600',
              }}
            >
              {current.info}
            </Typography>
          </div>
          <Typography variant="body1">{current.message}</Typography>
        </div>
      )}
    </Box>
  )
}
