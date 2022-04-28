import { useTranslation } from 'react-i18next'
import { Input } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useFormValidation } from 'hooks/useFormValidation'

export const SingleUserContent = () => {
  const { t } = useTranslation()

  const userInputs = [
    {
      key: 'firstname',
      label: t('global.field.first'),
      placeholder: t('global.field.first'),
      helperText: '',
      pattern: /^([A-Za-zÀ-ÿ-,.']{1,40}[ ]?){1,8}$/i,
    },
    {
      key: 'lastname',
      label: t('global.field.last'),
      placeholder: t('global.field.last'),
      helperText: '',
      pattern: /^([A-Za-zÀ-ÿ-,.']{1,40}[ ]?){1,8}$/i,
    },
    {
      key: 'email',
      label: t('global.field.email'),
      placeholder: t('global.field.email'),
      helperText: '',
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  ]

  const { handleChange, errors, valid } = useFormValidation(userInputs)

  console.log(errors)
  console.log(valid)

  return (
    <Box sx={{ marginTop: '30px' }}>
      {userInputs.map(({ label, placeholder, helperText, key }) => (
        <Input
          sx={{ marginBottom: '30px' }}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={errors[key]}
          onChange={handleChange(key)}
          key={key}
        />
      ))}
    </Box>
  )
}
