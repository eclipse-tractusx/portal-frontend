import { Cards } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectorUser } from 'state/features/user/userSlice'
import { fetchItems } from 'state/features/news/actions'
import './news-section.scss'
import { newsSelector } from 'state/features/news/slice'

export default function NewsSection() {
  const dispatch = useDispatch()
  const { token } = useSelector(selectorUser)
  const { items } = useSelector(newsSelector)

  useEffect(() => {
    if (token) {
      dispatch(fetchItems())
    }
  }, [token, dispatch])

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
