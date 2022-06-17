import DownloadIcon from '@mui/icons-material/Download'
import { Typography } from 'cx-portal-shared-components';
import { useTranslation } from 'react-i18next';

interface DownloadLinkProps{
  type: string,
  href: string | undefined
}
const DownloadLink = ({type, href}: DownloadLinkProps) => {
  const {t} = useTranslation();

  return(
    <a
      key={`download_${type}`}
      style={{ display: 'flex', marginBottom: '16px' }}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <DownloadIcon sx={{ mr: '20px', alignItems: 'center' }} />
      <Typography>
        {t(`content.semantichub.detail.downloads.${type}`)}
      </Typography>
    </a>
  )
}

export default DownloadLink;