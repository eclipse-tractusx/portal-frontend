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

import './style.scss'
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import type { InviteData } from 'features/admin/registration/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteForm } from 'components/overlays/InviteForm'
import {
  useFetchInviteSearchQuery,
  useSendInviteMutation,
} from 'features/admin/inviteApiSlice'
import { InviteList } from './InviteList'

export enum ProcessingType {
  BUSY = 'BUSY',
  INPUT = 'INPUT',
}

export default function InviteBusinessPartner() {
  const { t } = useTranslation()
  const [failureOverlayOpen, setFailureOverlayOpen] = useState<boolean>(false)
  const [successOverlayOpen, setSuccessOverlayOpen] = useState<boolean>(false)
  const [inviteOverlayOpen, setInviteOverlayOpen] = useState<boolean>(false)
  const [processing, setProcessing] = useState<string>(ProcessingType.INPUT)
  const [expr, setExpr] = useState<string>('')
  const [create] = useSendInviteMutation()
  const [refresh, setRefresh] = useState<number>(0)

  useEffect(() => {
    // close success overlay/dialog after 5 seconds
    if (successOverlayOpen) {
      setTimeout(() => {
        setSuccessOverlayOpen(false)
      }, 5000)
    }
  }, [successOverlayOpen])

  const doSubmitInvite = async (data: InviteData) => {
    setProcessing(ProcessingType.BUSY)
    await create(data)
      .unwrap()
      .then(() => {
        setSuccessOverlayOpen(true)
        setInviteOverlayOpen(false)
        setRefresh(Date.now())
      })
      .catch(() => {
        setFailureOverlayOpen(true)
        setInviteOverlayOpen(false)
      })
    setProcessing(ProcessingType.INPUT)
  }

  return (
    <main className="invite-main-container">
      <InviteForm
        openDialog={inviteOverlayOpen}
        handleOverlayClose={() => {
          setInviteOverlayOpen(false)
        }}
        onSubmit={doSubmitInvite}
        state={processing}
      />

      {/* success dialog/overlay */}
      <Dialog
        open={successOverlayOpen}
        sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => {
              setSuccessOverlayOpen(false)
            }}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography mt={7} mb={2} variant="body2" align="center">
            <CheckCircleOutlineIcon
              color="success"
              sx={{ width: 46, height: 46 }}
            />
          </Typography>
          <Typography mb={2} variant="h4" align="center">
            {t('content.invite.success')}
          </Typography>
          <Typography mb={5} variant="body2" align="center">
            {t('content.invite.successSubText')}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* failure dialog/overlay */}
      <Dialog
        open={failureOverlayOpen}
        sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => {
              setFailureOverlayOpen(false)
            }}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography mt={7} mb={2} variant="body2" align="center">
            <ErrorOutlineIcon color="error" style={{ height: 20, width: 20 }} />
          </Typography>
          <Typography mb={2} variant="h4" align="center">
            {t('content.invite.failure')}
          </Typography>
          <Typography mb={5} variant="body2" align="center">
            {t('content.invite.failureSubText')}
          </Typography>
        </DialogContent>
      </Dialog>

      <section>
        <Typography variant="h2" mb={3} align="center">
          {t('content.invite.subHeaderTitle')}
        </Typography>
        <Typography variant="body1" align="center">
          {t('content.invite.inviteText1')}
        </Typography>
        <Typography variant="body1" mb={3} align="center">
          {t('content.invite.inviteText2')}
        </Typography>
        <Button
          onClick={() => {
            setInviteOverlayOpen(true)
          }}
          size="medium"
          sx={{ margin: 'auto', display: 'block' }}
        >
          {t('content.invite.invite')}
        </Button>
        <InviteList
          fetchHook={useFetchInviteSearchQuery}
          fetchHookArgs={{ expr }}
          onSearch={setExpr}
          searchExpr={expr}
          refetch={refresh}
        />
      </section>
    </main>
  )
}
