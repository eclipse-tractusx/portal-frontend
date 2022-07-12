import {
  Button,
  Cards,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { fetchItems } from 'features/info/news/actions'
import { itemsSelector } from 'features/info/news/slice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function NewsDetail({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const items = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const handleConfirm = () => console.log('confirm')

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.news.title'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />

      <DialogContent sx={{ textAlign: 'center' }}>
        <Cards
          items={items.filter((item) => item.id === id)}
          columns={3}
          buttonText="Details"
          imageSize="medium"
          imageShape="round"
          variant="text-only"
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(Overlay.NONE, ''))}
        >
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          {`${t('global.actions.confirm')}`}
        </Button>
      </DialogActions>
    </>
  )
}
