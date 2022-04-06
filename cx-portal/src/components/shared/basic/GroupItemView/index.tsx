import { multiMapBy } from 'utils/multiMapBy'
import { RawItemView } from '../RawItemView'
import './GroupItemView.scss'
import { CategoryDivider } from 'cx-portal-shared-components'
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
    return <RawItemView items={items} />
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
    <>
      <CategoryDivider
        buttonText={t('global.actions.more')}
        categoryItemsLength={128}
        categoryName="Favorites"
        onButtonClick={() => {
          console.log('Category divider')
        }}
      />
      <div>Apps by use case</div>
      <ul className="GroupItemView">
        {Object.entries(group).map((v) => (
          <li key={v[0]}>
            <p>
              <span>{v[0]}</span>
            </p>
            <RawItemView items={v[1]} />
          </li>
        ))}
      </ul>
    </>
  )
}
