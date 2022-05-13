import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from 'state/features/appMarketplace/actions'
import { appMarketplaceSelectFavorites } from 'state/features/appMarketplace/slice'

export default function FavoriteSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(appMarketplaceSelectFavorites)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  //TODO:
  //implement logic
  const handleSecondaryButtonClick = (id: string) => {
    console.log(`TODO: remove app favorites logic for ${id}`)
  }

  const handleButtonClick = (id: string) => {
    navigate(`/appdetail/${id}`)
  }

  return (
    <section className="business-applications-section">
      <Typography
        sx={{
          fontFamily: 'LibreFranklin-Light',
          marginBottom: '48px !important',
        }}
        variant="h3"
        className="section-title"
      >
        {t('content.appstore.favoriteSection.title')}
      </Typography>

      <Carousel gapToDots={115} expandOnHover={true}>
        {items.map((item) => {
          return (
            <Card
              key={uniqueId(item.title)}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              buttonText="Details"
              imageSize="small"
              imageShape="round"
              variant="compact"
              expandOnHover={true}
              filledBackground={true}
              backgroundColor="background.background11"
              rating={item.rating}
              price={item.price}
              onButtonClick={() => handleButtonClick(item.id!)}
              onSecondaryButtonClick={() =>
                handleSecondaryButtonClick(item.id!)
              }
            />
          )
        })}
      </Carousel>
    </section>
  )
}
