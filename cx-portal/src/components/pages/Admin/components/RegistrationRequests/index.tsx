import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Typography } from 'cx-portal-shared-components'
import { userAdministrationSelector } from 'state/features/userAdministration/slice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRegistrationRequests } from 'state/features/userAdministration/actions'
import { RegistrationRequestsTableColumns } from 'components/pages/Admin/components/RegistrationRequests/registrationTableColumns'
import './RegistrationRequests.scss'

export default function RegistrationRequests() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = RegistrationRequestsTableColumns(useTranslation)

  const { loading, registrationRequests } = useSelector(
    userAdministrationSelector
  )

  useEffect(() => {
    dispatch(fetchRegistrationRequests())
  }, [dispatch])

  return (
    <main className="page-main-container">
      <div className="header-section">
        <div className="header-content">
          <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h4">
            {t('content.admin.registration-requests.headertitle')}
          </Typography>
        </div>
        <img
          src="./stage-header-background.png"
          alt="Registration Requests Background"
        />
      </div>
      <div className="page-title-container">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="page-title"
        >
          {t('content.admin.registration-requests.pagetitle')}
        </Typography>
      </div>
      <div className={'table-container'}>
        <Table
          {...{
            loading,
            rows: registrationRequests,
            columns: columns,
            title: `${t('content.admin.registration-requests.tabletitle')}`,
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            toolbar: {
              onSearch: () => {},
              onFilter: () => {},
              filter: [
                {
                  name: 'state',
                  values: [
                    {
                      value: 'pending',
                      label: t('content.admin.registration-requests.pending')
                        .trim()
                        .replace(/^\w/, (c) => c.toUpperCase()),
                    },
                    {
                      value: 'confirmed',
                      label: t(
                        'content.admin.registration-requests.cellconfirmed'
                      )
                        .trim()
                        .replace(/^\w/, (c) => c.toUpperCase()),
                    },
                    {
                      value: 'declined',
                      label: t(
                        'content.admin.registration-requests.celldeclined'
                      )
                        .trim()
                        .replace(/^\w/, (c) => c.toUpperCase()),
                    },
                  ],
                },
              ],
            },
          }}
          getRowId={(row) => row.applicationId}
        />
      </div>
    </main>
  )
}
