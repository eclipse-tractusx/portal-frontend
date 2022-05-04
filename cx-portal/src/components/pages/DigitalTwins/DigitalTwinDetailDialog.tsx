import { Dialog, DialogContent, DialogHeader, Typography } from 'cx-portal-shared-components';
import { useSelector } from 'react-redux';
import { twinsSelector } from 'state/features/digitalTwins/slice';
import { TwinDetails } from './TwinDetails';
import { Box, useTheme, CircularProgress } from '@mui/material'

interface TwinDialogProps {
  show: boolean,
  onClose: () => void
}
const DigitalTwinDetailDialog = ({show, onClose}: TwinDialogProps) => {
  const {twin, loading, error } = useSelector(twinsSelector);
  const theme = useTheme();

  return (
    <Dialog open={show}>
      <DialogHeader
        title=""
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent>
        { twin &&
          <TwinDetails twin={twin}/>
        }
        { loading &&
        <Box sx={{textAlign: 'center'}}>
          <CircularProgress
            size={35}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </Box>
        }
        { error &&
          <>
            <Typography variant='h5'>ERROR: No twin data available</Typography>
            <Typography>{error}</Typography>
          </>
        }
      </DialogContent>
    </Dialog>
  );
}

export default DigitalTwinDetailDialog;