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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Input } from 'cx-portal-shared-components'

const ConnectorFormInput = ({
  control,
  trigger,
  errors,
  helperText,
  label,
  placeholder,
  name,
  rules,
}: any) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Input
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
  )
}

// Pass Regex useless escape
/* eslint-disable no-useless-escape */
const ConnectorInsertForm = ({
  handleSubmit,
  errors,
  control,
  trigger,
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
            <div className="form-input">
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'ConnectorName',
                  rules: {
                    required: true,
                  },
                  helperText: t(
                    'content.edcconnector.modal.insertform.name.error'
                  ),
                  label: t('content.edcconnector.modal.insertform.name.label'),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.name.placeholder'
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
                    pattern:
                      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/gm,
                  },
                  helperText: t(
                    'content.edcconnector.modal.insertform.url.error'
                  ),
                  label: t('content.edcconnector.modal.insertform.url.label'),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.url.placeholder'
                  ),
                }}
              />
            </div>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConnectorInsertForm
