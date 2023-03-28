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

import { Box, Typography, IconButton, useTheme } from '@mui/material'
import { CardChip, StatusVariants, Variants } from './CardChip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ApprovalIcon from '@mui/icons-material/Approval'

export interface AppContent {
  appId: string
  name: string
  provider: string
  status: Variants
}

export interface CardDecisionProps {
  items: AppContent[]
  onApprove: (e: string) => void
  onDelete: (e: string) => void
  onClick: (e: string) => void
}

export const CardDecision = ({
  items,
  onApprove,
  onDelete,
  onClick,
}: CardDecisionProps) => {
  const theme = useTheme()

  const handleDecision = (
    e: React.SyntheticEvent,
    id: string,
    type: string
  ) => {
    e.stopPropagation()
    type === 'approve' ? onApprove(id) : onDelete(id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        '-ms-flex-wrap': 'wrap',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginRight: '-10px',
        marginLeft: '-10px',
      }}
    >
      {items.map((item) => (
        <Box
          key={item.appId}
          sx={{
            paddingRight: '10px',
            paddingLeft: '10px',
            width: '270px',
            minWidth: '270px',
            marginBottom: '20px',
          }}
        >
          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 28px',
              width: 'auto',
              height: '200px',
              background: '#FFFFFF',
              border: '1px solid #DCDCDC',
              borderRadius: '20px',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0,
              cursor: 'pointer',
              ':hover': {
                boxShadow: theme.shadows['20'],
              },
            }}
            onClick={() => onClick(item.appId)}
          >
            <Typography
              variant="h5"
              sx={{
                height: '48px',
                '-webkit-line-clamp': '2',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="label2"
              sx={{
                color: '#999999',
                height: '48px',
              }}
            >
              {item.provider}
            </Typography>
            <Box sx={{ marginBottom: '10px' }}>
              <CardChip status={item.status} statusText={item.status} />
            </Box>
            {item.status?.toLowerCase() !== StatusVariants.active && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  sx={{
                    padding: '5px',
                    border: '1px solid #00AA55',
                    margin: '0 10px',
                    ':hover': {
                      boxShadow: '0px 0px 0px 3px rgb(41 184 112 / 40%)',
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={(e) => handleDecision(e, item.appId, 'approve')}
                >
                  <ApprovalIcon sx={{ color: '#00AA55' }} />
                </IconButton>
                <IconButton
                  sx={{
                    padding: '5px',
                    border: '1px solid #D91E18',
                    ':hover': {
                      boxShadow: '0px 0px 0px 3px rgb(217 30 24 / 40%)',
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={(e) => handleDecision(e, item.appId, 'delete')}
                >
                  <DeleteOutlineIcon sx={{ color: '#D91E18' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
