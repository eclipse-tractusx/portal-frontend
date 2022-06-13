import {
  Dialog,
  DialogHeader,
  DialogContent,
  Typography,
} from 'cx-portal-shared-components'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  return (
    <Dialog open={show}>
      <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>
        <Typography>Aspect Model</Typography>
      </DialogContent>
    </Dialog>
  )
}

export default ModelDetailDialog
