import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import 'components/pages/Admin/RegistrationRequests/RegistrationRequests.scss'
import { Table, Typography } from 'cx-portal-shared-components'
import { selectorUserAdministration } from 'state/features/userAdministration/userAdministrationSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRegistrationRequests } from 'state/features/userAdministration/userAdministrationActions'
import { RegistrationRequestsTableColumns } from 'components/pages/Admin/RegistrationRequests/registrationTableColumns'
import { RootState } from 'state/store'
import RegistrationRequestHeaderBgImage from 'assets/images/registration-requests-header-background.png'

const RegistrationRequests = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = RegistrationRequestsTableColumns(useTranslation)
  const token = useSelector((state: RootState) => state.user.token)

  const { loading, registrationRequests } = useSelector(
    selectorUserAdministration
  )

  useEffect(() => {
    if (token) {
      dispatch(fetchRegistrationRequests(token))
    }
  }, [dispatch, token])

  return (
    <main className="page-main-container">
      <div className="header-section-2">
        <div className="header-content">
          <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h4">
            {t('content.admin.registration-requests.headertitle')}
          </Typography>
        </div>
        <img
          src={RegistrationRequestHeaderBgImage}
          alt="Registration Requests Background"
          className="object-fit x-left-40"
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

export default RegistrationRequests
