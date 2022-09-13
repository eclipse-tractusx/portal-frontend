import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Typography,
} from 'cx-portal-shared-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './style.scss'
import { useAddSubscribeServiceMutation, useFetchServiceQuery } from 'features/serviceMarketplace/serviceApiSlice'

export default function ServiceRequest({ id }: { id: string }) {
  console.log('id', id)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [response, setResponse] = useState<any>()

  const { data } = useFetchServiceQuery(id ?? '')
  const [ addSubscribeService ] = useAddSubscribeServiceMutation()

  const handleConfirm = async (id:string) => {
    try{
      const result = await addSubscribeService(id).unwrap()
      console.log('result', result)
      setResponse(result)
    }catch (err){
      console.log('error', err)
    }
   
  }

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
          { data && t('content.serviceMarketplace.description').replace('{serviceName}', data.title)}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={() => handleConfirm(id)}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
