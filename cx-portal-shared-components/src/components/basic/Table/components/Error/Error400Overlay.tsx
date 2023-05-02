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

import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { Box } from '@mui/material'
import { Typography } from '../../../Typography'

const flexRow = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingBottom: '20px',
}

const flexColumn = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}

export const Error400Overlay = () => (
  <Box
    sx={{
      ...flexRow,
    }}
  >
    <ReportProblemIcon
      sx={{ paddingRight: '20px', fontSize: 50 }}
      color="error"
    />
    <Box
      sx={{
        ...flexColumn,
        paddingTop: '20px',
      }}
    >
      <Typography variant="body2">
        Something went wrong. Please contact
      </Typography>
      <Typography variant="body2">your administrator</Typography>
    </Box>
  </Box>
)
