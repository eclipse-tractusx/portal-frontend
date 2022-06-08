import {
  Dialog,
  DialogHeader,
  DialogContent,
} from 'cx-portal-shared-components'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  return (
    <Dialog open={show}>
      <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>Hello Model</DialogContent>
    </Dialog>
  )
}

export default ModelDetailDialog
