import CloseIcon from '@mui/icons-material/Close';
import { CustomAccordion, Dialog, DialogContent, Typography } from 'cx-portal-shared-components';
import { useState } from 'react';
import { ShellDescriptor } from 'state/features/digitalTwins/types';

interface TwinDialogProps {
  twin: ShellDescriptor,
  onClose: () => void
}
const DigitalTwinDetailDialog = ({twin, onClose}: TwinDialogProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
  };

  return (
    <Dialog open={twin !== null}>
      <CloseIcon
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 16
        }} 
      />
      <DialogContent className="w-100">
        {twin ?
          <>
            <CustomAccordion 
              expanded={expanded === 'panel1'}
              title={twin.idShort}
              id="panel1"
              onChange={handleChange('panel1')}>
              <Typography>{twin.description[0] ? twin.description[0].text : 'This asset has no description'}</Typography>
            </CustomAccordion>
            <CustomAccordion
              expanded={expanded === 'panel2'}
              title={twin.idShort}
              id="panel2"
              onChange={handleChange('panel2')}>
              <Typography>{twin.description[0] ? twin.description[0].text : 'This asset has no description'}</Typography>
            </CustomAccordion>
          </>
        : <Typography>No twin data available</Typography>
        }
      </DialogContent>
    </Dialog>
  );
}

export default DigitalTwinDetailDialog;