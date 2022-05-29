import { CardItems, SearchItem } from 'cx-portal-shared-components'
import { TenantUser } from 'features/admin/user/types'
import { AppMarketplaceApp } from 'features/apps/marketplace/types'
import { BusinessPartner } from 'features/partnerNetwork/types'
import { SearchCategory } from './types'

export const appToSearchItem = (item: AppMarketplaceApp): SearchItem => ({
  id: item.id,
  category: SearchCategory.APP,
  title: `${item.provider} | ${item.title}`,
})

export const newsToSearchItem = (item: CardItems): SearchItem => ({
  id: item.id || '0',
  category: SearchCategory.NEWS,
  title: `${item.title} | ${item.subtitle}`,
})

export const userToSearchItem = (item: TenantUser): SearchItem => ({
  id: item.userEntityId,
  category: SearchCategory.USER,
  title: `${item.firstName} ${item.lastName} <${item.email}>`,
})

export const businessPartnerToSearchItem = (
  item: BusinessPartner
): SearchItem => ({
  id: item.bpn,
  category: SearchCategory.PARTNER,
  title: `${item.bpn} | ${item.names[0]?.value}`,
})
