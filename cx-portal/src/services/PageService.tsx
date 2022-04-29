import { MutableRefObject } from 'react'

let referenceMap: { [key: string]: MutableRefObject<any> } = {}

const registerReference = (key: string, ref: MutableRefObject<any>) => {
  referenceMap[key] = ref
  return ref
}

const scrollTo = (key: string) =>
  window.scrollTo({
    top: referenceMap[key].current.offsetTop + 1,
    behavior: 'smooth',
  })

const PageService = {
  registerReference,
  scrollTo,
}

export default PageService
