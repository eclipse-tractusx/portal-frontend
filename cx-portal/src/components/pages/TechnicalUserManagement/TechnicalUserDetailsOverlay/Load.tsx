import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetch } from 'features/apps/details/actions'
import Retrieve from './Retrieve'

export default function Load({ id }: { id: string }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch(id))
  }, [id, dispatch])

  return <Retrieve />
}
