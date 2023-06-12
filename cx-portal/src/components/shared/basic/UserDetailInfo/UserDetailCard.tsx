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

import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, List, ListItem } from '@mui/material'
import { Chip, IconButton, Typography } from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { OVERLAYS } from 'types/Constants'
import { useParams } from 'react-router-dom'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export type UserDetail = {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  bpn: string[]
  created: string
  company: string
  status: string
}

export interface UserCardProps {
  cardAction?: React.MouseEventHandler
  cardCategory?: string
  cardContentItems: UserItems
  variant?: 'wide'
}

interface UserItemsTranslation {
  label: string
  value: string | string[]
}

export interface UserItems {
  [key: string]: UserItemsTranslation | undefined
}

export const UserDetailCard = ({
  cardAction,
  cardCategory,
  cardContentItems,
  variant,
}: UserCardProps) => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const openEditOverlay = () => dispatch(show(OVERLAYS.ADD_BPN, userId))
  const [copied, setCopied] = useState<boolean>(false)

  const copyText = (value: any) => {
    setCopied(true)
    navigator.clipboard.writeText(value)
  }

  const renderValue = (
    value: UserItemsTranslation | undefined,
    param: string
  ) => (
    <>
      <strong>{value?.label}:</strong>&nbsp;
      <span
        style={{
          marginLeft: variant === 'wide' ? 'auto' : '',
          display: 'inline-grid',
        }}
      >
        {Array.isArray(value?.value)
          ? value?.value.map((bpn, i) => (
              <span key={i}>
                {bpn}
                <br />
              </span>
            ))
          : value?.value}
      </span>
      <span>
        {userId && value?.label === 'BPN' && (
          <EditIcon style={{ cursor: 'pointer' }} onClick={openEditOverlay} />
        )}
      </span>
      <span>
        {param === 'clientSecret' && (
          <ContentCopyIcon
            style={{ cursor: 'pointer' }}
            sx={{ marginLeft: '10px', color: copied ? '#44aa44' : '#cccccc' }}
            onClick={() => copyText(value?.value)}
          />
        )}
      </span>
    </>
  )

  const renderContentSwitch = (
    param: string,
    value: UserItemsTranslation | undefined
  ) =>
    param === 'status' ? (
      <>
        <span style={{ marginRight: '10px' }}>{value?.label} :</span>
        <Chip
          color="secondary"
          label={value?.value}
          type="plain"
          variant="filled"
          withIcon={false}
        />
      </>
    ) : (
      renderValue(value, param)
    )

  return (
    <Box>
      {cardCategory && (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'background.background09',
            display: 'flex',
            height: '55px',
            paddingLeft: '20px',
            paddingRight: '14px',
          }}
        >
          <Typography sx={{ typography: 'label3' }}>{cardCategory}</Typography>
          {cardAction && (
            <IconButton
              color="secondary"
              sx={{ marginLeft: 'auto' }}
              onClick={cardAction}
            >
              <EditOutlinedIcon />
            </IconButton>
          )}
        </Box>
      )}
      <List>
        {Object.entries(cardContentItems).map(([k, v], i) => (
          <ListItem
            key={i}
            disableGutters
            sx={{
              borderBottom: '1px solid',
              borderColor: 'border.border01',
              color: 'text.tertiary',
              fontFamily: 'LibreFranklin-Light',
              padding: k === 'status' ? '14.5px 20px' : '20px',
              justifyContent: k === 'bpn' ? 'space-between' : '',
              display: variant === 'wide' ? 'flex' : 'block',
            }}
          >
            {renderContentSwitch(k, v)}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
