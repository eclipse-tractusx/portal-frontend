import { useState } from 'react'
import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { useTranslation } from 'react-i18next'
import BusinessPartnerDetailOverlay from './BusinessPartnerDetailOverlay'
import { GridCellParams } from '@mui/x-data-grid'
import { PartnerNetworkDataGrid } from 'features/partnerNetwork/types'
import { PartnerList } from './components/PartnerList'
import { useFetchBusinessPartnersQuery } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { PageHeader } from 'cx-portal-shared-components'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  const [selectedBPN, setSelectedBPN] = useState<PartnerNetworkDataGrid>(
    {} as PartnerNetworkDataGrid
  )

  const [expr, setExpr] = useState<string>('')

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      setSelectedBPN(params.row as PartnerNetworkDataGrid)
      setOverlayOpen(true)
    }
  }

  return (
    <main className="partner-network-page-container">
      <BusinessPartnerDetailOverlay
        {...{
          selectedRowBPN: selectedBPN,
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
      <PageHeader
        title={t('content.partnernetwork.headertitle')}
        topPage={false}
        headerHeight={200}
      ></PageHeader>

      <section>
        <PartnerList
          fetchHook={useFetchBusinessPartnersQuery}
          fetchHookArgs={{ expr }}
          onSearch={(searchText: string) => {
            setExpr(searchText)
          }}
          onTableCellClick={onTableCellClick}
        />
      </section>
    </main>
  )
}

export default PartnerNetwork
