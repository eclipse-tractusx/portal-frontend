import './GroupItemView.scss'
import { AppCards } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { CategoryDivider } from 'cx-portal-shared-components'
import { multiMapBy } from 'utils/multiMapBy'
import { useTranslation } from 'react-i18next'

export const GroupItemView = ({
  items,
  groupKey,
}: {
  items: any[]
  groupKey: string
}) => {
  const { t } = useTranslation()

  if (!groupKey || groupKey === '') {
    // return <RawItemView items={items} />
    return (
      <Box sx={{ marginTop: '52px' }}>
        <AppCards
          items={items}
          columns={4}
          imageSize={'small'}
          imageShape={'round'}
          buttonText={t('global.actions.details')}
          variant={'compact'}
        />
      </Box>
    )
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
    <>
      <ul className="GroupItemView">
        {Object.entries(group).map((v) => (
          <li key={v[0]}>
            <CategoryDivider
              buttonText={t('global.actions.more')}
              categoryItemsLength={v[1].length}
              categoryName={v[0]}
              onButtonClick={() => {
                console.log('Category divider')
              }}
            />
            <AppCards
              items={v[1]}
              columns={4}
              imageSize={'small'}
              imageShape={'round'}
              buttonText={t('global.actions.details')}
              variant={'compact'}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
