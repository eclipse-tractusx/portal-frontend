/********************************************************************************
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

import { Typography } from '@catena-x/portal-shared-components'
import './CompanyWallet.scss'
import smallLogo from '../../../assets/logo/cx-logo-short.svg'

export default function WalletCard(): JSX.Element {
  return (
    <div className="main-card-container">
      <div className="card-container">
        <div className="icon-text">
          <div>
            <img src={smallLogo} alt="jhgasjg12i" />
          </div>
          <Typography variant="body2">QE1231</Typography>
          <Typography variant="caption1">MKJHASDKHA</Typography>
        </div>
        <div>
          <Typography
            sx={{
              textAlign: 'left',
              color: '#ffffff',
            }}
            variant="body2"
          >
            dd.mm.yyyy
          </Typography>
        </div>
      </div>
    </div>
  )
}
