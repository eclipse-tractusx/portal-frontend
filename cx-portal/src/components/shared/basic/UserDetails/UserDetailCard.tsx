import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, List, ListItem } from '@mui/material'
import { Chip, IconButton, Typography } from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { OVERLAYS } from 'types/Constants'

export type UserDetail = {
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
  userInfo?: UserDetail
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

  const openEditOverlay = () => {
    dispatch(show(OVERLAYS.ADD_BPN, userInfo?.companyUserId))
  }

  const renderContentSwitch = (
    param: string,
    value: UserItemsTranslation | undefined
  ) => {
    return param === 'status' ? (
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
    ) : (
      <>
        <span>{value?.label}:</span>&nbsp;
        <span style={{ marginLeft: variant === 'wide' ? 'auto' : '' }}>
          {Array.isArray(value?.value)
            ? value?.value.map((bpn, i) => (
                <span key={i}>
                  {bpn}
                  <br />
                </span>
              ))
            : value?.value}
        </span>
        <span>
          {value?.label === 'BPN' ? (
            <EditIcon style={{ cursor: 'pointer' }} onClick={openEditOverlay} />
          ) : (
            ''
          )}
        </span>
      </>
    )
  }

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
