import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
} from 'cx-portal-shared-components'
import { fetchAny } from 'features/admin/userOwn/actions'
import { ownUserSelector } from 'features/admin/userOwn/slice'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function AddBPN({ companyUserId }: { companyUserId: string }) {
  const { t } = useTranslation()
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

  const handleConfirm = () => console.log('call API to add BPN')

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

  return (
    <>
      <DialogHeader
        {...{
          title: 'Add BPN',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />

      <DialogContent>
        {/*<pre>{JSON.stringify(userInfo, null, 2)}</pre>*/}
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

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(Overlay.NONE, ''))}
        >
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          {`${t('global.actions.confirm')}`}
        </Button>
      </DialogActions>
    </>
  )
}
