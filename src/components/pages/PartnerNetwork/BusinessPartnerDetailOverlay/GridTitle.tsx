/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { Grid, useTheme } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'

const GridTitle = ({ title }: { title: string }) => {
  const theme = useTheme()
  const { spacing } = theme

  return (
    <Grid
      xs={12}
      item
      style={{
        backgroundColor: theme.palette.grey['100'],
        padding: spacing(2),
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </Grid>
  )
}

export default GridTitle
