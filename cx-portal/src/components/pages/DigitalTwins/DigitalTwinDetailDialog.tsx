import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent } from 'cx-portal-shared-components';

interface TwinDialogProps {
  twinId: string,
  onClose: () => void
}
export default function DigitalTwinDetailDialog({twinId, onClose}: TwinDialogProps){
  return (
    <Dialog open={twinId !== ''}>
        <CloseIcon
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 16
          }} 
        />
        <DialogContent className="w-100">
        </DialogContent>
      </Dialog>
  );
}