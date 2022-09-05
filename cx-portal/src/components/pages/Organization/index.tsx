import { PageHeader } from 'cx-portal-shared-components'
import { StaticTable, TableType } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import CompanyDetails from './CompanyDetails'
import AppSubscriptions from './AppSubscriptions'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import './Organization.scss'
import { OVERLAYS } from 'types/Constants'
import {
  useFetchActiveAppsQuery,
  useFetchSubscriptionStatusQuery,
} from 'features/apps/apiSlice'
import { appToStatus } from 'features/apps/mapper'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import LoadingError from './LoadingError'
import { companyDetailsToCards } from 'features/admin/mapper'

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    data: subscriptionStatus,
    isError,
    isLoading,
  } = useFetchSubscriptionStatusQuery()
  const { data } = useFetchActiveAppsQuery()
  const appSubscribedData =
    subscriptionStatus && appToStatus(data!, subscriptionStatus!)
  const {
    data: companyDetails,
    isError: companyDetailsError,
    isLoading: companyDetailsLoading,
  } = useFetchOwnCompanyDetailsQuery()
  const companyDetailsData =
    companyDetails && companyDetailsToCards(companyDetails)

  const handleClick = (id: string | undefined) => {
    dispatch(show(OVERLAYS.APP, id, t('content.organization.company.title')))
  }

  const companyDetailsTableBody =
    companyDetailsData?.map((details) => [
      () => <CompanyDetails head={t(details.head)} data={details.data} />,
    ]) || []

  const organizationTableData: TableType = {
    head: [t('content.organization.company.title')],
    body: companyDetailsTableBody,
  }

  const appSubscriptionsTableBody =
    appSubscribedData?.map((app) => [
      () => (
        <AppSubscriptions
          image={app.image}
          onButtonClick={() => handleClick(app.id)}
          name={app.title}
          provider={app.provider}
          status={app.status}
        />
      ),
    ]) || []

  const appSubscriptionsTableData: TableType = {
    head: [t('content.organization.subscriptions.title')],
    body: appSubscriptionsTableBody,
  }

  return (
    <main>
      <PageHeader
        title={t('pages.organization')}
        topPage={false}
        headerHeight={200}
      ></PageHeader>
      <div className="organization-main">
        <div className="organization-content">
          <StaticTable data={organizationTableData} horizontal={false} />
          <LoadingError
            isLoading={companyDetailsLoading}
            isError={companyDetailsError}
            errorText={t('content.organization.company.error')}
          />
        </div>
        <div className="organization-content">
          <StaticTable data={appSubscriptionsTableData} horizontal={false} />
          <LoadingError
            isLoading={isLoading}
            isError={isError}
            errorText={t('content.organization.subscriptions.error')}
          />
        </div>
      </div>
    </main>
  )
}
