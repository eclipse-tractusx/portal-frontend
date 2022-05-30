import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from 'features/user/slice'
import { IUser } from 'features/user/types'

export function AuthProvider(props: {
  children: JSX.Element
  user: IUser
}): JSX.Element {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setLoggedUser(props.user))
  }, [dispatch, props.user])
  return <>{props.children}</>
}
