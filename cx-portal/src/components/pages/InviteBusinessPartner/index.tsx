import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function InviteBusinessPartner() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(show(Overlay.INVITE, ''))
  }, [dispatch])

  return (
    <main>
    </main>
  )
}
