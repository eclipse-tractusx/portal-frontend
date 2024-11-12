import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'

export const getCompanyRoles = () => {
  const { data: companyDetails, isLoading } = useFetchOwnCompanyDetailsQuery('')
  return {
    companyRoles: companyDetails?.companyRole,
    isLoading,
  }
}
