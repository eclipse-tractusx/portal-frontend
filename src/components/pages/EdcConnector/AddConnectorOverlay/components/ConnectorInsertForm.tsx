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

import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import {
  Button,
  DropArea,
  Input,
  LoadingButton,
  Radio,
  SelectList,
  Tooltips,
  Typography,
} from '@catena-x/portal-shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Patterns from 'types/Patterns'
import { ConnectType } from 'features/connector/connectorApiSlice'
import { Dropzone } from '../../../../shared/basic/Dropzone'
import { useState } from 'react'
import './EdcComponentStyles.scss'

const ConnectorFormInput = ({
  control,
  trigger,
  errors,
  helperText,
  label,
  placeholder,
  name,
  rules,
  tooltipMsg,
  type,
  dropzoneProps,
  patternError,
  defaultSelectValue,
  items,
  keyTitle,
}: // Add an ESLint exception until there is a solution
// eslint-disable-next-line
any) => {
  return (
    <>
      {type === 'dropzone' && (
        <>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              marginTop: '25px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: '14px',
                color: '#111111',
                fontWeight: '400',
                paddingRight: '10px',
              }}
            >
              {label}
            </Typography>

            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="top-start"
              tooltipText={tooltipMsg}
              children={
                <span>
                  <HelpOutlineIcon
                    sx={{ color: '#B6B6B6' }}
                    fontSize={'small'}
                  />
                </span>
              }
            />
          </div>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange } }) => (
              <Dropzone
                acceptFormat={dropzoneProps.accept}
                maxFilesToUpload={1}
                onChange={([file]) => {
                  trigger(name)
                  onChange(file)
                }}
                errorText={helperText}
                DropStatusHeader={false}
                DropArea={(props) => <DropArea {...props} size="small" />}
              />
            )}
          />
        </>
      )}
      {type === 'input' && (
        <>
          <Controller
            render={({ field: { onChange, value } }) => {
              let errortext = helperText
              if (rules.pattern.test(value)) {
                errortext = ''
              } else if (
                (value.length <= 2 || value.length > 20) &&
                patternError
              ) {
                errortext = patternError.lengthError
              } else if (!rules.pattern.test(value) && patternError) {
                errortext = patternError.otherError
              }
              return (
                <Input
                  tooltipMessage={tooltipMsg}
                  sx={{
                    paddingTop: '10px',
                  }}
                  error={!!errors[name]}
                  helperText={errortext}
                  label={label}
                  placeholder={placeholder}
                  onChange={(event) => {
                    trigger(name)
                    onChange(event)
                  }}
                  value={value}
                />
              )
            }}
            name={name}
            control={control}
            rules={rules}
          />
        </>
      )}
      {type === 'select' && (
        <>
          <div
            style={{
              display: 'flex',
              marginBottom: '-15px',
              marginTop: '25px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: '14px',
                color: errors[name] ? '#d32f2f' : '#111111',
                fontWeight: '400',
                paddingRight: '10px',
              }}
            >
              {label}
            </Typography>

            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="top-start"
              tooltipText={tooltipMsg}
              children={
                <span>
                  <HelpOutlineIcon
                    sx={{ color: '#B6B6B6', marginTop: '-2px' }}
                    fontSize={'small'}
                  />
                </span>
              }
            />
          </div>
          <Controller
            render={({ field: { onChange } }) => {
              return (
                <SelectList
                  error={!!errors[name]}
                  helperText={helperText}
                  defaultValue={defaultSelectValue}
                  items={items}
                  label={''}
                  placeholder={placeholder}
                  onChangeItem={(e) => {
                    onChange(
                      name === 'ConnectorTechnicalUser'
                        ? e.clientId
                        : e.subscriptionId
                    )
                  }}
                  keyTitle={keyTitle}
                />
              )
            }}
            name={name}
            control={control}
            rules={rules}
          />
        </>
      )}
    </>
  )
}

// Pass Regex useless escape

const ConnectorInsertForm = ({
  handleSubmit,
  errors,
  control,
  trigger,
  selectedService,
  subscriptions,
  fetchServiceAccountUsers,
  setNewTechnicalUSer,
  onFormSubmitt,
  newUserLoading,
}: // Add an ESLint exception until there is a solution
// eslint-disable-next-line
any) => {
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState<string>()

  const handleTechnicalUserSubmit = () => {
    if (
      selectedValue === t('content.edcconnector.modal.createNewTechnicalUser')
    ) {
      if (newUserLoading) {
        return (
          <Box sx={{ textAlign: 'right', mt: '20px' }}>
            <LoadingButton
              color="primary"
              helperText=""
              helperTextColor="success"
              label=""
              loadIndicator="Processing"
              loading
              onButtonClick={() => {
                // do nothing
              }}
              sx={{ marginLeft: '10px', textTransform: 'none' }}
            />
          </Box>
        )
      } else
        return (
          <Box sx={{ textAlign: 'right', mt: '20px' }}>
            <Button
              variant="contained"
              sx={{ textTransform: 'none' }}
              onClick={onFormSubmitt}
            >
              {t('global.actions.submit')}
            </Button>
          </Box>
        )
    }
  }

  return (
    <Box sx={{ width: '100%' }} className="connector-insert-form">
      <form onSubmit={handleSubmit}>
        {selectedService.type === ConnectType.COMPANY_CONNECTOR && (
          <>
            <Box
              className="stepNumber"
              sx={{ margin: '8px auto', color: '#0f71cb' }}
            >
              <Typography variant="h5" sx={{ color: '#0f71cb' }}>
                1
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ margin: 'auto', textAlign: 'center' }}
            >
              {t('content.edcconnector.modal.technicalUser')}
            </Typography>

            <Box>
              <Radio
                name="radio-buttons"
                label={t(
                  'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                )}
                checked={
                  selectedValue ===
                  t(
                    'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                  )
                }
                value={t(
                  'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                )}
                onChange={(event) => {
                  setSelectedValue(event.target.value)
                }}
                size="small"
                sx={{
                  display: 'flex !important',
                }}
              />
            </Box>
            {selectedValue ===
              t(
                'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
              ) && (
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  type: 'select',
                  name: 'ConnectorTechnicalUser',
                  rules: {
                    required: true,
                  },
                  label: t(
                    'content.edcconnector.modal.insertform.technicalUser.label'
                  ),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.technicalUser.placeholder'
                  ),
                  tooltipMsg: t(
                    'content.edcconnector.modal.insertform.technicalUser.tooltipMsg'
                  ),
                  helperText: t(
                    'content.edcconnector.modal.insertform.technicalUser.error'
                  ),
                  items: fetchServiceAccountUsers?.content,
                  defaultSelectValue: {},
                  keyTitle: 'clientId',
                }}
              />
            )}
            <Box sx={{ mt: 2 }}>
              <Radio
                name="radio-buttons"
                label={t('content.edcconnector.modal.createNewTechnicalUser')}
                checked={
                  selectedValue ===
                  t('content.edcconnector.modal.createNewTechnicalUser')
                }
                value={t('content.edcconnector.modal.createNewTechnicalUser')}
                onChange={(event) => {
                  setSelectedValue(event.target.value)
                  setNewTechnicalUSer(true)
                }}
                size="small"
                sx={{
                  display: 'flex !important',
                }}
              />
            </Box>
            {selectedValue ===
              t('content.edcconnector.modal.createNewTechnicalUser') && (
              <>
                <ConnectorFormInput
                  {...{
                    control,
                    trigger,
                    errors,
                    type: 'input',
                    name: 'TechnicalUserName',
                    rules: {
                      required: true,
                      pattern: Patterns.connectors.NAME,
                    },
                    helperText: t(
                      'content.edcconnector.modal.insertform.UserName.error'
                    ),
                    patternError: {
                      lengthError: t(
                        'content.edcconnector.modal.insertform.UserName.patternError.lengthError'
                      ),
                      otherError: t(
                        'content.edcconnector.modal.insertform.UserName.patternError.otherError'
                      ),
                    },
                    label: t(
                      'content.edcconnector.modal.insertform.UserName.label'
                    ),
                    placeholder: t(
                      'content.edcconnector.modal.insertform.UserName.placeholder'
                    ),
                    tooltipMsg: t(
                      'content.edcconnector.modal.insertform.UserName.tooltipMsg'
                    ),
                  }}
                />
                <ConnectorFormInput
                  {...{
                    control,
                    trigger,
                    errors,
                    type: 'input',
                    name: 'TechnicalUserDescription',
                    rules: {
                      required: true,
                      pattern: Patterns.connectors.NAME,
                    },
                    helperText: t(
                      'content.edcconnector.modal.insertform.description.error'
                    ),
                    patternError: {
                      lengthError: t(
                        'content.edcconnector.modal.insertform.description.patternError.lengthError'
                      ),
                      otherError: t(
                        'content.edcconnector.modal.insertform.description.patternError.otherError'
                      ),
                    },
                    label: t(
                      'content.edcconnector.modal.insertform.description.label'
                    ),
                    placeholder: t(
                      'content.edcconnector.modal.insertform.description.placeholder'
                    ),
                    tooltipMsg: t(
                      'content.edcconnector.modal.insertform.description.tooltipMsg'
                    ),
                  }}
                />
              </>
            )}
            {handleTechnicalUserSubmit()}
            <Box
              className="stepNumber"
              sx={{ margin: '16px auto 8px', color: '#0f71cb' }}
            >
              <Typography variant="h5" sx={{ color: '#0f71cb' }}>
                2
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ margin: 'auto', textAlign: 'center' }}
            >
              {t('content.edcconnector.modal.connectorRegistrationDetails')}
            </Typography>
          </>
        )}
        <ConnectorFormInput
          {...{
            control,
            trigger,
            errors,
            type: 'input',
            name: 'ConnectorName',
            rules: {
              required: true,
              pattern: Patterns.connectors.NAME,
            },
            helperText: t('content.edcconnector.modal.insertform.name.error'),
            patternError: {
              lengthError: t(
                'content.edcconnector.modal.insertform.name.patternError.lengthError'
              ),
              otherError: t(
                'content.edcconnector.modal.insertform.name.patternError.otherError'
              ),
            },
            label: t('content.edcconnector.modal.insertform.name.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.name.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.name.tooltipMsg'
            ),
          }}
        />
        <ConnectorFormInput
          {...{
            control,
            trigger,
            errors,
            type: 'input',
            name: 'ConnectorURL',
            rules: {
              required: true,
              pattern: Patterns.URL,
            },
            helperText: t('content.edcconnector.modal.insertform.url.error'),
            label: t('content.edcconnector.modal.insertform.url.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.url.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.url.tooltipMsg'
            ),
          }}
        />
        <ConnectorFormInput
          {...{
            control,
            trigger,
            errors,
            type: 'input',
            name: 'ConnectorLocation',
            rules: {
              required: true,
              pattern: Patterns.connectors.COUNTRY,
            },
            helperText: t(
              'content.edcconnector.modal.insertform.country.error'
            ),
            label: t('content.edcconnector.modal.insertform.country.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.country.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.country.tooltipMsg'
            ),
          }}
        />
        {selectedService &&
          selectedService.type === ConnectType.MANAGED_CONNECTOR && (
            <ConnectorFormInput
              {...{
                control,
                trigger,
                errors,
                type: 'select',
                name: 'ConnectorSubscriptionId',
                rules: {
                  required: true,
                },
                label: t(
                  'content.edcconnector.modal.insertform.subscription.label'
                ),
                placeholder: t(
                  'content.edcconnector.modal.insertform.subscription.placeholder'
                ),
                tooltipMsg: t(
                  'content.edcconnector.modal.insertform.subscription.tooltipMsg'
                ),
                helperText: t(
                  'content.edcconnector.modal.insertform.subscription.error'
                ),
                items: subscriptions,
                defaultSelectValue: {},
                keyTitle: 'name',
              }}
            />
          )}
      </form>
    </Box>
  )
}

export default ConnectorInsertForm
