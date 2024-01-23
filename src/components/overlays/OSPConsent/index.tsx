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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Typography,
} from '@nidhi.garg/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useState } from 'react'
import { OSPConsentContent } from './OSPConsentContent'
import { error, success } from 'services/NotifyService'
import {
  type PartnerRegistrationConsent,
  useFetchCompanyRoleAgreementDataQuery,
  useRegisterPartnerConsentMutation,
  emptyPartnerRegistrationConsent,
  useFetchRegistrationApplicationsQuery,
  useFetchRegistrationApplicationDataQuery,
} from 'features/admin/networkApiSlice'

export const OSPApplicationConsent = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const application = useFetchRegistrationApplicationDataQuery(id).data
  const companyRoleAgreementData = useFetchCompanyRoleAgreementDataQuery().data
  const [registerPartnerConsent] = useRegisterPartnerConsentMutation()
  const [consent, setConsent] = useState<PartnerRegistrationConsent>(
    emptyPartnerRegistrationConsent
  )
  const [loading, setLoading] = useState(false)

  console.log(application, companyRoleAgreementData)

  const doConsent = async () => {
    if (!(application && consent)) return
    setLoading(true)
    try {
      console.log(consent)
      await registerPartnerConsent(consent).unwrap()
      success(t('osp.consent.success'))
      dispatch(closeOverlay())
    } catch (err) {
      error(t('osp.consent.error'), '', err as object)
    }
    setLoading(false)
  }

  return (
    <>
      <DialogHeader
        title={t('osp.consent.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Trans>
            <Typography variant="label3">{t('osp.consent.desc')}</Typography>
          </Trans>
        </div>
        {application && companyRoleAgreementData && (
          <OSPConsentContent
            application={application}
            companyRoleAgreementData={companyRoleAgreementData}
            onValid={setConsent}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
          {t('action.cancel')}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            size="medium"
            helperText=""
            helperTextColor="success"
            label=""
            loading
            loadIndicator={t('action.loading')}
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={doConsent}
            disabled={
              consent.agreements.length !==
              companyRoleAgreementData?.companyRoles
                .filter((role) =>
                  application?.companyRoles.includes(role.companyRole)
                )
                .reduce((a, r) => a + r.agreementIds.length, 0)
            }
          >
            {t('action.consent')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}

export const OSPConsent = () => {
  const applications = useFetchRegistrationApplicationsQuery().data
  return applications && applications.length > 0 ? (
    <OSPApplicationConsent id={applications[0].applicationId} />
  ) : (
    <></>
  )
}
