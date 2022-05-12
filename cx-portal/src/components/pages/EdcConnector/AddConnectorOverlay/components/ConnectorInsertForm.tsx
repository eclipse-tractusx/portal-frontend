import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Input } from 'cx-portal-shared-components'

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
    <Box sx={{ width: '100%' }} className='connector-insert-form'>
      <Grid container spacing={1.5} style={{ marginTop: '-60px' }}>
        <Grid
          xs={12}
          item
          style={{
            padding: spacing(2),
          }}
        >
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-input'>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['ConnectorName']}
                    helperText={t(
                      'content.edcconnector.modal.insertform.name.error',
                    )}
                    label={t(
                      'content.edcconnector.modal.insertform.name.label',
                    )}
                    placeholder={t(
                      'content.edcconnector.modal.insertform.name.placeholder',
                    )}
                    onChange={(event) => {
                      trigger('ConnectorName')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
                name='ConnectorName'
                control={control}
                rules={{
                  required: true,
                }}
              />
            </div>

            <div className='form-input'>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['ConnectorID']}
                    helperText={t(
                      'content.edcconnector.modal.insertform.id.error',
                    )}
                    label={t('content.edcconnector.modal.insertform.id.label')}
                    placeholder={t(
                      'content.edcconnector.modal.insertform.id.placeholder',
                    )}
                    onChange={(event) => {
                      trigger('ConnectorID')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
                name='ConnectorID'
                control={control}
                rules={{
                  required: true,
                }}
              />
            </div>
            <div className='form-input'>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['ConnectorURL']}
                    helperText={t(
                      'content.edcconnector.modal.insertform.url.error',
                    )}
                    label={t('content.edcconnector.modal.insertform.url.label')}
                    placeholder={t(
                      'content.edcconnector.modal.insertform.url.placeholder',
                    )}
                    onChange={(event) => {
                      trigger('ConnectorURL')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
                name='ConnectorURL'
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/gm,
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
