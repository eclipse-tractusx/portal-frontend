import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SearchInput,
  Typography,
  ViewSelector,
} from 'cx-portal-shared-components'
import { AppListGroupView } from '../AppListGroupView'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from 'state/features/appMarketplace/actions'
import { appMarketplaceSelectActive } from 'state/features/appMarketplace/slice'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PageService from 'services/PageService'
import { itemsSelector } from 'state/features/appFavorites/slice'
import { addItem } from 'state/features/appFavorites/actions'

export const label = 'AppList'

export default function AppListSection() {
  const [group, setGroup] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cards = useSelector(appMarketplaceSelectActive)
  const { t } = useTranslation()

  const favoriteItems = useSelector(itemsSelector)
  const reference = PageService.registerReference(label, useRef(null))

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setGroup(e.currentTarget.value)
  }

  const add2Favorites = (appId: string) => {
    dispatch(addItem(appId))
  }

  const checkIsFavoriteItem = (appId: string) => favoriteItems.includes(appId)

  const categoryViews = [
    {
      buttonText: t('content.appstore.appOverviewSection.categoryViews.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.categoryViews.useCases'
      ),
      buttonValue: 'useCases',
      onButtonClick: setView,
    },
  ]

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <Box ref={reference} className="overview-section">
      <section className="overview-section-content">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.appstore.appOverviewSection.title')}
        </Typography>

        <ViewSelector activeView={group} views={categoryViews} />

        <Box sx={{ textAlign: 'center' }}>
          <SearchInput
            sx={{ minWidth: '544px' }}
            margin={'normal'}
            placeholder={t('content.home.searchSection.inputPlaceholder')}
          />
        </Box>
        <AppListGroupView
          items={cards.map((card) => ({
            ...card,
            onButtonClick: () => navigate(`/appdetail/${card.id}`),
            onSecondaryButtonClick: () => add2Favorites(card.id!),
            addButtonClicked: checkIsFavoriteItem(card.id!),
          }))}
          groupKey={group}
        />
      </section>
    </Box>
  )
}
