import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ConnectorTableColumns } from 'components/pages/Connector/connectorTableColumns'
import { GridCellParams } from '@mui/x-data-grid'
import UserService from 'services/UserService'
import PageHeader from 'components/shared/frame/PageHeader'
import { Table } from 'cx-portal-shared-components'
import connectorSlice, {
  connectorSelector,
} from 'state/features/connector/slice'
import { fetchConnectors } from 'state/features/connector/actions'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import PictureWithText from 'components/shared/frame/PictureWithText'
import './Connector.scss'
import AddConnectorOverlay from './AddConnectorOverlay'

const Connector = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = ConnectorTableColumns(useTranslation)
  const [addConnectorOverlayOpen, setAddConnectorOverlayOpen] = useState<boolean>(false)
  const [currentPage] = useState<number>(0)
  const [addConnectorOverlayCurrentStep, setAddConnectorOverlayCurrentStep] = useState<number>(0)
  const [pageSize] = useState<number>(10)

  const token = UserService.getToken()
  const { connectorList, loading, paginationData } =
    useSelector(connectorSelector)

  useEffect(() => {
    if (token) {
      //const params = { size: pageSize, page: currentPage }
      dispatch(fetchConnectors())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageSize, currentPage])

  // Reset store data when page init
  useEffect(() => {
    dispatch(connectorSlice.actions.resetConnectorState())
  }, [dispatch])

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      //setSelectedBPN(params.row as PartnerNetworkDataGrid)
      //setOverlayOpen(true)
    }
  }

  const handleOverlayClose = ()=> {
    setAddConnectorOverlayCurrentStep(0)
    setAddConnectorOverlayOpen(false)
  }

  const onConfirmClick = () => {
    setAddConnectorOverlayCurrentStep((prevState) => prevState += 1)
  }


  return (
    <main className='connector-page-container'>
      <AddConnectorOverlay
        openDialog={addConnectorOverlayOpen}
        handleOverlayClose={handleOverlayClose}
        connectorStep={addConnectorOverlayCurrentStep}
        handleConfirmClick={onConfirmClick} />
      <PageHeader translationKey={'content.connector.headertitle'} />
      <section>
        <SubHeaderTitle title={'content.connector.subheadertitle'} />
      </section>
      <section className={'picture-with-text-section'}>
        <PictureWithText text={'content.connector.imagetext'} />
      </section>
      <div className='partner-network-table-container'>
        <Table
          {...{
            rows: connectorList,
            rowsCount: paginationData.totalElements,
            columns: columns,
            title: t('content.connector.tabletitle'),
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            onCellClick: (params: GridCellParams) => onTableCellClick(params),
            loading,
            toolbar: {
              onButtonClick: () => setAddConnectorOverlayOpen(true),
              buttonLabel: 'Add Connector',
              filter: [
                {
                  name: 'country',
                  values: [
                    {
                      value: 'DE',
                      label: t('content.partnernetwork.filters.germany'),
                    },
                    {
                      value: 'Others',
                      label: t('content.partnernetwork.filters.others'),
                    },
                  ],
                },
              ],
            },
          }}
          getRowId={(row) => row.id}
        />
      </div>
    </main>
  )
}

export default Connector
