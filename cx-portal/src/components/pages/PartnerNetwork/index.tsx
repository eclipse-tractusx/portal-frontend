import { useState } from 'react'
import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { useTranslation } from 'react-i18next'
import { PartnerList } from './components/PartnerList'
import { useFetchBusinessPartnersQuery } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { PageHeader } from 'cx-portal-shared-components'

const PartnerNetwork = () => {
  const { t } = useTranslation()

  const [expr, setExpr] = useState<string>('')

  return (
    <main className="partner-network-page-container">
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
        />
      </section>
    </main>
  )
}

export default PartnerNetwork
