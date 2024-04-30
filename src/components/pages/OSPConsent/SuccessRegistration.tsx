import { useNavigate } from 'react-router-dom'
import { useMediaQuery, useTheme } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import { Button, Typography } from '@nidhi.garg/portal-shared-components'
import RegistrationStatusList from 'components/shared/frame/Header/RegistrationReviewOverlay/RegistrationReviewContent/RegistrationStatusList'
import { type ApplicationResponse } from 'features/registration/registrationApiSlice'

export const SuccessRegistration = ({
  applicationData,
}: {
  applicationData: ApplicationResponse[]
}) => {
  const { t } = useTranslation('registration')
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  return (
    <div className="registration-confirmation">
      <Typography variant={isMobile ? 'h4' : 'h3'}>
        {t('osp.success.heading')}
      </Typography>
      <Trans>
        <Typography variant="body2" className="description">
          {t('osp.success.description')}
        </Typography>
      </Trans>
      <div className="statusDetails">
        <Typography variant="h5" className="stepTitle">
          {t('osp.success.stepTitle')}
        </Typography>
        {applicationData?.[0] && (
          <RegistrationStatusList
            checklist={applicationData[0].applicationChecklist}
          />
        )}
      </div>
      <div className="homeBtn">
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            navigate('/home')
          }}
        >
          {t('osp.success.homepage')}
        </Button>
      </div>
    </div>
  )
}
