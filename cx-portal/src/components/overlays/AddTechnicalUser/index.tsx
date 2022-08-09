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
  ServiceAccountDetail,
  ServiceAccountType,
  useAddServiceAccountMutation,
} from 'features/admin/serviceApiSlice'
import { TechnicalUserAddForm } from 'components/pages/TechnicalUserManagement/AddTechnicalUserOverlay/components/TechnicalUserAddForm'
import { UserDetails } from 'components/shared/basic/UserDetails'
import { useState } from 'react'
import { AddTechnicalUserResponseOverlay } from 'components/pages/TechnicalUserManagement/AddTechnicalUserResponseOverlay'
import { updateData, UPDATES } from 'features/control/updatesSlice'

export const AddTechnicalUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [response, setResponse] = useState<ServiceAccountDetail>()
  const [addServiceAccount] = useAddServiceAccountMutation()

  const handleConfirm = async (formValues: DefaultFormFieldValuesType) => {
    console.log('Form data: ', formValues)
    try {
      const result = await addServiceAccount({
        name: formValues.TechnicalUserName,
        description: formValues.TechnicalUserDescription,
        authenticationType: ServiceAccountType.SECRET,
        roleIds: [formValues.TechnicalUserService],
      }).unwrap()
      console.log(result)
      setResponse(result)
      dispatch(updateData(UPDATES.TECHUSER_LIST))
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
    TechnicalUserName: '',
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
      'TechnicalUserName',
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
      <DialogContent>
        <TechnicalUserAddForm {...{ handleSubmit, control, errors, trigger }} />
        <Box sx={{ paddingTop: '25px' }}>
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
      {response && (
        <AddTechnicalUserResponseOverlay
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadlineSuccess')}
          dialogOpen={true}
        >
          <UserDetails
            columns={1}
            userDetailsCards={[
              {
                cardContentItems: {
                  clientId: { label: 'Client ID', value: '1237856' },
                  clientSecret: {
                    label: 'Client Secret',
                    value: 'asdds9g89897ds5f6njk234hf8zs9d',
                  },
                  userName: { label: 'UserName', value: 'max_mustermann23' },
                  authType: { label: 'Auth Type', value: 'oauth2' },
                },
              },
            ]}
            variant="wide"
          />
        </AddTechnicalUserResponseOverlay>
      )}
    </>
  )
}
