import { useTranslation } from 'react-i18next'
import {
  SearchInput,
  Typography,
  ViewSelector,
} from 'cx-portal-shared-components'
import { GroupItemView } from 'components/shared/basic/GroupItemView'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApps } from 'state/features/appMarketplace/appMarketplaceActions'
import { selectorAppMarketplace } from 'state/features/appMarketplace/appMarketplaceSlice'
import { selectorUser } from 'state/features/user/userSlice'
import { Box } from '@mui/material'

export default function AppListSection() {
  const [group, setGroup] = useState<string>('')
  const dispatch = useDispatch()
  const { apps } = useSelector(selectorAppMarketplace)
  const { t } = useTranslation()
  const { token } = useSelector(selectorUser)

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
    <Box className="overview-section">
      <section className="overview-section-content">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.appstore.appOverviewSection.title')}
        </Typography>

        <ViewSelector activeView={group} views={viewCategories} />

        <Box sx={{ textAlign: 'center' }}>
          <SearchInput
            sx={{ minWidth: '544px' }}
            margin={'normal'}
            placeholder={t('content.dashboard.searchSection.inputPlaceholder')}
          />
        </Box>
        <GroupItemView items={apps} groupKey={group} />
      </section>
    </Box>
  )
}
