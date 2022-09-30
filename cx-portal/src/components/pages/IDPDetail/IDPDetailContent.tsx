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

import {
  Input,
  Tab,
  Tabs,
  LoadingButton,
  SelectList,
} from 'cx-portal-shared-components'
import { IdentityProvider } from 'features/admin/idpApiSlice'
import { editIDPSelector, FORMS, storeForm } from 'features/control/formSlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import './style.scss'
import Patterns from 'types/Patterns'

const ITEMS = [
  { id: 1, title: 'Catena-X Shared Idp', value: 'Catena-X Shared Idp' },
  { id: 2, title: 'Company Idp', value: 'Company Idp' },
]

const EditInput = ({
  name,
  value,
  onChange,
}: {
  name: string
  value?: string
  onChange: Function
}) => {
  const { t } = useTranslation('', { keyPrefix: 'content.idpdetail' })
  const dispatch = useDispatch()
  const fieldValue = useSelector(editIDPSelector)

  const checkField = (e: any) => {
    let att: { [name: string]: string } = {}
    att[e.target.name] = e.target.value
    dispatch(storeForm({ form: FORMS.IDP_FORM, att }))
    onChange(e)
  }

  return (
    <Input
      name={name}
      label={t(name)}
      value={value || fieldValue[name] || ''}
      onChange={checkField}
    />
  )
}

export default function IDPDetailContent({
  idp,
  onDisabledEvent,
}: {
  idp: IdentityProvider
  onDisabledEvent?: Function
}) {
  const { t } = useTranslation('', { keyPrefix: 'content.idpdetail' })
  const dispatch = useDispatch()
  const authTypeData = idp.oidc || idp.saml
  const [activeTab, setActiveTab] = useState(0)

  const [isDisabledConfirmBtn, setIsDisabledConfirmBtn] = useState(true)
  const [formData, setFormData] = useState<{
    idPType: string
    companyName: string
    clientId: string
    clientSecret: string
    authorizationUrl: string
    tokenUrl: string
    metaDataUrl: string
  }>({
    idPType: '',
    companyName: '',
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    tokenUrl: '',
    metaDataUrl: '',
  })

  const [loadBtnObj, setLoadBtnObj] = useState({
    initial: true,
    loading: false,
    success: false,
  })

  const [fieldErrors, setFieldErrors] = useState<{
    clientId: { message: string; valid: boolean }
    clientSecret: { message: string; valid: boolean }
    metaDataUrl: { message: string; valid: boolean }
  }>({
    clientId: { message: '', valid: false },
    clientSecret: { message: '', valid: false },
    metaDataUrl: { message: '', valid: false },
  })

  useEffect(() => {
    if (formData.idPType === 'Company Idp') {
      if (fieldErrors.clientId.valid && fieldErrors.clientSecret.valid) {
        if (activeTab === 1) {
          if (fieldErrors.metaDataUrl.valid) {
            setIsDisabledConfirmBtn(false)
          } else {
            setIsDisabledConfirmBtn(true)
          }
        } else {
          setIsDisabledConfirmBtn(false)
        }
      } else {
        setIsDisabledConfirmBtn(true)
      }
    } else {
      setIsDisabledConfirmBtn(false)
    }
  }, [fieldErrors, activeTab, formData.idPType])

  useEffect(() => {
    onDisabledEvent && onDisabledEvent(isDisabledConfirmBtn)
  }, [isDisabledConfirmBtn, onDisabledEvent])

  useEffect(() => {
    let att: { [name: string]: string } = {
      displayName: idp.displayName || '',
      metadataUrl: '',
      clientId: authTypeData?.clientId || '',
      secret: '',
      clientAuthMethod: authTypeData?.clientAuthMethod || '',
      signatureAlgorithm: authTypeData?.signatureAlgorithm || '',
    }
    dispatch(storeForm({ form: FORMS.IDP_FORM, att }))
    // eslint-disable-next-line
  }, [idp])

  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue)
  }

  // Client ID
  const validateClientId = (clientId: string) =>
    Patterns.idp.clientId.test(clientId)

  const validateClientIdOnChange = (clientId: string) => {
    if (clientId === '')
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientId: {
            message: t('client_id_required_error'),
            valid: true,
          },
        },
      })
    else if (!validateClientId(clientId))
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientId: {
            message: t('client_id_invalid_error'),
            valid: true,
          },
        },
      })
    else
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientId: {
            message: '',
            valid: true,
          },
        },
      })
  }

  // Client Secret
  const validateClientSecret = (clientSecret: string) =>
    Patterns.idp.clientSecret.test(clientSecret)

  const validateClientSecretOnChange = (clientSecret: string) => {
    if (clientSecret === '')
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientSecret: {
            message: t('client_secret_required_error'),
            valid: true,
          },
        },
      })
    else if (!validateClientSecret(clientSecret))
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientSecret: {
            message: t('client_secret_invalid_error'),
            valid: true,
          },
        },
      })
    else
      setFieldErrors({
        ...fieldErrors,
        ...{
          clientSecret: {
            message: '',
            valid: true,
          },
        },
      })
  }

  // Metadata Url
  const validateMetadataUrl = (metaDataUrl: string) =>
    Patterns.idp.metaDataUrl.test(metaDataUrl)

  const validateMetadataUrlOnChange = (metaDataUrl: string) => {
    if (metaDataUrl === '')
      setFieldErrors({
        ...fieldErrors,
        ...{
          metaDataUrl: {
            message: t('metadata_url_required_error'),
            valid: false,
          },
        },
      })
    else if (!validateMetadataUrl(metaDataUrl))
      setFieldErrors({
        ...fieldErrors,
        ...{
          metaDataUrl: {
            message: t('metadata_url_invalid_error'),
            valid: false,
          },
        },
      })
    else
      setFieldErrors({
        ...fieldErrors,
        ...{
          metaDataUrl: {
            message: '',
            valid: true,
          },
        },
      })
  }

  const handleSubmit = async () => {
    setLoadBtnObj({ ...loadBtnObj, loading: true })
    // Add api call here
    setLoadBtnObj({ ...loadBtnObj, loading: false, success: true })
  }

  const getButtonLabel = () => {
    if (loadBtnObj.success) return t('done')

    if (loadBtnObj.initial) return 'Load'

    return 'Loading'
  }

  return (
    <div className="idp-detail-content">
      <p>{t('selectIpsText')}</p>
      <div>
        <div className="mb-20">
          <SelectList
            fullWidth
            items={ITEMS}
            label={'Idp Type Section'}
            placeholder={'Idp Type Section'}
            onChangeItem={(e: any) =>
              setFormData({ ...formData, ...{ idPType: e.value } })
            }
          />
        </div>
      </div>
      {formData.idPType === 'Catena-X Shared Idp' && (
        <EditInput
          name="companyName"
          onChange={(e: any) =>
            setFormData({ ...formData, ...{ companyName: e.target.value } })
          }
        />
      )}

      {formData.idPType === 'Company Idp' && (
        <>
          <div className="idp-details-tab">
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="basic tabs usage"
            >
              <Tab
                sx={{ minWidth: '50%' }}
                label="Enter data manually"
                icon={<PersonOutlinedIcon />}
                iconPosition="start"
              />
              <Tab
                sx={{ minWidth: '50%' }}
                label="Load data via metadata file"
                icon={<GroupOutlinedIcon />}
                iconPosition="start"
              />
            </Tabs>
          </div>

          {activeTab === 1 && (
            <>
              <div>
                <EditInput
                  name="metadataUrl"
                  onChange={(e: any) => {
                    validateMetadataUrlOnChange(e.target.value)
                    setFormData({
                      ...formData,
                      ...{ metaDataUrl: e.target.value },
                    })
                  }}
                />
                <span className="error-msg">
                  {fieldErrors.metaDataUrl.message}
                </span>
              </div>
              <p>{t('idp_meta_description')}</p>
              <div className="loading-btn">
                <LoadingButton
                  loading={loadBtnObj.loading}
                  color={loadBtnObj.success ? 'success' : 'primary'}
                  variant="contained"
                  onButtonClick={handleSubmit}
                  sx={{ marginLeft: '10px' }}
                  loadIndicator="Loading..."
                  label={getButtonLabel()}
                  size={'small'}
                  disabled={!fieldErrors.metaDataUrl.valid}
                ></LoadingButton>
              </div>
            </>
          )}

          <div className="idp-name-row">
            <div>
              <EditInput
                name="clientId"
                onChange={(e: any) => {
                  validateClientIdOnChange(e.target.value)
                  setFormData({ ...formData, ...{ clientId: e.target.value } })
                }}
              />
              <span className="error-msg">{fieldErrors.clientId.message}</span>
            </div>

            <div>
              <EditInput
                name="secret"
                onChange={(e: any) => {
                  validateClientSecretOnChange(e.target.value)
                  setFormData({
                    ...formData,
                    ...{ clientSecret: e.target.value },
                  })
                }}
              />
              <span className="error-msg">
                {fieldErrors.clientSecret.message}
              </span>
            </div>
          </div>

          <div className="idp-name-row">
            <div>
              <EditInput
                name={'authorizationUrl'}
                value={authTypeData?.authorizationUrl || ''}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    ...{ authorizationUrl: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <EditInput
                name="tokenUrl"
                onChange={(e: any) =>
                  setFormData({ ...formData, ...{ tokenUrl: e.target.value } })
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
