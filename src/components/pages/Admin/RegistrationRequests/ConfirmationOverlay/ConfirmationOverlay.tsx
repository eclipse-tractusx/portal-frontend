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

import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
} from '@arena2036/portal-shared-components-construct-x'
interface ConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
}

const ConfirmationOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
}: ConfirmationOverlayProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.admin.registration-requests.confirmmodal.title')}
        />
        <DialogContent>
          {t('content.admin.registration-requests.confirmmodal.description')}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleOverlayClose(e)
            }}
          >
            {t('global.actions.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              handleConfirmClick(e)
            }}
          >
            {t('global.actions.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationOverlay
