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

import { type Dispatch, type SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { success } from 'services/NotifyService'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  type ValueItem,
  type DataValue,
} from 'components/pages/TechnicalUserDetails/TechnicalUserDetailsContent'

interface KeyValueViewProps {
  cols: number
  title: string
  items: ValueItem | Array<ValueItem>
  editLink?: string
  setTechnicalUserDetailList?: Dispatch<SetStateAction<ValueItem[]>>
}

const renderValue = (value: DataValue, masked: boolean = false) => {
  const maskedText = masked ? '*****' : value
  return typeof maskedText === 'string' ? (
    <Typography
      sx={{
        fontSize: '14px',
        color: 'gray',
        margin: 'auto 0px',
        wordBreak: 'break-all',
      }}
    >
      {maskedText}
    </Typography>
  ) : (
    <>{maskedText}</>
  )
}

export const KeyValueView = ({
  cols,
  title,
  items,
  editLink,
  setTechnicalUserDetailList,
}: KeyValueViewProps) => {
  const [copied, setCopied] = useState<string>('')
  const { t } = useTranslation()

  const renderValueItem = (item: ValueItem) => (
    <Box>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
        }}
      >
        {renderValue(item.value ?? '', item?.masked)}
        {item?.copy && (
          <Box
            sx={{
              color: copied === item.value ? '#00cc00' : '#eeeeee',
              ':hover': {
                color: copied === item.value ? '#00cc00' : '#cccccc',
              },
            }}
            onClick={async () => {
              const value = item.value ?? ''
              await navigator.clipboard.writeText(value as string)
              setCopied(value as string)
              success(t('global.actions.copyInfoSuccessMessage'))
              setTimeout(() => {
                setCopied('')
              }, 1000)
            }}
          >
            <ContentCopyIcon
              sx={{
                marginLeft: '10px',
              }}
            />
          </Box>
        )}
        {item.showHideButton && setTechnicalUserDetailList && (
          <Box
            onClick={() => {
              if (Array.isArray(items)) {
                const updatedItems = items.map((itm) =>
                  itm.key === item.key ? { ...itm, masked: !itm.masked } : itm
                )
                setTechnicalUserDetailList(updatedItems)
              }
            }}
            sx={{
              color: item.masked ? '#eeeeee' : '#cccccc',
              ':hover': {
                color: '#cccccc',
              },
            }}
          >
            {item.masked ? (
              <VisibilityOffIcon style={{ marginLeft: '8px' }} />
            ) : (
              <VisibilityIcon style={{ marginLeft: '8px' }} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        width: `${cols * 349 + (cols - 1) * 31}px`,
        marginRight: '31px',
        marginBottom: '70px',
        '@media (max-width: 1200px)': {
          width: '100%',
        },
      }}
    >
      <Box
        sx={{
          height: '60px',
          width: '100%',
          backgroundColor: '#EDF0F4',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
          {title}
        </Typography>
        {editLink && (
          <Box
            sx={{
              display: 'flex',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              ':hover': {
                backgroundColor: 'rgba(176, 206, 235, 0.4)',
                borderRadius: '20px',
              },
            }}
          >
            <Link to={editLink} target="_blank" style={{ display: 'flex' }}>
              <EditOutlinedIcon
                sx={{
                  color: '#0f71cb',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Box>
        )}
      </Box>
      <Box>
        {Array.isArray(items) ? (
          items.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: '60px',
                padding: '18px 24px',
                borderBottom: '1px solid #EDF0F4',
              }}
            >
              {item.key && (
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                  }}
                >
                  {item.key}
                </Typography>
              )}
              {renderValueItem(item)}
            </Box>
          ))
        ) : (
          <Box
            key={JSON.stringify(items.value)}
            sx={{
              padding: '18px 24px',
            }}
          >
            {renderValueItem(items)}
          </Box>
        )}
      </Box>
    </Box>
  )
}
