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

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleClick = (id: string) => {
    dispatch(show(OVERLAYS.APP, id, 'Company Details'))
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

  const appSubscriptionsTableData: TableType = {
    head: [t('content.organization.subscriptions.title')],
    body: [
      [
        () => (
          <AppSubscriptions
            onButtonClick={() =>
              handleClick('ac1cf001-7fbc-1f2f-817f-bce05744000b')
            }
            name="App Name "
            provider="App Provider Name"
            status="In Porgress"
          />
        ),
      ],
    ],
  }
  return (
    <main>
      <PageHeader
        title={t('pages.organization')}
        topPage={false}
        headerHeight={200}
      ></PageHeader>
      <div className="organization-main">
        {false ? (
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
        ) : (
          <>
            <div className="organization-content">
              <StaticTable data={organizationTableData} horizontal={false} />
            </div>
            <div className="organization-content">
              <StaticTable
                data={appSubscriptionsTableData}
                horizontal={false}
              />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
