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

interface AddCollectorOverlayProps {
  openDialog?: boolean
  connectorStep: number
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
}

const AddConnectorOverlay = ({
                               openDialog = false,
                               connectorStep = 0,
                               handleOverlayClose,
                               handleConfirmClick,
                             }: AddCollectorOverlayProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '80%',
          },
        }}
      >

        {connectorStep === 1 &&
        <DialogHeader title={'Connect company connector'}
                         intro='Optional intro. Lorem ipsum dolor sit amet consectetur adipisicing elit.' />}
        <DialogContent
          sx={{
            padding: '40px 120px',
          }}
        >{
          connectorStep === 0 ?
            <>
              <ConnectorTypeSelection />

            </> :
            <>
              <ConnectorInsertForm />

            </>
        }
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={(e) => handleOverlayClose(e)}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button variant='contained' onClick={(e) => handleConfirmClick(e)}>
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddConnectorOverlay
