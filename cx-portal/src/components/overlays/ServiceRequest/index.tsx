import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function ServiceRequest() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      <DialogHeader
        title={t('content.serviceMarketplace.headline')}
        intro={''}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(show(OVERLAYS.NONE, ''))}
      />

      <DialogContent className="marketplace-overlay-content">
        <Typography
          sx={{ margin: '30px 0 10px', textAlign: 'center' }}
          variant="h5"
        >
          {t('content.serviceMarketplace.description')}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={() => console.log('confirm')}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
