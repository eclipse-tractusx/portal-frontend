import { PrivacyPolicyType } from 'features/adminBoard/adminBoardApiSlice'
import { useTranslation } from 'react-i18next'
import { Apartment, Person, LocationOn, Web, Info } from '@mui/icons-material'
import { uniqueId } from 'lodash'
import { Typography } from '@catena-x/portal-shared-components'
import { type AppDetails } from 'features/apps/types'

export default function CompanySubscriptionPrivacy({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.privacy',
  })

  const renderPrivacy = (policy: PrivacyPolicyType) => {
    switch (policy) {
      case PrivacyPolicyType.COMPANY_DATA:
        return <Apartment className="policy-icon" />
      case PrivacyPolicyType.USER_DATA:
        return <Person className="policy-icon" />
      case PrivacyPolicyType.LOCATION:
        return <LocationOn className="policy-icon" />
      case PrivacyPolicyType.BROWSER_HISTORY:
        return <Web className="policy-icon" />
      case PrivacyPolicyType.NONE:
        return <Info className="policy-icon" />
      default:
        return <Apartment className="policy-icon" />
    }
  }

  return (
    <div className="appdetail-privacy" id="privacy-policy">
      <div className="divider-height" />
      <div className="privacy-content">
        <Typography variant="h3">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      {detail?.privacyPolicies?.length ? (
        <div className="policies-list app-policies">
          {detail.privacyPolicies.map((policy: PrivacyPolicyType) => (
            <Typography
              variant="body2"
              className="policy-name"
              key={uniqueId(policy)}
            >
              {renderPrivacy(policy)}
              {t(policy)}
            </Typography>
          ))}
        </div>
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t('notSupportedMessage')}
        </Typography>
      )}
    </div>
  )
}
