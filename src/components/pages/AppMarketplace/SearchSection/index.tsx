import { ViewSelector } from '@cofinity-x/shared-components'
import { Stack } from '@mui/material'
import DebouncedSearchInput from 'components/shared/basic/Input/DebouncedSearchInput'
import {
  appsControlSelector,
  setAppGroup,
  setAppSearch,
} from 'features/apps/control'
import { AppGroup } from 'features/apps/types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const control = useSelector(appsControlSelector)

  const setGroup = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(setAppGroup(e.currentTarget.value as AppGroup))
  }

  const triggerSearch = (expr: string) => {
    dispatch(setAppSearch(expr))
  }

  const categoryViews = [
    {
      buttonText: t('content.appstore.appOverviewSection.categoryViews.all'),
      buttonValue: AppGroup.ALL,
      onButtonClick: setGroup,
      dataTestId: 'view-all-filter-button',
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.categoryViews.useCases'
      ),
      buttonValue: AppGroup.USE_CASES,
      onButtonClick: setGroup,
      dataTestId: 'use-cases-filter-button',
    },
  ]

  return (
    <Stack
      justifyContent={{ sm: 'space-between', xs: 'center' }}
      direction={{ lg: 'row', xs: 'column' }}
      spacing={3}
      alignItems={'center'}
      sx={{ px: 3 }}
    >
      <div>
        <DebouncedSearchInput
          sx={{ marginBottom: '0px' }}
          placeholder={t('content.appstore.searchSection.inputPlaceholder')}
          value={control.search}
          debounceTime={500}
          onSearch={triggerSearch}
        />
      </div>
      <div>
        <ViewSelector activeView={control.group} views={categoryViews} />
      </div>
    </Stack>
  )
}
