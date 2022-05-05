import { Typography } from 'cx-portal-shared-components'
import { TypographyProps } from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

interface ComponentProps {
  title: string
}

export default function SubHeaderTitle({ title, variant='body1' }: ComponentProps & TypographyProps) {
  const { t } = useTranslation()

  return (
    <Typography
      sx={{ fontFamily: 'LibreFranklin-Light' }}
      variant={variant}
      className="section-title"
    >
      {t(title)}
    </Typography>
  )
}
