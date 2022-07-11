import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
} from 'cx-portal-shared-components'
import {
  fetchAny,
  putBusinessPartnerNumber,
} from 'features/admin/userOwn/actions'
import { ownUserSelector } from 'features/admin/userOwn/slice'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import './style.scss'

export default function AddBPN({ companyUserId }: { companyUserId: string }) {
  const dispatch = useDispatch()
  const userInfo = useSelector(ownUserSelector)
  const [bpnValues, setBpnValues] = useState([''])
  const [inputBPN, setInputBPN] = useState('')
  const [bpnErrorMsg, setBpnErrorMessage] = useState('')

  useEffect(() => {
    dispatch(fetchAny(companyUserId))
  }, [dispatch])

  useEffect(() => {
    setBpnValues(userInfo.bpn)
  }, [userInfo])

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
      dispatch(putBusinessPartnerNumber({ companyUserId, inputBPN }))
      setBpnValues([...bpnValues, inputBPN])
    }
  }

  return (
    <>
      <DialogHeader
        {...{
          title: 'Manage BPNs',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />

      <DialogContent>
        <div className="manageBPN">
          <ul className="bpnListing">
            {bpnValues.map((bpn, i) => {
              return (
                <li key={i}>
                  <p>{bpn}</p> <DeleteIcon className="deleteIcon" />
                </li>
              )
            })}
          </ul>
          <div className="bpnInput">
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
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(Overlay.NONE, ''))}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )
}
