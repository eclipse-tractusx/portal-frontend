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
  CfxButton,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Radio,
  Stepper,
  Tooltips,
  Typography,
} from '@cofinity-x/shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay'
import { useState } from 'react'
import {
  IDPAuthType,
  IDPProviderType,
  useAddIDPMutation,
  idpAddAuthTypeSelector,
  idpAddProviderTypeSelector,
  setProviderType,
  setAuthType,
  idpAddSelector,
  setName,
  resetIDPSlice,
} from 'features/admin/idpApiSlice'
import { OVERLAYS } from 'types/Constants'
import Patterns from 'types/Patterns'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { success } from 'services/NotifyService'
import CommonConnectorFormInputField from 'components/shared/basic/ReleaseProcess/components/CommonConnectorFormInputField'
import { useForm } from 'react-hook-form'

const SelectIdpProviderType = () => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const providerType = useSelector(idpAddProviderTypeSelector)

  return (
    <div
      style={{ padding: '30px 0px', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ marginRight: '12px' }} variant="label3">
          {t('field.providerType.name')}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={t('field.providerType.hint')}
          children={
            <div>
              <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
            </div>
          }
        />
      </div>
      <Radio
        name="radio-provider"
        label={`${IDPProviderType.OWN} - ${t('field.providerType.option.OWN')}`}
        value={IDPProviderType.OWN}
        inputProps={{ 'aria-label': IDPProviderType.OWN }}
        checked={providerType === IDPProviderType.OWN}
        onChange={() => {
          dispatch(setProviderType(IDPProviderType.OWN))
        }}
      />
      <Radio
        name="radio-provider"
        label={`${IDPProviderType.MANAGED} - ${t(
          'field.providerType.option.MANAGED'
        )}`}
        value={IDPProviderType.MANAGED}
        inputProps={{ 'aria-label': IDPProviderType.MANAGED }}
        checked={providerType === IDPProviderType.MANAGED}
        onChange={() => {
          dispatch(setProviderType(IDPProviderType.MANAGED))
        }}
      />
    </div>
  )
}

const SelectIdpAuthType = () => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const authType = useSelector(idpAddAuthTypeSelector)

  return (
    <div
      style={{ padding: '30px 0px', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ marginRight: '12px' }} variant="label3">
          {t('field.authType.name')}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={t('field.authType.hint')}
          children={
            <div>
              <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
            </div>
          }
        />
      </div>
      <Radio
        name="radio-provider"
        label={IDPAuthType.OIDC}
        value={IDPAuthType.OIDC}
        inputProps={{ 'aria-label': IDPAuthType.OIDC }}
        checked={authType === IDPAuthType.OIDC}
        onChange={() => {
          dispatch(setAuthType(IDPAuthType.OIDC))
        }}
      />
      <Radio
        disabled={true}
        name="radio-provider"
        label={IDPAuthType.SAML}
        value={IDPAuthType.SAML}
        inputProps={{ 'aria-label': IDPAuthType.SAML }}
        checked={authType === IDPAuthType.SAML}
        onChange={() => {
          dispatch(setAuthType(IDPAuthType.SAML))
        }}
      />
    </div>
  )
}

const AddIDPPrepareForm = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <SelectIdpAuthType />
    <SelectIdpProviderType />
  </div>
)

export const AddIdp = () => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const idpData = useSelector(idpAddSelector)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const [addIdp] = useAddIDPMutation()

  const defaultFormFieldValues = {
    displayName: idpData.name,
  }

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    defaultValues: defaultFormFieldValues,
    mode: 'onChange',
  })

  const doCreateIDP = async () => {
    setLoading(true)
    try {
      const idp = await addIdp({
        protocol: idpData.authType,
        identityProviderTypeId: idpData.providerType,
        displayName: idpData.name,
      }).unwrap()
      dispatch(show(OVERLAYS.UPDATE_IDP, idp.identityProviderId))
      resetState()
      success(t('add.success'), getValues()?.displayName)
    } catch (err) {
      setShowError(true)
    }
    setLoading(false)
  }

  const AddStepsList = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
      color: '#0F71CB',
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
    },
    {
      headline: t('add.stepLists.thirdStep'),
      step: 3,
    },
  ]

  const resetState = () => {
    reset(defaultFormFieldValues)
    dispatch(resetIDPSlice())
  }

  return (
    <>
      <DialogHeader
        title={t('add.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => {
          resetState()
          dispatch(closeOverlay())
        }}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper
            list={
              idpData.providerType === IDPProviderType.MANAGED
                ? AddStepsList.slice(0, 2)
                : AddStepsList
            }
            showSteps={idpData.providerType === IDPProviderType.MANAGED ? 2 : 3}
            activeStep={1}
          />
        </div>
        <div className="cx-overlay__short-heading">
          <Trans>
            <Typography variant="label3">{t('add.desc')}</Typography>
          </Trans>
        </div>
        <CommonConnectorFormInputField
          {...{
            control,
            trigger,
            errors,
          }}
          name="displayName"
          pattern={Patterns.idp.displayName}
          onChangeDispatch={(val: string) => dispatch(setName(val))}
          maxLength={30}
          minLength={3}
          label={
            <>
              {t('field.display.name')}
              <span style={{ color: 'red' }}> *</span>
            </>
          }
          rules={{
            required: `${t('field.display.mandatoryMessage')}`,
            minLength: `${t('field.display.minimum')} 2 ${t(
              'field.display.charactersRequired'
            )}`,
            pattern: `${t('field.display.validCharactersIncludes')}`,
            maxLength: `${t('field.display.maximum')} 30 ${t(
              'field.display.charactersRequired'
            )}`,
          }}
        />
        <AddIDPPrepareForm />

        {showError && (
          <Trans>
            <Typography
              className="error-version__html error-version__add-idp"
              variant="label3"
            >
              <WarningAmberIcon />
              {t('add.metadataErrorManaged')}
            </Typography>
          </Trans>
        )}
      </DialogContent>
      <DialogActions>
        <CfxButton
          color="secondary"
          data-testid="cancel-idp-button"
          onClick={() => {
            resetState()
            dispatch(closeOverlay())
          }}
        >
          {t('action.cancel')}
        </CfxButton>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator={t('action.loading')}
            loading
            size="medium"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <CfxButton
            data-testid="create-idp-button"
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit(() => doCreateIDP())}
          >
            {t('action.createIdp')}
          </CfxButton>
        )}
      </DialogActions>
    </>
  )
}
