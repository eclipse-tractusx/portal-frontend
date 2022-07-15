import { show } from 'features/control/overlay/actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function InviteBusinessPartner() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(show(OVERLAYS.INVITE, ''))
  }, [dispatch])

  return <main></main>
}
