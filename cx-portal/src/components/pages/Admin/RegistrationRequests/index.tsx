import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import 'components/pages/Admin/RegistrationRequests/RegistrationRequests.scss'
import { Table } from 'cx-portal-shared-components'
import { selectorUserAdministration } from 'state/features/userAdministration/userAdministrationSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRegistrationRequests } from 'state/features/userAdministration/userAdministrationActions'
import { RegistrationRequestsTableColumns } from 'components/pages/Admin/RegistrationRequests/registrationTableColumns'

const RegistrationRequests = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = RegistrationRequestsTableColumns(useTranslation)

  const { loading, registrationRequests } = useSelector(
    selectorUserAdministration
  )

  useEffect(() => {
    dispatch(fetchRegistrationRequests())
  }, [dispatch])

  return (
    <main className="page-main-container">
      <div className={'table-container'}>
        <Table
          {...{
            loading,
            rows: registrationRequests,
            columns: columns,
            title: `${t('content.admin.registration-requests.tabletitle')} (${
              registrationRequests.length
            })`,
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            toolbar: {
              onSearch: (value) => console.log(`search: "${value}"`),
              onFilter: (selectedFilter) =>
                console.log('filter:', selectedFilter),
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

export default RegistrationRequests
