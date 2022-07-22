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
