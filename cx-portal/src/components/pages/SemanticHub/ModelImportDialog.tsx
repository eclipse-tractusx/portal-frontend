import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Input,
  theme,
} from 'cx-portal-shared-components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { postSemanticModel } from 'features/semanticModels/actions'
import { Status } from 'features/semanticModels/types'
import {
  InputLabel,
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelImportDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const dispatch = useDispatch()
  const { uploading, uploadedModel, error } = useSelector(
    semanticModelsSelector
  )
  const { t } = useTranslation()
  const [inputText, setInputText] = useState<string>('')
  const [inputStatus, setInputStatus] = useState<
    Status.Draft | Status.Released
  >(Status.Draft)

  useEffect(() => {
    if (show) {
      setInputText('')
      setInputStatus(Status.Draft)
    }
  }, [show])

  useEffect(() => {
    if (uploadedModel !== null) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedModel])

  const uploadModel = () => {
    dispatch(
      postSemanticModel({
        model: inputText,
        type: 'BAMM',
        status: inputStatus,
      })
    )
  }

  const onSelectChange = (e: SelectChangeEvent) =>
    setInputStatus(e.target.value as Status)

  return (
    <Dialog open={show}>
      <DialogHeader
        title={t('content.semantichub.importDialog.title')}
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent sx={{ pt: 1 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="import-model-status-label">Status</InputLabel>
          <Select
            labelId="import-model-status-label"
            id="import-model-status"
            value={inputStatus}
            label="Status"
            onChange={onSelectChange}
            disabled={uploading}
          >
            {Object.values(Status).map((status) => (
              <MenuItem value={status} key={`status_${status}`}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          multiline
          minRows={4}
          maxRows={18}
          disabled={uploading}
        />
        {error && <Typography color="error">{error}</Typography>}
        {uploading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <CircularProgress
              size={35}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          {t('content.semantichub.importDialog.buttonCancel')}
        </Button>
        <Button onClick={uploadModel} disabled={uploading}>
          {t('content.semantichub.importDialog.buttonConfirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModelImportDialog
