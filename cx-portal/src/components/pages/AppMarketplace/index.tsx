import { GroupItemView } from 'components/shared/basic/GroupItemView'
import { SearchInput, Typography } from 'cx-portal-shared-components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApps } from 'state/features/appMarketplace/appMarketplaceActions'
import { selectorAppMarketplace } from 'state/features/appMarketplace/appMarketplaceSlice'
import { selectorUser } from 'state/features/user/userSlice'
import StageSection from './components/StageSection'
import { FilterSelector } from 'cx-portal-shared-components'
import './AppMarketplace.scss'
import { Box } from '@mui/material'

export default function AppMarketplace() {
  const dispatch = useDispatch()
  const { apps } = useSelector(selectorAppMarketplace)
  const { t } = useTranslation()
  const { token } = useSelector(selectorUser)

  const [group, setGroup] = useState<string>('')

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setGroup(e.currentTarget.value)
  }

  const viewCategories = [
    {
      buttonText: t('content.appstore.appOverviewSection.viewCategories.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.viewCategories.useCases'
      ),
      buttonValue: 'useCases',
      onButtonClick: setView,
    },
  ]

  useEffect(() => {
    if (token) {
      dispatch(fetchApps())
    }
  }, [token, dispatch])

  return (
    <main className="app-store">
      <StageSection />
      <section className="overview-section">
        <Typography variant="h3" className="section-title">
          {t('content.appstore.appOverviewSection.title')}
        </Typography>

        <FilterSelector activeFilter={group} filterViews={viewCategories} />
        <Box sx={{ textAlign: 'center' }}>
          <SearchInput
            sx={{ minWidth: '544px' }}
            margin={'normal'}
            placeholder={t('content.dashboard.searchSection.inputPlaceholder')}
          />
        </Box>

        {/*<div className="GroupSelect">*/}
        {/*  <input*/}
        {/*    type="radio"*/}
        {/*    name="group"*/}
        {/*    value=""*/}
        {/*    checked={group === ''}*/}
        {/*    onChange={setView}*/}
        {/*  />*/}
        {/*  none*/}
        {/*  <input*/}
        {/*    type="radio"*/}
        {/*    name="group"*/}
        {/*    value="useCases"*/}
        {/*    checked={group === 'useCases'}*/}
        {/*    onChange={setView}*/}
        {/*  />*/}
        {/*  use cases*/}
        {/*  <input*/}
        {/*    type="radio"*/}
        {/*    name="group"*/}
        {/*    value="subtitle"*/}
        {/*    checked={group === 'subtitle'}*/}
        {/*    onChange={setView}*/}
        {/*  />*/}
        {/*  vendor*/}
        {/*</div>*/}
        <GroupItemView items={apps} groupKey={group} />
      </section>
    </main>
  )
}
