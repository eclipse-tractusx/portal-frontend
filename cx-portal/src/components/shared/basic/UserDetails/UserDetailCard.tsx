import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, List, ListItem } from '@mui/material'
import {
  Chip,
  Dialog,
  DialogContent,
  DialogHeader,
  IconButton,
  Typography,
  Input,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { Overlay } from 'features/control/overlay/types'
import { show } from 'features/control/overlay/actions'

export type OwnUser = {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  bpn: string[]
  created: string
  company: string
  status: string
}

export interface UserCardProps {
  cardAction?: React.MouseEventHandler
  cardCategory?: string
  cardContentItems: UserItems
  userInfo?: OwnUser
  variant?: 'wide'
}

interface UserItemsTranslation {
  label: string
  value: string | string[]
}

export interface UserItems {
  [key: string]: UserItemsTranslation | undefined
}

export const UserDetailCard = ({
  cardAction,
  cardCategory,
  cardContentItems,
  userInfo,
  variant,
}: UserCardProps) => {
  const dispatch = useDispatch()
  /*
  const [editOpen, setEditOpen] = useState(false)
  const [bpnValues, setBpnValues] = useState([''])
  const [inputBPN, setInputBPN] = useState('')
  const [bpnErrorMsg, setBpnErrorMessage] = useState('')

  const openModal = (bpnValue: any) => {
    console.log('bpnValue@@@@@', bpnValue)
    setBpnValues(bpnValue)
    setEditOpen(true)
  }

  const closeModal = () => {
    setEditOpen(false)
  }

  const addInputBPN = (value: string) => {
    const bpnPattern = /^BPNL[a-z0-9]{12}$/i
    if (!bpnPattern.test(value.trim())) {
      setBpnErrorMessage('Invalid BPN Number. Please enter a valid number.')
    } else {
      setBpnErrorMessage('')
      setInputBPN(value)
    }
  }

  const addBPN = () => {
    if (!bpnErrorMsg) {
      //cardContentItems.bpn.addBPNFn(inputBPN)
      setBpnValues([...bpnValues, inputBPN])
    }
  }
*/

  const openEditOverlay = () => {
    console.log(userInfo)
    dispatch(show(Overlay.ADD_BPN, userInfo?.companyUserId))
  }

  const renderContentSwitch = (
    param: string,
    value: UserItemsTranslation | undefined
  ) => {
    switch (param) {
      case 'status':
        return (
          <>
            <span style={{ marginRight: '10px' }}>{value?.label} :</span>
            <Chip
              color="secondary"
              label={value?.value}
              type="plain"
              variant="filled"
              withIcon={false}
            />
          </>
        )
      default:
        return (
          <>
            <span>{value?.label}:</span>&nbsp;
            <span style={{ marginLeft: variant === 'wide' ? 'auto' : '' }}>
              {value?.value}
            </span>
            <a href="#" onClick={openEditOverlay}>
              {value?.label === 'BPN' ? 'Edit' : ''}
            </a>
          </>
        )
    }
  }
  /*
  const renderEditOverlay = () => {
    console.log('editOpen', editOpen)
    return (
      <div>
        <Dialog
          open={editOpen}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
            },
          }}
        >
          <DialogHeader
            title="Manage BPNs"
            closeWithIcon
            onCloseWithIcon={closeModal}
          />
          <DialogContent>
            {bpnValues.map((bpn, i) => {
              return (
                <li key={i}>
                  {bpn} <a href="#">Delete</a>
                </li>
              )
            })}
            <Input
              name="bpn"
              label="Add a new BPN"
              placeholder="Placeholder Text"
              onChange={(e) => addInputBPN(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  addBPN()
                }
              }}
            />
            <p style={{ color: 'red' }}>{bpnErrorMsg}</p>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
*/
  return (
    <Box>
      {cardCategory && (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'background.background09',
            display: 'flex',
            height: '55px',
            paddingLeft: '20px',
            paddingRight: '14px',
          }}
        >
          <Typography sx={{ typography: 'label3' }}>{cardCategory}</Typography>
          {cardAction && (
            <IconButton
              color="secondary"
              sx={{ marginLeft: 'auto' }}
              onClick={cardAction}
            >
              <EditOutlinedIcon />
            </IconButton>
          )}
        </Box>
      )}
      <List>
        {Object.entries(cardContentItems).map(([k, v], i) => (
          <ListItem
            key={i}
            disableGutters
            sx={{
              borderBottom: '1px solid',
              borderColor: 'border.border01',
              color: 'text.tertiary',
              fontFamily: 'LibreFranklin-Light',
              padding: k === 'status' ? '14.5px 20px' : '20px',
            }}
          >
            {renderContentSwitch(k, v)}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
