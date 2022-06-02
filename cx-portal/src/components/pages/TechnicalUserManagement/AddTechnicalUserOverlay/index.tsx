import Box from '@mui/material/Box'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  UserDetails,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { TechnicalUserAddForm } from './components/TechnicalUserAddForm'

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
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
