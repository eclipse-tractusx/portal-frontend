/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { Box, Grid, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Input, Tooltips } from 'cx-portal-shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Patterns from 'types/Patterns'
import { ConnectType } from 'features/connector/connectorApiSlice'

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
}: any) => {
  return (
    <>
      <div
        style={{
          marginLeft: '50px',
          position: 'relative',
          top: '25px',
          zIndex: '9',
        }}
      >
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={tooltipMsg}
          children={
            <span>
              <HelpOutlineIcon fontSize={'small'} />
            </span>
          }
        />
      </div>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Input
            sx={{
              paddingTop: '10px',
            }}
            error={!!errors[name]}
            helperText={helperText}
            label={label}
            placeholder={placeholder}
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            value={value}
          />
        )}
        name={name}
        control={control}
        rules={rules}
      />
    </>
  )
}

// Pass Regex useless escape
/* eslint-disable no-useless-escape */
const ConnectorInsertForm = ({
  handleSubmit,
  errors,
  control,
  trigger,
  selectedService,
}: any) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme

  return (
    <Box sx={{ width: '100%' }} className="connector-insert-form">
      <Grid container spacing={1.5} style={{ marginTop: '-60px' }}>
        <Grid
          xs={12}
          item
          style={{
            padding: spacing(2),
          }}
        >
          <form onSubmit={handleSubmit} className="form">
            <div
              className="form-input"
              style={{
                paddingTop: '40px',
              }}
            >
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'ConnectorName',
                  rules: {
                    required: true,
                    pattern: Patterns.connectors.NAME,
                  },
                  helperText: t(
                    'content.edcconnector.modal.insertform.name.error'
                  ),
                  label: t('content.edcconnector.modal.insertform.name.label'),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.name.placeholder'
                  ),
                  tooltipMsg: t(
                    'content.edcconnector.modal.insertform.name.tooltipMsg'
                  ),
                }}
              />
            </div>
            <div className="form-input">
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'ConnectorURL',
                  rules: {
                    required: true,
                    pattern: Patterns.URL,
                  },
                  helperText: t(
                    'content.edcconnector.modal.insertform.url.error'
                  ),
                  label: t('content.edcconnector.modal.insertform.url.label'),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.url.placeholder'
                  ),
                  tooltipMsg: t(
                    'content.edcconnector.modal.insertform.url.tooltipMsg'
                  ),
                }}
              />
            </div>
            <div className="form-input">
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'ConnectorLocation',
                  rules: {
                    required: true,
                    pattern: Patterns.connectors.COUNTRY,
                  },
                  helperText: t(
                    'content.edcconnector.modal.insertform.country.error'
                  ),
                  label: t(
                    'content.edcconnector.modal.insertform.country.label'
                  ),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.country.placeholder'
                  ),
                  tooltipMsg: t(
                    'content.edcconnector.modal.insertform.country.tooltipMsg'
                  ),
                }}
              />
            </div>
            {selectedService &&
              selectedService.type === ConnectType.MANAGED_CONNECTOR && (
                <div className="form-input">
                  <ConnectorFormInput
                    {...{
                      control,
                      trigger,
                      errors,
                      name: 'ConnectorBPN',
                      rules: {
                        required: true,
                        pattern: Patterns.BPN,
                      },
                      helperText: t(
                        'content.edcconnector.modal.insertform.bpn.error'
                      ),
                      label: t(
                        'content.edcconnector.modal.insertform.bpn.label'
                      ),
                      placeholder: t(
                        'content.edcconnector.modal.insertform.bpn.placeholder'
                      ),
                      tooltipMsg: t(
                        'content.edcconnector.modal.insertform.bpn.tooltipMsg'
                      ),
                    }}
                  />
                </div>
              )}
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConnectorInsertForm
