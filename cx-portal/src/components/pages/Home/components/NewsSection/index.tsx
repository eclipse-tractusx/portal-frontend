import { Cards } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from 'features/info/news/actions'
import { itemsSelector } from 'features/info/news/slice'
import './news-section.scss'

export default function NewsSection() {
  const dispatch = useDispatch()
  const items = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <section className="news-section">
      <Cards
        items={items}
        columns={3}
        buttonText="Details"
        imageSize="medium"
        imageShape="round"
        variant="text-only"
      />
    </section>
  )
}
