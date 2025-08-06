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

import {
  Button,
  CircleProgress,
  DialogActions,
  DialogContent,
  DialogHeader,
  PageSnackbar,
} from '@catena-x/portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import './style.scss'
import {
  useAddServiceProviderMutation,
  useDeleteServiceProviderMutation,
  useFetchServiceProviderQuery,
} from 'features/serviceProvider/serviceProviderApiSlice'
import type { ServiceRequest } from 'features/serviceProvider/serviceProviderApiSlice'
import { isIDPClientID, isIDPClientSecret, isURL } from 'types/Patterns'
import { setSuccessType } from 'features/serviceProvider/slice'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { InputType } from 'components/shared/basic/Input/BasicInput'

export default function AddServiceProvider() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [saveErrorMsg, setSaveErrorMessage] = useState(false)
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set())
  const [callbackData, setCallbackData] = useState<ServiceRequest>({
    url: '',
    callbackUrl: undefined,
    clientId: '',
    clientSecret: '',
    authUrl: '',
  })

  const { data, refetch } = useFetchServiceProviderQuery()
  const [addServiceProvider] = useAddServiceProviderMutation()
  const [deleteServiceProvider] = useDeleteServiceProviderMutation()
  useEffect(() => {
    refetch()
    dispatch(setSuccessType(false))
  }, [refetch, dispatch])
  useEffect(() => {
    const newInvalidFields = new Set<string>()
    const requiredFields: (keyof ServiceRequest)[] = [
      'authUrl',
      'url',
      'clientId',
      'clientSecret',
    ]
    requiredFields.forEach((field) => {
      if (!(data as Partial<ServiceRequest>)?.[field]) {
        newInvalidFields.add(field)
      }
    })
    setInvalidFields(newInvalidFields)
  }, [data])

  const submitAutoSetup = async () => {
    if (!callbackData || !invalidFields) return
    try {
      const requestData: ServiceRequest = {
        ...callbackData,
        callbackUrl: callbackData.callbackUrl?.trim()
          ? callbackData.callbackUrl
          : undefined,
      }
      await addServiceProvider(requestData).unwrap()
      dispatch(setSuccessType(true))
      dispatch(closeOverlay())
    } catch (error) {
      console.error(error)
      setSaveErrorMessage(true)
    }
  }

  const deleteAutoSetup = async () => {
    try {
      await deleteServiceProvider().unwrap()
      dispatch(setSuccessType(true))
      dispatch(closeOverlay())
    } catch (error) {
      console.error(error)
      setSaveErrorMessage(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (invalidFields?.has(field)) invalidFields.delete(field)
    setCallbackData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="registerUrlMain">
      <DialogHeader
        {...{
          title: t('content.appSubscription.register.heading'),
          intro: t('content.appSubscription.register.message'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />

      <DialogContent>
        <div className="manageInputURL">
          {data ? (
            <>
              <ValidatingInput
                name={'url' as keyof ServiceRequest}
                label={t('content.appSubscription.register.autoSetupURL.name')}
                value={data?.url}
                hint={t('content.appSubscription.register.autoSetupURL.hint')}
                errorMessage={t(
                  'content.appSubscription.register.autoSetupURL.error'
                )}
                onValid={handleInputChange}
                onInvalid={(name, _) => {
                  setInvalidFields((prev) => new Set(prev).add(name))
                }}
                validate={(expr) => isURL(expr)}
                skipInitialValidation={true}
              />

              <ValidatingInput
                name={'callbackUrl' as keyof ServiceRequest}
                label={t('content.appSubscription.register.callbackUrl.name')}
                value={data?.callbackUrl}
                hint={t('content.appSubscription.register.callbackUrl.hint')}
                errorMessage={t(
                  'content.appSubscription.register.callbackUrl.error'
                )}
                validate={(expr) => !expr || isURL(expr)}
                onValid={handleInputChange}
                onInvalid={(name, _) => {
                  setInvalidFields((prev) => new Set(prev).add(name))
                }}
                skipInitialValidation={true}
              />
              <ValidatingInput
                name={'authUrl' as keyof ServiceRequest}
                label={t('content.appSubscription.register.authUrl.name')}
                value={data?.authUrl}
                hint={t('content.appSubscription.register.authUrl.hint')}
                errorMessage={t(
                  'content.appSubscription.register.authUrl.error'
                )}
                validate={(expr) => isURL(expr)}
                onValid={handleInputChange}
                onInvalid={(name, _) => {
                  setInvalidFields((prev) => new Set(prev).add(name))
                }}
                skipInitialValidation={true}
              />
              <ValidatingInput
                name={'clientId' as keyof ServiceRequest}
                label={t('content.appSubscription.register.clientId.name')}
                value={data?.clientId}
                hint={t('content.appSubscription.register.clientId.hint')}
                errorMessage={t(
                  'content.appSubscription.register.clientId.error'
                )}
                validate={isIDPClientID}
                onValid={handleInputChange}
                onInvalid={(name, _) => {
                  setInvalidFields((prev) => new Set(prev).add(name))
                }}
                skipInitialValidation={true}
              />
              <ValidatingInput
                name={'clientSecret' as keyof ServiceRequest}
                type={InputType.password}
                label={t('content.appSubscription.register.clientSecret.name')}
                value={data?.clientSecret}
                hint={t('content.appSubscription.register.clientSecret.hint')}
                errorMessage={t(
                  'content.appSubscription.register.clientSecret.error'
                )}
                validate={isIDPClientSecret}
                onValid={handleInputChange}
                onInvalid={(name, _) => {
                  setInvalidFields((prev) => new Set(prev).add(name))
                }}
                skipInitialValidation={true}
              />
            </>
          ) : (
            <div className="progress">
              <CircleProgress
                colorVariant="primary"
                interval={800}
                iteration
                size={50}
                step={100}
                thickness={5}
                variant="indeterminate"
              />
            </div>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        {data?.url && (
          <Button
            variant="outlined"
            title={t('content.appSubscription.register.deleteAutoSetup')}
            onClick={() => {
              deleteAutoSetup()
            }}
          >
            <DeleteIcon className="deleteIcon" /> {t('global.actions.delete')}
          </Button>
        )}

        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            void submitAutoSetup()
          }}
          disabled={invalidFields?.size > 0}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
      <PageSnackbar
        open={saveErrorMsg}
        onCloseNotification={() => {
          setSaveErrorMessage(false)
        }}
        severity="error"
        description={t('content.appSubscription.register.providerErrorMessage')}
        showIcon={true}
      />
    </div>
  )
}
