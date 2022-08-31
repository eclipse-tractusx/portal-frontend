import { PageHeader } from 'cx-portal-shared-components'
import { StaticTable, TableType } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import CompanyDetails from './CompanyDetails'
import AppSubscriptions from './AppSubscriptions'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import './Organization.scss'
import { OVERLAYS } from 'types/Constants'
import { useTheme, CircularProgress } from '@mui/material'
import {
  useFetchActiveAppsQuery,
  useFetchSubscriptionStatusQuery,
} from 'features/apps/apiSlice'
import { appToStatus } from 'features/apps/mapper'

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const subscriptionStatus = useFetchSubscriptionStatusQuery().data
  const { data } = useFetchActiveAppsQuery()
  const appSubscribedData =
    subscriptionStatus && appToStatus(data!, subscriptionStatus!)
  const handleClick = (id: string | undefined) => {
    dispatch(show(OVERLAYS.APP, id, t('content.organization.company.title')))
  }

  const organizationTableData: TableType = {
    head: [t('content.organization.company.title')],
    body: [
      [() => <CompanyDetails head="Company Name: " data="This company name" />],
      [() => <CompanyDetails head="Address: " data="This company name" />],
      [() => <CompanyDetails head="City: " data="This company name" />],
      [() => <CompanyDetails head="Company Name: " data="This company name" />],
      [() => <CompanyDetails head="BPN: " data="This company name" />],
    ],
  }
  // let appSubscriptionsTableBody;
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
        </div>
        <div className="organization-content">
          <StaticTable data={appSubscriptionsTableData} horizontal={false} />
          {!subscriptionStatus && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress
                size={50}
                sx={{
                  color: theme.palette.primary.main,
                  zIndex: 1,
                  position: 'absolute',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
