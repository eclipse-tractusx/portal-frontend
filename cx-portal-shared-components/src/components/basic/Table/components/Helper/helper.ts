export const isQueryDataPresent = (queryData: any) => {
  return queryData && queryData.length > 0
}

export const isContentPresent = (data: any) => {
  return data && data.content ? true : false
}

export const addCountryAttributes = (finalObj: any, payload: any) => {
  finalObj.forEach((x: any) => {
    payload.forEach((y: any) => {
      if (x.legalEntity.bpn === y.legalEntity) {
        x.legalEntity.country = y.legalAddress.country
      }
    })
  })
  return finalObj
}

export const addNewAttributes = (
  finalObj: any,
  payload: any,
  queryData: any
) => {
  finalObj = addCountryAttributes(finalObj, payload)
  if (isQueryDataPresent(queryData)) {
    finalObj = addMemberAttribute(finalObj, queryData)
  }
  return finalObj
}

export const addMemberAttribute = (finalObj: any, queryData: any) => {
  finalObj.forEach((x: any) => {
    queryData.forEach((y: string) => {
      if (x.legalEntity.bpn === y) {
        x.legalEntity.member = true
      } else {
        x.legalEntity.member = false
      }
    })
  })
  return finalObj
}

export const hasMorePages = (data: any) => {
  return (
    data?.page < data?.totalPages - 1 ||
    (data?.meta && data.meta.page < data.meta.totalPages - 1)
  )
}

export const getMaxRows = (data: any) => {
  return data?.totalElements ?? data?.meta?.totalElements ?? 0
}

export const getRequestMethod = (additionalHooks: any, str: string) => {
  if (str === 'mutation') {
    return (
      additionalHooks &&
      additionalHooks?.mutation &&
      additionalHooks?.mutation()
    )
  } else {
    return (
      additionalHooks && additionalHooks?.mutation && additionalHooks?.query()
    )
  }
}
