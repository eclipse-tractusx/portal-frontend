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
import {
  addOpenSelector,
  usersToAddSelector,
} from 'state/features/adminUser/slice'
import { useDispatch, useSelector } from 'react-redux'
import { closeAdd } from 'state/features/adminUser/actions'
import { AddUser } from 'state/features/adminUser/types'

export type AddUserCallback = (users: AddUser[]) => void

export const AddUserOverlay = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const addOpen = useSelector(addOpenSelector)
  const usersToAdd = useSelector(usersToAddSelector)
  const [activeTab, setActiveTab] = useState(0)

  console.log(usersToAdd)

  const handleConfirm = () => {
    console.log('confirmed')
    //dispatch(addTenantUsers(users))
  }

  const handleTabSwitch = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue)
  }

  return (
    <div className={'add-user-overlay'}>
      <Dialog open={addOpen}>
        <DialogHeader
          title={t('content.addUser.headline')}
          intro={t('content.addUser.subheadline')}
        />

        <DialogContent className="w-100">
          <Tabs
            value={activeTab}
            onChange={handleTabSwitch}
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
          <Button variant="outlined" onClick={() => dispatch(closeAdd())}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button
            variant="contained"
            disabled={usersToAdd.length > 0}
            onClick={handleConfirm}
          >
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
