/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
  Dialog,
  DialogContent,
  CfxButton,
  DialogActions,
  DialogHeader,
  CircleProgress,
} from '@cofinity-x/shared-components'
import { Box } from '@mui/material'
import React from 'react'
interface OverlayProps {
  title: string
  description: string | JSX.Element
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  loading: boolean
  children?: JSX.Element | JSX.Element[] | null
  showConfirmButton?: boolean
  className?: string
  confirmButton?: JSX.Element | null
}

const Overlay = ({
  title,
  description,
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
  children,
  showConfirmButton = true,
  className,
  confirmButton,
}: OverlayProps) => {
  const { t } = useTranslation()

  const renderActionButton = (): JSX.Element => {
    if (loading) {
      return (
        <Box
          sx={{
            width: '110px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircleProgress
            size={40}
            step={1}
            interval={0.1}
            colorVariant={'primary'}
            variant={'indeterminate'}
            thickness={8}
          />
        </Box>
      )
    }

    if (confirmButton) {
      return confirmButton
    }

    return (
      <CfxButton
        data-testid="company-wallet-overlay-confirm-button"
        disabled={!showConfirmButton}
        variant="contained"
        onClick={(e) => {
          handleConfirmClick(e)
        }}
      >
        {t('global.actions.proceed')}
      </CfxButton>
    )
  }

  return (
    <Dialog
      open={openDialog}
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '45%',
        },
      }}
    >
      <div className={`${className}`}>
        <div className="cx-dialog-header-content">
          <DialogHeader title={title} />
          <DialogContent>{description}</DialogContent>
        </div>
        {children && <DialogContent>{children}</DialogContent>}
      </div>
      <DialogActions>
        <CfxButton
          data-testid="company-wallet-overlay-cancel-button"
          variant="outlined"
          onClick={(e) => {
            handleOverlayClose(e)
          }}
        >
          {t('global.actions.cancel')}
        </CfxButton>
        {renderActionButton()}
      </DialogActions>
    </Dialog>
  )
}

export default Overlay
