/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH and BMW Group AG
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { twinsSelector } from 'features/digitalTwins/slice'
import { TwinDetails } from './TwinDetails'
import { Box, useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TwinDialogProps {
  show: boolean
  onClose: () => void
}
const DigitalTwinDetailDialog = ({ show, onClose }: TwinDialogProps) => {
  const { twin, loading, error } = useSelector(twinsSelector)
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Dialog open={show}>
      <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>
        {twin && <TwinDetails twin={twin} />}
        {loading && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress
              size={35}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        )}
        {error && (
          <>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {t('content.digitaltwin.detail.error')}
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DigitalTwinDetailDialog
