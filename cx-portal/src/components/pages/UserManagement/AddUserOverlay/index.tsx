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
import { addUserOpenSelector } from 'state/features/userAdministration/slice'
import { useDispatch, useSelector } from 'react-redux'
import { addTenantUsers, closeAddUser } from 'state/features/userAdministration/actions'
import { AddUser } from 'state/features/userAdministration/types'

export type AddUserCallback = (users: AddUser[]) => void;

export const AddUserOverlay = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const addUserOpen = useSelector(addUserOpenSelector)
  const [activeTab, setActiveTab] = useState(0)
  const [users, setUsers] = useState<AddUser[]>([])

  const setValidUsers = (validUsers: AddUser[]) => {
    setUsers(validUsers)
  }

  /*
  const users = [
    {
      userName: 'rohrmeierwebde',
      eMail: 'rohrmeier@web.de',
      firstName: 'Martin',
      lastName: 'Rohrmeier',
      role: 'IT Admin',
      message: 'you have been invited to catena-x'
    }
  ]
  */

  const handleConfirm = () => {
    console.log('confirmed')
    console.log(users)
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
      <Dialog open={addUserOpen}>
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
            <SingleUserContent onValidInput={setValidUsers}/>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <MultipleUserContent />
          </TabPanel>
          <UserRoles />
        </DialogContent>

        <DialogActions helperText={t('content.addUser.helperText')}>
          <Button variant="outlined" onClick={() => dispatch(closeAddUser())}>
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
