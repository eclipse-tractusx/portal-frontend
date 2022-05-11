import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
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
  requestStateSelector,
  usersToAddSelector,
} from 'state/features/adminUser/slice'
import { useDispatch, useSelector } from 'react-redux'
import { addTenantUsers, closeAdd } from 'state/features/adminUser/actions'
import './AddUserOverlay.scss'
import { RequestStateIndicator } from './RequestStateIndicator'

export const AddUserOverlay = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const addOpen = useSelector(addOpenSelector)
  const usersToAdd = useSelector(usersToAddSelector)
  const [activeTab, setActiveTab] = useState(0)

  const handleConfirm = () => {
    //console.log('confirmed')
    dispatch(addTenantUsers(usersToAdd))
  }

  const handleTabSwitch = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    console.log(event.type)
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
          <UserRoles headline="content.addUser.chooseUserRole" />
        </DialogContent>

        <DialogActions helperText={t('content.addUser.helperText')}>
          <Button variant="outlined" onClick={() => dispatch(closeAdd())}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button
            variant="contained"
            disabled={usersToAdd.length === 0}
            onClick={handleConfirm}
          >
            {`${t('global.actions.confirm')}`}
          </Button>
          <RequestStateIndicator selector={requestStateSelector} />
        </DialogActions>
      </Dialog>
    </div>
  )
}
