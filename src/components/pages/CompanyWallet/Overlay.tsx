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
  Button,
  DialogActions,
  DialogHeader,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
interface OverlayProps {
  title: string
  description: string
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  loading: boolean
}

const Overlay = ({
  title,
  description,
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
}: OverlayProps) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={openDialog}
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '45%',
        },
      }}
    >
      <DialogHeader title={title} />
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleOverlayClose(e)
          }}
        >
          {t('global.actions.cancel')}
        </Button>
        {!loading ? (
          <Button
            variant="contained"
            onClick={(e) => {
              handleConfirmClick(e)
            }}
          >
            {t('global.actions.confirm')}
          </Button>
        ) : (
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
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Overlay
