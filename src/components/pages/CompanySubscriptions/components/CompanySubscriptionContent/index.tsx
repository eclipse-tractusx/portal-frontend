import { ImageGallery, Typography } from '@catena-x/portal-shared-components'
import { type AppDetails } from 'features/apps/types'
import { useTranslation } from 'react-i18next'
import CommonService from 'services/CommonService'

export default function CompanySubscriptionContent({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h3" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
        {'Long description'}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {detail.longDescription}
      </Typography>
      <div id="image-gallery">
        <div className="divider-height" />
        {/* TODO: update issue when only single image is available */}
        <ImageGallery
          gallery={CommonService.imagesAndAppidToImageType(
            detail.images,
            detail.id
          )}
          modalWidth="900"
        />
      </div>
      <div className="useCase">
        <Typography variant="label2">
          {t('content.appdetail.language')}:
        </Typography>
        <Typography variant="caption2" sx={{ pb: 2, ml: 1 }}>
          {detail.languages?.map((lang, index) => (
            <span key={lang}>
              {` ${index ? ', ' : ''}${lang.toUpperCase()} `}
            </span>
          ))}
        </Typography>
      </div>
    </>
  )
}
