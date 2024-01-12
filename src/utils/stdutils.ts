import { type StandardLibraryType } from 'services/CommonService'

const getCapabilityTitle = (
  values: number[],
  StandardJson: StandardLibraryType
) => {
  return (
    StandardJson.capabilities.filter((e: { uid: number }) =>
      values?.includes(e.uid)
    )?.[0]?.title ?? ''
  )
}

const getRolesTitle = (values: number[], StandardJson: StandardLibraryType) => {
  return (
    StandardJson.roles.filter((e: { uid: number }) =>
      values?.includes(e.uid)
    )?.[0]?.title ?? ''
  )
}

const getUseCaseTitle = (
  values: number[],
  StandardJson: StandardLibraryType
) => {
  return (
    StandardJson.useCases.filter((e: { uid: number }) =>
      values?.includes(e.uid)
    )?.[0]?.title ?? ''
  )
}

export { getCapabilityTitle, getRolesTitle, getUseCaseTitle }
