import AppDetailContentDetails from 'components/pages/AppDetail/AppDetailContentDetails'
import { DialogContent, DialogHeader } from 'cx-portal-shared-components'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function AppInfo({
  id,
  title,
}: {
  id: string
  title?: string | undefined
}) {
  const dispatch = useDispatch()
  const { data } = useFetchAppDetailsQuery(id)

  return (
    <>
      <DialogHeader
        {...{
          title: title || '',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        {data && <AppDetailContentDetails item={data} />}
      </DialogContent>
    </>
  )
}
