import TwinTable from './TwinTable'
import { useState } from 'react'
import DigitalTwinDetailDialog from './DigitalTwinDetailDialog'
import { useDispatch } from 'react-redux'
import { fetchTwinById } from 'state/features/digitalTwins/actions'
import StageHeader from 'components/shared/frame/StageHeader'
import { useTranslation } from 'react-i18next'

export default function DigitalTwins() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showTwin, setShowTwin] = useState<boolean>(false)

  const onTwinSelect = (id: string) => {
    setShowTwin(true)
    const encodedId = encodeURIComponent(id)
    dispatch(fetchTwinById(encodedId))
  }

  return (
    <>
      <StageHeader title={t('pages.digitaltwin')} />
      <main className="digital-twins">
        <TwinTable onTwinSelect={onTwinSelect} />
      </main>
      <DigitalTwinDetailDialog
        show={showTwin}
        onClose={() => setShowTwin(false)}
      />
    </>
  )
}
