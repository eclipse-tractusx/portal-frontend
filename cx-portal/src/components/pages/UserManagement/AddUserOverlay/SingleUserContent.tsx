import { useTranslation } from 'react-i18next'
import { Input } from 'cx-portal-shared-components'
import { Box } from '@mui/material'

export const SingleUserContent = () => {
  const { t } = useTranslation()
  const userInputs = [
    {
      key: 'firstname',
      label: t('global.field.first'),
      placeholder: t('global.field.first'),
      helperText: '',
    },
    {
      key: 'lastname',
      label: t('global.field.last'),
      placeholder: t('global.field.last'),
      helperText: '',
    },
    {
      key: 'email',
      label: t('global.field.email'),
      placeholder: t('global.field.email'),
      helperText: '',
    },
  ]

  return (
    <Box sx={{ marginTop: '30px' }}>
      {userInputs.map(({ label, placeholder, helperText, key }) => (
        <Input
          sx={{ marginBottom: '30px' }}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          key={key}
        />
      ))}
    </Box>
  )
}
