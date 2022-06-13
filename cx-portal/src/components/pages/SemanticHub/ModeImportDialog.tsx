import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from 'cx-portal-shared-components'
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { semanticModelsSelector } from 'features/semanticModels/slice';
import { postSemanticModel } from 'features/semanticModels/actions';
import { NewSemanticModel, Status } from 'features/semanticModels/types';

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void,
}

const ModelImportDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const dispatch = useDispatch()
  const { uploading, uploadRequest } = useSelector(semanticModelsSelector)
  const { t } = useTranslation()
  const [inputText, setInputText] = useState<string>('')

  const uploadModel = () => {
    dispatch(
      postSemanticModel({model: inputText, type: 'BAMM', status: Status.Draft})
    )

  }

  return (
    <Dialog open={show}>
      <DialogHeader title={t('content.semantichub.importDialog.title')} closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>
        <Typography mb={2}>{t('content.semantichub.importDialog.text')}</Typography>
        <TextField
          value={inputText}
          fullWidth
          onChange={(e) => setInputText(e.target.value)}
          multiline
          minRows={4}
          maxRows={18}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t('content.semantichub.importDialog.buttonCancel')}
        </Button>
        <Button onClick={uploadModel}>
          {t('content.semantichub.importDialog.buttonConfirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModelImportDialog
