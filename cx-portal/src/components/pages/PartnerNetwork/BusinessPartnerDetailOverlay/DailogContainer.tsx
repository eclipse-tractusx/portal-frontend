import {
  Dialog,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { Box, Grid } from '@mui/material'

interface DailogContainerProps {
  openDialog?: boolean
  dialogHeaderTitle: string
  handleOverlayClose: React.MouseEventHandler
  children: JSX.Element
}

const DialogContainer = ({
  openDialog = false,
  dialogHeaderTitle,
  handleOverlayClose,
  children,
}: DailogContainerProps) => {
  return (
    <Dialog
      open={openDialog}
      // sx={{
      //   '.MuiDialog-paper': {
      //     maxWidth: 700,
      //   },
      // }}
    >
      <DialogHeader
        {...{
          title: dialogHeaderTitle,
          closeWithIcon: true,
          onCloseWithIcon: handleOverlayClose,
        }}
      />

      <DialogContent
        sx={{
          padding: '0 30px',
          marginBottom: 5,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={1.5} style={{ marginTop: 0 }}>
            {children}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogContainer
