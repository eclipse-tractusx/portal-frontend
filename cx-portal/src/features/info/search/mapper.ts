import { AppMarketplaceApp } from 'features/apps/marketplace/types'
import { BusinessPartner } from 'features/partnerNetwork/types'
import { SearchCategory, SearchItem } from './types'

export const businessPartnerToSearchItem = (
  item: BusinessPartner
): SearchItem => ({
  id: item.bpn,
  category: SearchCategory.BP,
  title: item.names[0]?.value,
})

export const appToSearchItem = (item: AppMarketplaceApp): SearchItem => ({
  id: item.id,
  category: SearchCategory.APP,
  title: `${item.provider} - ${item.title}`,
})
