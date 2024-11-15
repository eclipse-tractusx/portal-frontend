import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'

export const getCompanyRoles = () => {
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery('')
  return companyDetails?.companyRole ?? []
}
