import {
  Button,
  Image,
  LogoGrayData,
  Typography,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { type AppDetails, SubscriptionStatus } from 'features/apps/types'
import CommonService from 'services/CommonService'
import { fetchImageWithToken } from 'services/ImageService'
import { getApiBase } from 'services/EnvironmentService'

export default function CompanySubscriptionHeader({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation()
  const [docId, setDocId] = useState('')

  useEffect(() => {
    if (detail?.leadPictureId) {
      const id = CommonService.isValidPictureId(detail?.leadPictureId)
      setDocId(id)
    }
  }, [detail])

  const renderStatusButton = (status: string) => {
    if (status === SubscriptionStatus.ACTIVE)
      return (
        <Button
          startIcon={<CheckCircleOutlineIcon />}
          size="small"
          sx={{
            backgroundColor: '#B3CB2D',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptions.subscribed')}
        </Button>
      )
    else if (status === SubscriptionStatus.PENDING)
      return (
        <Button
          size="small"
          sx={{
            backgroundColor: '#FFA600',
            pointerEvents: 'none',
            float: 'right',
            borderColor: '#FFA600',
            textTransform: 'none',
          }}
          startIcon={<HourglassEmptyIcon />}
        >
          {t('content.companySubscriptions.requested')}
        </Button>
      )
    else
      return (
        <Button
          startIcon={<UnpublishedIcon />}
          size="small"
          sx={{
            backgroundColor: '#D91E18',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptions.declined')}
        </Button>
      )
  }

  return (
    <Box className="company-subscription-header">
      <div className="lead-image">
        <Image
          src={
            detail?.id
              ? `${getApiBase()}/api/apps/${detail.id}/appDocuments/${docId}`
              : LogoGrayData
          }
          alt={detail.title}
          loader={fetchImageWithToken}
        />
      </div>
      <div className="content">
        <Box sx={{ padding: '11px 12px' }}>
          {renderStatusButton(detail.isSubscribed)}
          <Typography variant="h5" sx={{ color: '#888888' }}>
            {detail.provider}
          </Typography>
          <Typography variant="h4" sx={{}}>
            {detail.title}
          </Typography>
        </Box>
      </div>
    </Box>
  )
}
