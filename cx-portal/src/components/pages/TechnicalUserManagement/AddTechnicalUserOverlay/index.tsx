import {
  Dialog,
  DialogActions,
  DialogHeader,
  Button,
} from 'cx-portal-shared-components'
import { addItem, fetchPage } from 'features/admin/service/actions'
import { stateSelector as createSelector } from 'features/admin/service/screate'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RequestState } from 'types/MainTypes'

interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
}

export const AddTechnicalUserOverlay = ({
  dialogOpen,
  handleClose,
}: AddTechnicalUserOverlayProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const createResult = useSelector(createSelector)
  console.log(createResult)

  useEffect(() => {
    //reload the data after successful create
    if (createResult.request === RequestState.OK) {
      dispatch(fetchPage(0))
    }
  }, [dispatch, createResult])

  const handleConfirm = () => {
    // TODO:
    // read data from form
    // (fields should be validated while entering data and
    // confirm button should be disabled as long as data is invalid
    // so we don't need another check here
    dispatch(
      addItem({
        name: `testaccount-${Date.now()}`,
        description: 'another test account',
        authenticationType: 'SECRET',
      })
    )
  }

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogHeader
          title={t('content.addUser.headline')}
          intro={t('content.addUser.subheadline')}
        />

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={false /* true as long as data is invalid */}
          >
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
