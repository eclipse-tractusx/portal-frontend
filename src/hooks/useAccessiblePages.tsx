import { useState, useEffect } from 'react'
import { hasAccess } from 'services/AccessService'
import { getCompanyRoles } from 'utils/companyRoleCheck'
import { ALL_PAGES } from 'types/cfx/Config'
import { type IPage } from 'types/MainTypes'

const useAccessiblePages = () => {
  const [companyRoles, setCompanyRoles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [accessiblePages, setAccessiblePages] = useState<IPage[]>([])
  const roles = getCompanyRoles()

  const fetchCompanyRoles = () => {
    try {
      setCompanyRoles(roles.companyRoles ?? [])
      setIsLoading(roles.isLoading)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const onHandleAccessiblePages = () => {
    const pages = ALL_PAGES.filter((page) => {
      return (
        (!page.companyRole || companyRoles.includes(page.companyRole)) &&
        hasAccess(page.name)
      )
    })
    setAccessiblePages(pages)
  }

  useEffect(() => {
    fetchCompanyRoles()
  }, [roles.isLoading])

  useEffect(() => {
    if (!isLoading) {
      onHandleAccessiblePages()
    }
  }, [companyRoles])

  return { accessiblePages, isLoading }
}

export default useAccessiblePages
