/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import * as React from 'react'
import Box from '@mui/material/Box'
import RatingUI from '@mui/material/Rating'

interface RatingContentProps {
  defaultRating: number
}

export const Rating = ({ defaultRating }: RatingContentProps) => {
  const [value, setValue] = React.useState<number | null>(defaultRating)
  return (
    <Box
      sx={{
        '& > legend': { mt: defaultRating },
      }}
    >
      <RatingUI
        name="half-rating"
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      />
    </Box>
  )
}
