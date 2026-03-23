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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useState } from 'react'
import { useFetchIDPDetailQuery } from 'features/admin/idpApiSlice'
import { OSPRegisterContent } from './OSPRegisterContent'
import { error, success } from 'services/NotifyService'
import {
  useRegisterPartnerMutation,
  type PartnerRegistration,
  useFetchCompanyRoleAgreementDataQuery,
} from 'features/admin/networkApiSlice'

export const OSPRegister = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const companyRoleAgreementData = useFetchCompanyRoleAgreementDataQuery().data

  const [registerPartner] = useRegisterPartnerMutation()

  const [registerData, setRegisterData] = useState<
    PartnerRegistration | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)

  const doRegister = async () => {
    if (!(data && registerData)) return
    setLoading(true)
    try {
      await registerPartner(registerData).unwrap()
      dispatch(closeOverlay())
      success(t('osp.register.success'))
    } catch (err) {
      error(t('osp.register.error'), '', err as object)
    }
    setLoading(false)
  }

  return (
    <>
      <DialogHeader
        title={t('osp.register.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Trans>
            <Typography variant="label3">{t('osp.register.desc')}</Typography>
          </Trans>
        </div>
        {data && companyRoleAgreementData && (
          <OSPRegisterContent
            idp={data}
            companyRoleAgreementData={companyRoleAgreementData}
            onValid={setRegisterData}
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
            onClick={doRegister}
            disabled={!registerData}
          >
            {t('action.register')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
