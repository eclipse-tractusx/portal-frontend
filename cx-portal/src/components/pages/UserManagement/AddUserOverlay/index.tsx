import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Tab,
  Tabs,
  TabPanel,
} from 'cx-portal-shared-components'
import { MultipleUserContent } from './MultipleUserContent'
import { SingleUserContent } from './SingleUserContent'
import { UserRoles } from './UserRoles'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

interface AddUserOverlayProps {
  openDialog?: boolean
  handleClose: React.MouseEventHandler
}

export const AddUserOverlay = ({
  openDialog = false,
  handleClose,
}: AddUserOverlayProps) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const handleConfirm = () => {
    console.log('confirmed')
  }

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue)
  }

  return (
    <div className={'add-user-overlay'}>
      <Dialog open={openDialog}>
        <DialogHeader
          title={t('content.addUser.headline')}
          intro={t('content.addUser.subheadline')}
        />

        <DialogContent className="w-100">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs usage"
          >
            <Tab
              sx={{ minWidth: '50%' }}
              label={t('content.addUser.singleUser')}
              icon={<PersonOutlinedIcon />}
              iconPosition="start"
            />
            <Tab
              sx={{ minWidth: '50%' }}
              label={t('content.addUser.multipleUser')}
              icon={<GroupOutlinedIcon />}
              iconPosition="start"
            />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <SingleUserContent />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <MultipleUserContent />
          </TabPanel>
          <UserRoles />
        </DialogContent>

        <DialogActions helperText={t('content.addUser.helperText')}>
          <Button variant="outlined" onClick={handleClose}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
