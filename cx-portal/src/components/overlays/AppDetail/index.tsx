import AppDetailContent from 'components/pages/AppDetail/AppDetailContent'
import { DialogContent, DialogHeader } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useDispatch } from 'react-redux'

export default function AppDetail({ id }: { id: string }) {
  const dispatch = useDispatch()
  return (
    <>
      <DialogHeader
        {...{
          title: '',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />

      <DialogContent>
        <AppDetailContent id={id} />
      </DialogContent>
    </>
  )
}
