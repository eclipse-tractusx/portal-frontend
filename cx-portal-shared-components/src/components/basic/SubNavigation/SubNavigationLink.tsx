/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import { Box } from '@mui/material'
import { SubNavigationProps } from '.'
import { Button } from '../Button'
import EastIcon from '@mui/icons-material/East'

export const SubNavigationLink = ({
  link1Label,
  onLink1Click,
  link2Label,
  onLink2Click,
}: SubNavigationProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'fit-content',
        width: '60%',
        margin: '32px 0px',
      }}
    >
      <Box sx={{ width: '50%' }}>
        {link1Label && onLink1Click && (
          <>
            <Button
              onClick={onLink1Click}
              color="secondary"
              variant="text"
              size="medium"
            >
              <EastIcon sx={{ marginRight: '16px' }} />
              {link1Label}
            </Button>
          </>
        )}
      </Box>

      <Box sx={{ width: '50%' }}>
        {link2Label && onLink2Click && (
          <Button
            onClick={onLink2Click}
            color="secondary"
            variant="text"
            size="medium"
          >
            <EastIcon sx={{ marginRight: '16px' }} />
            {link2Label}
          </Button>
        )}
      </Box>
    </Box>
  )
}
