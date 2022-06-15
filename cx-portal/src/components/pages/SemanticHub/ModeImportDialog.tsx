import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Input,
} from 'cx-portal-shared-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { postSemanticModel } from 'features/semanticModels/actions'
import { Status } from 'features/semanticModels/types'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelImportDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const dispatch = useDispatch()
  const { uploading, uploadRequest, error } = useSelector(semanticModelsSelector)
  const { t } = useTranslation()
  const [inputText, setInputText] = useState<string>('')
  const [inputStatus, setInputStatus] = useState<Status.Draft | Status.Released>(Status.Draft)

  const uploadModel = () => {
    dispatch(
      postSemanticModel({
        model: inputText,
        type: 'BAMM',
        status: inputStatus,
      })
    )
  }

  const onSelectChange = (e: SelectChangeEvent) => setInputStatus(e.target.value as Status)

  return (
    <Dialog open={show}>
      <DialogHeader
        title={t('content.semantichub.importDialog.title')}
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent>
        <Typography mb={2}>
          {t('content.semantichub.importDialog.text')}
        </Typography>
        <FormControl
          fullWidth
          sx={{mb: 2}}>
          <InputLabel id="import-model-status-label">Status</InputLabel>
          <Select
            labelId="import-model-status-label"
            id="import-model-status"
            value={inputStatus}
            label="Status"
            onChange={onSelectChange}>
            {Object.values(Status).map(status =>
              <MenuItem value={status} key={`status_${status}`}>{status}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          multiline
          minRows={4}
          maxRows={18} />
        {error && <Typography color="error">{error}</Typography>}
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
