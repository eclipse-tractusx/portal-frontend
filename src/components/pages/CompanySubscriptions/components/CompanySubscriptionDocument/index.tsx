import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { DocumentTypeId } from 'features/appManagement/apiSlice'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import { type AppDetails, type Documents } from 'features/apps/types'
import { download } from 'utils/downloadUtils'

export default function CompanySubscriptionDocument({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById({
        appId: detail.id,
        documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }
  return (
    <div id="documents">
      <div className="divider-height" />
      <Typography variant="h3">
        {t('content.appdetail.howtouse.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.appdetail.howtouse.message')}
      </Typography>
      {detail.documents.hasOwnProperty(
        DocumentTypeId.APP_TECHNICAL_INFORMATION
      ) ||
      detail.documents.hasOwnProperty(DocumentTypeId.APP_CONTRACT) ||
      detail.documents.hasOwnProperty(DocumentTypeId.ADDITIONAL_DETAILS) ? (
        Object.keys(detail.documents).map(
          (document) =>
            (document === DocumentTypeId.APP_TECHNICAL_INFORMATION ||
              document === DocumentTypeId.APP_CONTRACT ||
              document === DocumentTypeId.ADDITIONAL_DETAILS) && (
              <li key={document} className="document-list doc-list">
                <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                <button
                  className="document-button-link"
                  onClick={() =>
                    handleDownloadClick(
                      detail.documents[document as keyof Documents][0]
                        .documentId,
                      detail.documents[document as keyof Documents][0]
                        .documentName
                    )
                  }
                >
                  {
                    detail.documents[document as keyof Documents][0]
                      .documentName
                  }
                </button>
              </li>
            )
        )
      ) : (
        <Typography variant="label3" className="not-available">
          {t('global.errors.noDocumentsAvailable')}
        </Typography>
      )}
    </div>
  )
}
