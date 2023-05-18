import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box } from '@mui/material'
import { Typography } from '../Typography'

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    padding: '0px',
  },
  '& .MuiDialogActions-root': {
    padding: '10px',
  },
  '& .MuiPaper-root': {
    borderRadius: '8px',
    maxWidth: '900px',
    minWidth: '800px',
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: '25px' }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

function LinkText(props: { title: string; link: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.link, '_blank')}
    >
      <Typography>{props.title}</Typography>
      <OpenInNewIcon />
    </Box>
  )
}

export const AboutDialog = (props: {
  title: string
  subtitles: string[]
  links: { text: string; url: string }[]
  footerText: string
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={() => {}}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {}}>
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent sx={{}} dividers>
          <Box
            sx={{
              padding: '20px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            {props.subtitles.map((str) => (
              <Typography
                sx={{
                  padding: '10px 0px',
                }}
                key={str}
              >
                {str}
              </Typography>
            ))}
          </Box>
          {props.links.map((link) => (
            <LinkText title={link.text} link={link.url} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {}}>
            {props.footerText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
