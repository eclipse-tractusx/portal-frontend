import { Alert } from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { RootState } from 'state/store'
import { IHashMap, RequestState } from 'types/MainTypes'

export const stateMap: IHashMap<'error' | 'warning' | 'info' | 'success'> = {}
stateMap[RequestState.NONE] = 'info'
stateMap[RequestState.SUBMIT] = 'warning'
stateMap[RequestState.OK] = 'success'
stateMap[RequestState.ERROR] = 'error'

export type RequestStateSelector = (state: RootState) => RequestState

export const RequestStateIndicator = ({
  selector,
}: {
  selector: RequestStateSelector
}) => {
  const request = useSelector(selector)
  return <Alert severity={stateMap[request]} />
}
