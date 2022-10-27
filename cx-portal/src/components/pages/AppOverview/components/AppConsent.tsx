/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Typography } from 'cx-portal-shared-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

export default function AppConsent({ agreements }: { agreements: any }) {
  return (
    <>
      {agreements &&
        agreements.map((agreement: any) => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent: 'center',
                paddingTop: '10px',
                alignItems: 'center',
              }}
            >
              {agreement.consentStatus !== '' ? (
                <CheckCircleIcon sx={{ fontSize: 36 }} color="warning" />
              ) : (
                <ErrorIcon sx={{ fontSize: 36 }} color="warning" />
              )}
              <Typography
                variant="h1"
                align="left"
                sx={{ paddingLeft: '25px', fontSize: '18px' }}
              >
                {agreement.name}
              </Typography>
            </div>
          )
        })}
    </>
  )
}
