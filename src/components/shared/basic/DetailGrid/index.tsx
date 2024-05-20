/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

interface DetailGridProps {
  topic: string
  content: string | number
  link?: string
}
export const DetailGrid = ({ topic, content, link }: DetailGridProps) => {
  return (
    <Grid container sx={{ mb: 2, typography: 'body3' }}>
      <Grid item xs={6}>
        {topic}
      </Grid>
      <Grid item xs={6} sx={{ overflowWrap: 'anywhere' }}>
        {link ? <Link to={link}>{content}</Link> : content}
      </Grid>
    </Grid>
  )
}
