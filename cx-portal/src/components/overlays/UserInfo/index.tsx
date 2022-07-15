import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { fetchAny } from 'features/admin/userOwn/actions'
import { ownUserSelector } from 'features/admin/userOwn/slice'
import { show } from 'features/control/overlay/actions'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function UserInfo({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userInfo = useSelector(ownUserSelector)

  useEffect(() => {
    dispatch(fetchAny(id))
  }, [dispatch, id])

  const handleConfirm = () => console.log('confirm')

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.account.userAccount'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
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
