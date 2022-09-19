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

import './InviteBusinessPartner.scss'
import { Api } from 'features/admin/registration/api'
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  PageHeader,
  Typography,
} from 'cx-portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { InviteData } from 'features/admin/registration/types'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteForm } from 'components/overlays/InviteForm'
import { useFetchInviteSearchQuery } from 'features/admin/inviteApiSlice'
import { InviteList } from './components/InviteList'

export default function InviteBusinessPartner() {
  const { t } = useTranslation()
  const [failureOverlayOpen, setFailureOverlayOpen] = useState<boolean>(false)
  const [successOverlayOpen, setSuccessOverlayOpen] = useState<boolean>(false)
  const [inviteOverlayOpen, setInviteOverlayOpen] = useState<boolean>(false)
  const [processing, setProcessing] = useState<string>('input')
  const [expr, setExpr] = useState<string>('')

  useEffect(() => {
    // close success overlay/dialog after 5 seconds
    if (successOverlayOpen) {
      setTimeout(() => {
        setSuccessOverlayOpen(false)
      }, 5000)
    }
  }, [successOverlayOpen])

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')
    //switch to redux
    new Api()
      .postInviteBusinessPartner(data)
      .then(() => {
        setSuccessOverlayOpen(true)
        setInviteOverlayOpen(false)
      })
      .catch((error: unknown) => {
        console.log(error)
        setFailureOverlayOpen(true)
        setInviteOverlayOpen(false)
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing('input')
        }, 5000)
      })
  }

  return (
    <main className="invite-main-container">
      <InviteForm
        openDialog={inviteOverlayOpen}
        handleOverlayClose={() => setInviteOverlayOpen(false)}
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
            onClick={() => setSuccessOverlayOpen(false)}
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
            onClick={() => setFailureOverlayOpen(false)}
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

      <PageHeader
        title={t('content.invite.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <section>
        <Typography variant="h3" mb={3} align="center">
          {t('content.invite.subHeaderTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('content.invite.inviteText1')}
        </Typography>
        <Typography variant="body2" mb={3} align="center">
          {t('content.invite.inviteText2')}
        </Typography>
        <Button
          onClick={() => setInviteOverlayOpen(true)}
          size="medium"
          sx={{ margin: 'auto', display: 'block' }}
        >
          {t('content.invite.invite')}
        </Button>
        <InviteList
          fetchHook={useFetchInviteSearchQuery}
          fetchHookArgs={{ expr }}
          onSearch={setExpr}
        />
      </section>
    </main>
  )
}
