import DownloadIcon from '@mui/icons-material/Download'
import { Button, Typography } from 'cx-portal-shared-components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

interface DownloadLinkProps {
  urn: string
  type: string
  title?: string
}
const DownloadLink = ({ urn, type, title }: DownloadLinkProps) => {
  const { t } = useTranslation()
  const [file, setFile] = useState<string>('')
  const [error, setError] = useState<string>('')

  const openFile = () => {
    if (urn) {
      const encodedUrn = encodeURIComponent(urn)
      let url = ''
      switch (type) {
        case 'diagram': {
          url = 'diagram'
          break
        }
        case 'ttl': {
          url = 'file'
          break
        }
        case 'json': {
          url = 'json-schema'
          break
        }
        case 'payload': {
          url = 'example-payload'
          break
        }
        case 'docu': {
          url = 'documentation'
          break
        }
      }
      fetch(`${getSemanticApiBase()}hub/api/v1/models/${encodedUrn}/${url}`, getHeaders())
        .then(response => {
          if (!response.ok) {
            setError(t('content.semantichub.detail.fileError'))
          } else {
            return response.blob();
          } 
        })
        .then(result => {
          if(result){
            setFile(URL.createObjectURL(result))
          }
        }
      );
    }
  }

  const openFileInNewTab = (file: string) => {
    if(file.length > 0) window.open(file, '_blank');
  }

  useEffect(() => {
    if(file.length > 0){
      openFileInNewTab(file)
    }
  }, [file])

  return (
    <>
      <Button
        key={`download_${type}`}
        size="small"
        startIcon={<DownloadIcon />}
        variant="text"
        onClick={openFile}
        title={title}
        sx={{ mb: 1 }}
      >
        {t(`content.semantichub.detail.downloads.${type}`)}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </>
  )
}

export default DownloadLink
