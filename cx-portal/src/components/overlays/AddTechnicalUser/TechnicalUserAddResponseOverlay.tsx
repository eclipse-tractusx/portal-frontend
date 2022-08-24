import React, { useState } from 'react'
import Box from '@mui/material/Box'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'

interface TechnicalUserAddOverlayProps {
  title: string
  intro?: string
  dialogOpen: boolean
  children?: JSX.Element | JSX.Element[]
}

export const TechnicalUserAddResponseOverlay = ({
  title,
  intro,
  dialogOpen,
  children,
}: TechnicalUserAddOverlayProps) => {
  const [open, setOpen] = useState<boolean>(dialogOpen)

  return (
    <div>
      <Dialog open={open}>
        <DialogHeader
          title={title}
          intro={intro}
          closeWithIcon={true}
          icon={true}
          onCloseWithIcon={() => setOpen(false)}
        />
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
