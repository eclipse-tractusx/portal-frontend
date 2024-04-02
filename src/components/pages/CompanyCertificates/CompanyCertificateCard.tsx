/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Tooltips,
  Typography,
} from '@catena-x/portal-shared-components'
import './CompanyCertificate.scss'
import { type ComapnyCertificateData } from 'features/companyCertification/companyCertificateApiSlice'
import { Box, ClickAwayListener } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useDispatch } from 'react-redux'
import { OVERLAYS, ROLES } from 'types/Constants'
import { show } from 'features/control/overlay'
import dayjs from 'dayjs'
import UserService from 'services/UserService'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

enum CompanyCertificateStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export default function CompanyCertificateCard({
  item,
}: Readonly<{
  item: ComapnyCertificateData
}>): JSX.Element {
  const { t } = useTranslation()
  const [dotsMenu, setDotsMenu] = useState(false)
  const dispatch = useDispatch()

  const handleView = (): unknown =>
    dispatch(show(OVERLAYS.COMPANY_CERTIFICATE_DETAILS, item.documentId))
  const handleDelete = (): unknown =>
    dispatch(
      show(
        OVERLAYS.COMPANY_CERTIFICATE_CONFIRM_DELETE,
        item.documentId,
        item.companyCertificateType
      )
    )

  const today = dayjs()
  const isWarning = dayjs(item.validTill).diff(today, 'days') < 30

  const PendingIcon = () => {
    return (
      <Tooltips
        additionalStyles={{
          cursor: 'pointer',
          marginTop: '30px !important',
        }}
        tooltipPlacement="bottom-start"
        tooltipText={t('content.companyCertificate.tooltips.pending')}
        children={
          <IconButton
            size="small"
            sx={{
              width: '48px',
              height: '36px',
              backgroundColor: '#FFECBD',
              borderRadius: '74px',
              color: '#FFECBD',
              ':hover': {
                backgroundColor: '#FFECBD',
                borderColor: '#FFECBD',
                color: '#FFECBD',
              },
              ':active': {
                boxShadow: 'none',
              },
              ':focus': {
                boxShadow: 'none',
              },
            }}
          >
            <AccessTimeOutlinedIcon
              style={{
                color: '#975B27',
                height: '20px',
              }}
            />
          </IconButton>
        }
      />
    )
  }

  const InactiveIcon = () => {
    return (
      <Tooltips
        additionalStyles={{
          cursor: 'pointer',
          marginTop: '30px !important',
        }}
        tooltipPlacement="bottom-start"
        tooltipText={t('content.companyCertificate.tooltips.inactive')}
        children={
          <IconButton
            size="small"
            sx={{
              width: '48px',
              height: '36px',
              marginLeft: '10px',
              backgroundColor: '#FEE7E2',
              borderRadius: '74px',
              color: '#FEE7E2',
              ':hover': {
                backgroundColor: '#FEE7E2',
                borderColor: '#FEE7E2',
                color: '#FEE7E2',
              },
              ':active': {
                boxShadow: 'none',
              },
              ':focus': {
                boxShadow: 'none',
              },
            }}
          >
            <CancelRoundedIcon
              style={{
                color: '#FF532F',
                height: '20px',
              }}
            />
          </IconButton>
        }
      />
    )
  }

  const ActiveIcon = () => {
    return (
      <Tooltips
        additionalStyles={{
          cursor: 'pointer',
          marginTop: '30px !important',
        }}
        tooltipPlacement="bottom-start"
        tooltipText={t('content.companyCertificate.tooltips.active')}
        children={
          <IconButton
            size="small"
            sx={{
              width: '48px',
              height: '36px',
              marginLeft: '10px',
              backgroundColor: '#E2F6C7',
              borderRadius: '74px',
              color: '#E2F6C7',
              ':hover': {
                backgroundColor: '#E2F6C7',
                borderColor: '#E2F6C7',
                color: '#E2F6C7',
              },
              ':active': {
                boxShadow: 'none',
              },
              ':focus': {
                boxShadow: 'none',
              },
            }}
          >
            <CheckCircleRoundedIcon
              style={{
                color: '#5C8D45',
                height: '20px',
              }}
            />
          </IconButton>
        }
      />
    )
  }

  const DeleteIcon = () => {
    return (
      <IconButton
        color="secondary"
        size="small"
        sx={{
          marginLeft: '10px',
          width: '48px',
          height: '36px',
          borderRadius: '74px',
        }}
        onClick={handleDelete}
        disabled={!UserService.hasRole(ROLES.SUBSCRIBE_SERVICE_MARKETPLACE)}
      >
        <DeleteOutlinedIcon
          style={{
            color: 'secondary',
            height: '20px',
          }}
        />
      </IconButton>
    )
  }

  const DotsMenu = () => {
    return (
      <ClickAwayListener
        onClickAway={() => {
          if (dotsMenu) setDotsMenu(!dotsMenu)
        }}
      >
        <Box
          className="dots"
          onClick={() => {
            setDotsMenu(!dotsMenu)
          }}
        >
          <MoreVertIcon />
          {dotsMenu && (
            <Box className="more-container">
              <Typography variant="label3" onClick={handleView}>
                {t('content.companyCertificate.view')}{' '}
              </Typography>
              {UserService.hasRole(ROLES.SUBSCRIBE_SERVICE_MARKETPLACE) &&
                item.companyCertificateStatus ===
                  CompanyCertificateStatus.ACTIVE && (
                  <Typography variant="label3" onClick={handleDelete}>
                    {t('content.companyCertificate.delete')}{' '}
                  </Typography>
                )}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    )
  }

  const DateAndWarningIcon = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="label3">
          {t('content.companyCertificate.validtill')} :{' '}
          {dayjs(item.validTill).format('YYYY-MM-DD')}
        </Typography>
        {isWarning && (
          <Tooltips
            additionalStyles={{
              cursor: 'pointer',
              marginTop: '30px !important',
            }}
            tooltipPlacement="bottom-start"
            tooltipText={t('content.companyCertificate.tooltips.warning')}
            children={
              <WarningRoundedIcon
                style={{
                  color: '#FF4444',
                  height: '20px',
                  marginLeft: '10px',
                }}
              />
            }
          />
        )}
      </Box>
    )
  }
  return (
    <Box className="card-container">
      <Box
        className="first-container"
        sx={{
          backgroundImage: 'url(/certificate-sample.png)',
          backgroundColor: '#F2F3FB',
        }}
      ></Box>
      <Box className="second-container">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            padding: '0px 20px 20px',
          }}
        >
          {item.companyCertificateStatus ===
            CompanyCertificateStatus.PENDING && <PendingIcon />}
          {item.companyCertificateStatus ===
            CompanyCertificateStatus.INACTIVE && <InactiveIcon />}
          {item.companyCertificateStatus ===
            CompanyCertificateStatus.ACTIVE && (
            <>
              <ActiveIcon />
              <DeleteIcon />
            </>
          )}
        </Box>
        <Box className="top-container">
          <Typography variant="h4">{item.companyCertificateType}</Typography>
          <DotsMenu />
        </Box>
        <Box className="bottom-container">
          <DateAndWarningIcon />
          <Box className="link" onClick={handleView}>
            <Typography variant="label3">
              {t('content.companyCertificate.morelink')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
