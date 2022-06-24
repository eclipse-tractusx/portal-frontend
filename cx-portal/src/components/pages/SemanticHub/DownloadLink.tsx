import DownloadIcon from '@mui/icons-material/Download'
import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

interface DownloadLinkProps {
  type: string
  onClick: (type: string) => void
  title?: string
}
const DownloadLink = ({ type, onClick, title }: DownloadLinkProps) => {
  const { t } = useTranslation()

  return (
    <Button
      key={`download_${type}`}
      size="small"
      startIcon={<DownloadIcon />}
      variant="text"
      onClick={() => onClick(type)}
      title={title}
      sx={{ mb: 1 }}
    >
      {t(`content.semantichub.detail.downloads.${type}`)}
    </Button>
  )
}

export default DownloadLink
