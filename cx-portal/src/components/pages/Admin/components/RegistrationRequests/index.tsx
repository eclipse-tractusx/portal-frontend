import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table,
  Typography,
  PageHeader,
  Button,
} from 'cx-portal-shared-components'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchRegistrationRequests,
  fetchCompanyDetail,
  approveRequest,
  declineRequest,
} from 'features/admin/registration/actions'
import { RegistrationRequestsTableColumns } from 'components/pages/Admin/components/RegistrationRequests/registrationTableColumns'
import './RegistrationRequests.scss'
import { GridCellParams } from '@mui/x-data-grid'
import CompanyDetailOverlay from './CompanyDetailOverlay'
import ConfirmationOverlay from './ConfirmationOverlay/ConfirmationOverlay'
import uniqueId from 'lodash/uniqueId'

export default function RegistrationRequests() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize] = useState<number>(10)

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const [selectedRequestId, setSelectedRequestId] = useState<string>()
  const [actionType, setActionType] = useState<string>('approve')

  const { loading, registrationRequests, paginationData } = useSelector(
    adminRegistrationSelector
  )

  useEffect(() => {
    const params = { size: pageSize, page: currentPage }
    dispatch(fetchRegistrationRequests({ params }))
  }, [dispatch, currentPage, pageSize])

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      dispatch(fetchCompanyDetail(params.row.applicationId))
      setOverlayOpen(true)
    }
  }

  const onApproveClick = (id: string) => {
    setConfirmModalOpen(true)
    setSelectedRequestId(id)
  }

  const onDeclineClick = (id: string) => {
    setConfirmModalOpen(true)
    setActionType('decline')
    setSelectedRequestId(id)
  }

  const makeActionSelectedRequest = async () => {
    if (actionType === 'approve' && selectedRequestId)
      await dispatch(approveRequest(selectedRequestId))
    if (actionType === 'decline' && selectedRequestId)
      await dispatch(declineRequest(selectedRequestId))

    const params = { size: pageSize, page: 0 }
    dispatch(fetchRegistrationRequests({ params }))

    setConfirmModalOpen(false)
  }

  const columns = RegistrationRequestsTableColumns(
    useTranslation,
    onApproveClick,
    onDeclineClick
  )

  return (
    <main className="page-main-container">
      <CompanyDetailOverlay
        {...{
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
      <ConfirmationOverlay
        openDialog={confirmModalOpen}
        handleOverlayClose={() => setConfirmModalOpen(false)}
        handleConfirmClick={() => makeActionSelectedRequest()}
      />

      {/* Page header title and background color */}
      <PageHeader
        title={t('content.admin.registration-requests.headertitle')}
        topPage={false}
        headerHeight={200}
      />

      {/* Adding additional text to introduce the page function */}
      <Typography variant="body2" mt={3} align="center">
        {t('content.admin.registration-requests.introText1')}
      </Typography>
      <Typography variant="body2" mb={3} align="center">
        {t('content.admin.registration-requests.introText2')}
      </Typography>

      {/* Table component */}
      <div className={'table-container'}>
        <Table
          {...{
            loading,
            rows: registrationRequests,
            columns: columns,
            rowsCount: registrationRequests.length,
            toolbarVariant: 'premium',
            title: t('content.admin.registration-requests.tabletitle'),
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
          getRowId={(row) => uniqueId(row.applicationId)}
        />
      </div>
      <div className="load-more-button-container">
        {paginationData.totalElements > pageSize * (currentPage + 1) &&
          paginationData.totalElements! > pageSize && (
            <Button
              size="medium"
              onClick={() => setCurrentPage((prevState) => prevState + 1)}
            >
              {t('content.partnernetwork.loadmore')}
            </Button>
          )}
      </div>
    </main>
  )
}
