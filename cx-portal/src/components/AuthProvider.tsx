import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from 'state/features/user/userSlice'
import { IUser } from 'types/user/UserTypes'

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
