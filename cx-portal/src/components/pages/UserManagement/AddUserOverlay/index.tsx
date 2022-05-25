import { useEffect, useState } from 'react'
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
  addRequestStateSelector,
  usersToAddSelector,
} from 'features/admin/user/slice'
import { useDispatch, useSelector } from 'react-redux'
import { addTenantUsers, closeAdd } from 'features/admin/user/actions'
import { RequestState } from 'types/MainTypes'
import './AddUserOverlay.scss'

export const AddUserOverlay = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const addOpen = useSelector(addOpenSelector)
  const usersToAdd = useSelector(usersToAddSelector)
  const request = useSelector(addRequestStateSelector)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (request === RequestState.OK) {
      dispatch(closeAdd())
    }
  }, [request, dispatch])

  const handleConfirm = () => {
    dispatch(addTenantUsers(usersToAdd))
  }

  const handleTabSwitch = (
    _event: React.ChangeEvent<unknown>,
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
        </DialogActions>
      </Dialog>
    </div>
  )
}
