import { CardItems } from 'cx-portal-shared-components'
import { TenantUser } from 'features/admin/user/types'
import { AppMarketplaceApp } from 'features/apps/marketplace/types'
import { BusinessPartner } from 'features/partnerNetwork/types'
import { SearchCategory, SearchItem } from './types'

export const pageToSearchItem = (item: string): SearchItem => ({
  id: item,
  category: SearchCategory.PAGE,
  title: `pages.${item}`,
})

export const appToSearchItem = (item: AppMarketplaceApp): SearchItem => ({
  ...item,
  category: SearchCategory.APP,
  description: item.provider,
})

export const businessPartnerToSearchItem = (
  item: BusinessPartner
): SearchItem => ({
  id: item.bpn,
  category: SearchCategory.PARTNER,
  title: item.names[0]?.value,
  description: item.bpn,
})

export const newsToSearchItem = (item: CardItems): SearchItem => ({
  id: item.id || '0',
  category: SearchCategory.NEWS,
  title: item.title,
  description: item.subtitle,
})

export const userToSearchItem = (item: TenantUser): SearchItem => ({
  id: item.userEntityId,
  category: SearchCategory.USER,
  title: `${item.firstName} ${item.lastName}`,
  description: item.email,
})
