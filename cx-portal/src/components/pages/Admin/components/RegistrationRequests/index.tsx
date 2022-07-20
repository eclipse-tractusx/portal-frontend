import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Typography, PageHeader } from 'cx-portal-shared-components'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchRegistrationRequests,
  fetchCompanyDetail,
} from 'features/admin/registration/actions'
import { RegistrationRequestsTableColumns } from 'components/pages/Admin/components/RegistrationRequests/registrationTableColumns'
import './RegistrationRequests.scss'
import { GridCellParams } from '@mui/x-data-grid'
import CompanyDetailOverlay from './CompanyDetailOverlay'

export default function RegistrationRequests() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = RegistrationRequestsTableColumns(useTranslation)
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize] = useState<number>(100)

  const { loading, registrationRequests } = useSelector(
    adminRegistrationSelector
  )

  useEffect(() => {
    const params = {
      ...{ size: pageSize, page: currentPage },
    }
    dispatch(fetchRegistrationRequests({ params }))
  }, [dispatch, currentPage, pageSize])

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      dispatch(fetchCompanyDetail('0195a85f-e465-4571-b980-d1351dd76a9f'))
      setOverlayOpen(true)
    }
  }

  return (
    <main className="page-main-container">
      <CompanyDetailOverlay
        {...{
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
      <PageHeader
        title={t('content.admin.registration-requests.headertitle')}
        topPage={false}
        headerHeight={200}
      />
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
            rowsCount: registrationRequests.length,
            title: `${t('content.admin.registration-requests.tabletitle')}`,
            headerHeight: 76,
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            onCellClick: (params: GridCellParams) => onTableCellClick(params),
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
