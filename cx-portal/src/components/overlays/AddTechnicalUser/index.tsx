import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'
import { useForm } from 'react-hook-form'
import { DefaultFormFieldValuesType } from 'components/pages/TechnicalUserManagement/AddTechnicalUserOverlay'
import {
  ServiceAccountType,
  useAddServiceAccountMutation,
} from 'features/admin/service/apiSlice'
import { TechnicalUserAddForm } from 'components/pages/TechnicalUserManagement/AddTechnicalUserOverlay/components/TechnicalUserAddForm'
import { UserDetails } from 'components/shared/basic/UserDetails'
import './AddTechnicalUser.scss'

export const AddTechnicalUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const ROLE_IDS = [
    '607818be-4978-41f4-bf63-fa8d2de51155',
    '607818be-4978-41f4-bf63-fa8d2de51156',
    '607818be-4978-41f4-bf63-fa8d2de51157',
  ]

  const [addServiceAccount] = useAddServiceAccountMutation()

  const handleConfirm = async (formValues: DefaultFormFieldValuesType) => {
    console.log('Form data: ', formValues)
    try {
      const result = await addServiceAccount({
        name: `testaccount-${Math.random()}`,
        description: 'none',
        authenticationType: ServiceAccountType.SECRET,
        roleIds: [ROLE_IDS[0]],
      }).unwrap()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
    //openAddTechnicalUserResponseOverlay()
  }

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
      const formValues = getValues() as DefaultFormFieldValuesType
      handleConfirm(formValues)
    }
  }

  const formHasErrors = () => {
    return Object.keys(errors).length > 0
  }

  return (
    <>
      <DialogHeader
        title={t('content.addUser.technicalUserHeadline')}
        intro={t('content.addUser.technicalUserSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent className="w-100">
        <TechnicalUserAddForm {...{ handleSubmit, control, errors, trigger }} />
        <Box>
          <UserDetails
            columns={1}
            userDetailsCards={userDetailsData}
            variant="wide"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={onFormSubmit}
          disabled={formHasErrors()}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
