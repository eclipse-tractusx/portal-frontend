import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetch } from 'features/apps/details/actions'
import AppDetailContentDetails from './AppDetailContentDetails'
import './AppDetail.scss'

export default function AppDetailContent({ id }: { id: string }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch(id))
  }, [id, dispatch])

  return <AppDetailContentDetails />
}
