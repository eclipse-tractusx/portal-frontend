import { multiMapBy } from 'utils/multiMapBy'
import { RawItemView } from '../RawItemView'
import './GroupItemView.scss'

export const GroupItemView = ({
  items,
  groupKey,
}: {
  items: any[]
  groupKey: string
}) => {
  if (!groupKey || groupKey === '') {
    return <RawItemView items={items} />
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
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
  )
}
