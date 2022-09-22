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
import uniqueId from 'lodash/uniqueId'
import { Button } from '../../Button'
import { Typography } from '../../Typography'
import { SelectedTag } from './SelectedTag'
import { TagSizeType } from '..'

interface SelectAddMoreProps {
  selected: any[]
  buttonAddMore: string
  notItemsText: string
  label: string
  keyTitle: string
  margin?: 'normal' | 'none' | 'dense'
  tagSize?: TagSizeType
  handleShowItems: () => void
}

export const SelectAddMore = ({
  selected,
  buttonAddMore,
  notItemsText,
  label,
  keyTitle,
  margin,
  tagSize,
  handleShowItems,
}: SelectAddMoreProps) => {
  const marginTop = margin === 'normal' ? '16px' : '8px'
  return (
    <Box>
      <Typography
        variant="label3"
        fontSize="14px"
        fontWeight="400"
        sx={{
          marginBottom: '10px',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: margin === 'none' ? '' : marginTop,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '80%',
          }}
        >
          {selected.length > 0 ? (
            selected.map((item: any) => (
              <SelectedTag
                title={item[keyTitle]}
                size={tagSize}
                key={uniqueId(item[keyTitle])}
              />
            ))
          ) : (
            <Typography
              variant="body1"
              fontSize="18px"
              sx={{
                height: 'fit-content',
                paddingTop: '3px',
                width: 'max-content',
              }}
            >
              {notItemsText}
            </Typography>
          )}
        </Box>
        <Box sx={{ height: '40px', width: '20%' }}>
          <Button
            sx={{ width: 'fit-content', float: 'right' }}
            size={tagSize}
            color="secondary"
            onClick={() => handleShowItems()}
          >
            {buttonAddMore}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
