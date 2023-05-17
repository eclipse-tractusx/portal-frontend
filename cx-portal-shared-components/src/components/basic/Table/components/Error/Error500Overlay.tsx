/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { Box } from '@mui/material'
import { Typography } from '../../../Typography'
import RefreshIcon from '@mui/icons-material/Refresh'

const flexColumn = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}

export const Error500Overlay = ({ reload }: { reload: () => void }) => (
  <Box
    sx={{
      ...flexColumn,
      paddingTop: '10px',
    }}
  >
    <Typography
      sx={{
        paddingTop: '20px',
      }}
      variant="body2"
    >
      Load Failed. Reload
    </Typography>
    <div
      onClick={reload}
      style={{
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
      <RefreshIcon sx={{ fontSize: 40 }} color="primary" />
    </div>
  </Box>
)
