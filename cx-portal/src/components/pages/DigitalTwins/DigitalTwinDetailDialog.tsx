import { Dialog, DialogContent, DialogHeader, Typography } from 'cx-portal-shared-components';
import { useSelector } from 'react-redux';
import { twinsSelector } from 'state/features/digitalTwins/slice';
import { TwinDetails } from './TwinDetails';

interface TwinDialogProps {
  show: boolean,
  onClose: () => void
}
const DigitalTwinDetailDialog = ({show, onClose}: TwinDialogProps) => {
  const {twin, loading, error } = useSelector(twinsSelector);

  return (
    <Dialog open={show}>
      <DialogHeader
        title=""
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent>
        {twin &&
          <TwinDetails twin={twin}/>
        }
        { loading &&
          <p>Loading</p>
        }
        { error &&
          <Typography>No twin data available</Typography>
        }
      </DialogContent>
    </Dialog>
  );
}

export default DigitalTwinDetailDialog;