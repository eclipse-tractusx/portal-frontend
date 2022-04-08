import './AppListGroupView.scss'
import { Box } from '@mui/material'
import { Cards } from 'cx-portal-shared-components'
import { multiMapBy } from 'utils/multiMapBy'
import { useTranslation } from 'react-i18next'
import { AppListGroup } from '../AppListGroup'

export const AppListGroupView = ({
  items,
  groupKey,
}: {
  items: any[]
  groupKey: string
}) => {
  const { t } = useTranslation()

  if (!groupKey || groupKey === '') {
    return (
      <Box sx={{ marginTop: '52px' }}>
        <Cards
          buttonText={t('global.actions.details')}
          columns={4}
          imageShape={'round'}
          imageSize={'small'}
          items={items}
          variant={'compact'}
        />
      </Box>
    )
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
    <>
      <ul className="AppListGroupView">
        {Object.entries(group).map((v) => (
          <li key={v[0]}>
            <AppListGroup category={v[0]} items={v[1]} />
          </li>
        ))}
      </ul>
    </>
  )
}
