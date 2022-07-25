import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
} from 'cx-portal-shared-components'
import ConnectorTypeSelection from './components/ConnectorTypeSelection'
import ConnectorInsertForm from './components/ConnectorInsertForm'
import { useForm } from 'react-hook-form'

interface AddCollectorOverlayProps {
  openDialog?: boolean
  connectorStep: number
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  onFormConfirmClick: (data: FormFieldsType) => void
}

export type FormFieldsType = {
  ConnectorName: string
  ConnectorURL: string
}

const formFields = {
  ConnectorName: '',
  ConnectorURL: '',
}

const AddConnectorOverlay = ({
  openDialog = false,
  connectorStep,
  handleOverlayClose,
  handleConfirmClick,
  onFormConfirmClick,
}: AddCollectorOverlayProps) => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: formFields,
    mode: 'onChange',
  })

  const onFormSubmit = async () => {
    const validateFields = await trigger(['ConnectorName', 'ConnectorURL'])
    if (validateFields) {
      onFormConfirmClick(getValues() as FormFieldsType)
    }
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        {connectorStep === 1 && (
          <DialogHeader
            title={t('content.edcconnector.modal.title')}
            intro={t('content.edcconnector.modal.intro')}
          />
        )}
        <DialogContent
          sx={{
            padding: '40px 120px',
          }}
        >
          {connectorStep === 0 ? (
            <>
              <ConnectorTypeSelection />
            </>
          ) : (
            <>
              <ConnectorInsertForm
                {...{ handleSubmit, control, errors, trigger }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={(e) => handleOverlayClose(e)}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button
            variant="contained"
            onClick={(e) =>
              connectorStep === 0 ? handleConfirmClick(e) : onFormSubmit()
            }
          >
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddConnectorOverlay
