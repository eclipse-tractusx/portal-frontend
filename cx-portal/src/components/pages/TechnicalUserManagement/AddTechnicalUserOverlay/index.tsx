import Box from '@mui/material/Box'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  UserDetails,
} from 'cx-portal-shared-components'
import { addItem, fetchPage } from 'features/admin/service/actions'
import { stateSelector as createSelector } from 'features/admin/service/screate'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { TechnicalUserAddForm } from './components/TechnicalUserAddForm'
import { useDispatch, useSelector } from 'react-redux'
import { RequestState } from 'types/MainTypes'

interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
  handleConfirm: () => void
}

export const AddTechnicalUserOverlay = ({
  dialogOpen,
  handleClose,
  handleConfirm,
}: AddTechnicalUserOverlayProps) => {
  const { t } = useTranslation()
  const userDetailsData = [
    {
      cardCategory: 'Single Point of Contact (SPoC):',
      cardContentItems: {
        organizsationName: { label: 'Organization name', value: 'BMW' },
        username: { label: 'Username', value: 'Max Mustermann' },
        eMailAddress: { label: 'E-Mail Address', value: 'test@test.de' },
      },
    },
  ]

  const defaultFormFieldValues = {
    TechnicalUserService: 'none',
    TechnicalUserDescription: '',
  }
  const dispatch = useDispatch()
  const createResult = useSelector(createSelector)
  console.log(createResult)

  useEffect(() => {
    //reload the data after successful create
    if (createResult.request === RequestState.OK) {
      dispatch(fetchPage(0))
    }
  }, [dispatch, createResult])

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormFieldValues,
    mode: 'onChange',
  })

  const onFormSubmit = async () => {
    const validateFields = await trigger([
      'TechnicalUserService',
      'TechnicalUserDescription',
    ])

    if (validateFields) {
      handleConfirm()
    }
    // const handleConfirm = () => {
    //   // TODO:
    //   // read data from form
    //   // (fields should be validated while entering data and
    //   // confirm button should be disabled as long as data is invalid
    //   // so we don't need another check here
    //   dispatch(
    //     addItem({
    //       name: `testaccount-${Date.now()}`,
    //       description: 'another test account',
    //       authenticationType: 'SECRET',
    //     })
    //   )
  }

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogHeader
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadline')}
        />
        <DialogContent className="w-100">
          <TechnicalUserAddForm
            {...{ handleSubmit, control, errors, trigger }}
          />
          <Box>
            <UserDetails
              columns={1}
              userDetailsCards={userDetailsData}
              variant="wide"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button variant="contained" onClick={onFormSubmit}>
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  onClick={handleConfirm}*/}
            {/*  disabled={false /* true as long as data is invalid *!/*/}
            {/*>*/}
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
