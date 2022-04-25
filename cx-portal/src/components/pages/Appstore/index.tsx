import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useSearchParams } from 'react-router-dom'
import { CardItems, Cards, SearchInput } from 'cx-portal-shared-components'
import { appMarketplaceSelectCards } from 'state/features/appMarketplace/slice'
import { fetchItems } from 'state/features/appMarketplace/actions'

const Appstore = () => {
  const dispatch = useDispatch()
  const cards = useSelector(appMarketplaceSelectCards)
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = new RegExp(searchParams.get('filter') || '', 'i')

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <main className="Appstore">
      <SearchInput
        margin="normal"
        autoFocus={true}
        value={searchParams.get('filter') || ''}
        onChange={(event) =>
          setSearchParams({ filter: event.target.value }, { replace: true })
        }
      />
      <nav>
        <Cards
          items={cards
            .filter(
              (app: CardItems) =>
                filter.test(app.title) || filter.test(app.subtitle || '')
            )
            .map((app: CardItems) => {
              const item: CardItems = { ...app }
              item.image = {
                src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
                alt: 'Catena-X AppCard',
              }
              return item
            })}
          variant="minimal"
          buttonText="Details"
        />
      </nav>
      <Outlet />
    </main>
  )
}

export default Appstore
