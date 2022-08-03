import AppDetailContent from 'components/pages/AppDetail/AppDetailContent'
import { DialogContent, DialogHeader } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function AppInfo({ id }: { id: string }) {
  const dispatch = useDispatch()
  return (
    <>
      <DialogHeader
        {...{
          title: '',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <AppDetailContent id={id} />
      </DialogContent>
    </>
  )
}
