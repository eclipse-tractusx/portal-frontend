import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

interface ComponentProps {
  title: string
}

export default function SubHeaderTitle({ title }: ComponentProps) {
  const { t } = useTranslation()

  return (
    <Typography
      sx={{ fontFamily: 'LibreFranklin-Light' }}
      variant="h3"
      className="section-title"
    >
      {t(title)}
    </Typography>
  )
}
