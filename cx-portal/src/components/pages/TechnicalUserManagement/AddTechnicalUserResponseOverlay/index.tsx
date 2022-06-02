import React from 'react'
import Box from '@mui/material/Box'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  UserDetails,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  onCloseWithIcon?: (event: React.MouseEvent) => void
}

export const AddTechnicalUserResponseOverlay = ({
  dialogOpen,
  onCloseWithIcon,
}: AddTechnicalUserOverlayProps) => {
  const { t } = useTranslation()

  const userDataResponse = [
    {
      cardContentItems: {
        clientId: { label: 'Client ID', value: '1237856' },
        clientSecret: {
          label: 'Client Secret',
          value: 'asdds9g89897ds5f6njk234hf8zs9d',
        },
        userName: { label: 'UserName', value: 'max_mustermann23' },
        authType: { label: 'Auth Type', value: 'oauth2' },
      },
    },
  ]

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogHeader
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadlineSuccess')}
          closeWithIcon={true}
          icon={true}
          onCloseWithIcon={onCloseWithIcon}
        />
        <DialogContent className="w-100">
          <Box>
            <UserDetails
              columns={1}
              userDetailsCards={userDataResponse}
              variant="wide"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
