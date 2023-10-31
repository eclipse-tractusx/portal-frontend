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
  Stepper,
  Typography,
} from '@catena-x/portal-shared-components'
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
  const { t } = useTranslation('osp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const companyRoleAgreementData = useFetchCompanyRoleAgreementDataQuery().data
  console.log(companyRoleAgreementData)

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
      success(t('register.success'))
    } catch (err) {
      error(t('register.error'), '', err as object)
    }
    setLoading(false)
  }

  const steps = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
      text: t('edit.created'),
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
      text: t('edit.created'),
    },
    {
      headline: t('add.stepLists.thirdStep'),
      step: 3,
    },
  ]

  return (
    <>
      <DialogHeader
        title={t('register.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper list={steps} showSteps={3} activeStep={3} />
        </div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Trans>
            <Typography variant="label3">{t('register.desc')}</Typography>
          </Trans>
        </div>
        <Typography variant="label2">{t('register.addDataHeading')}</Typography>
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
