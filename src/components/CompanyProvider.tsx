import type { IUser } from 'features/user/types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanyRoles } from 'features/companyAccess/slice'
import { getApiBase } from 'services/EnvironmentService'

export function CompanyProvider(props: {
  children: JSX.Element
  user: IUser
}): JSX.Element | null {
  const [loading, setLoading] = useState<boolean>(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getApiBase()}/api/administration/companydata/ownCompanyDetails`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        const data = await response.json()
        dispatch(setCompanyRoles(data.companyRole))
      } catch (error) {
        dispatch(setCompanyRoles([]))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [props.user.token])

  if (loading) {
    return null
  }
  return <>{props.children}</>
}
