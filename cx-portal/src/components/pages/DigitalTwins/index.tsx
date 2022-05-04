import TwinTable from './TwinTable'
import Header from './Header'
import { useState } from 'react';
import DigitalTwinDetailDialog from './DigitalTwinDetailDialog';
import { useDispatch } from 'react-redux';
import { fetchTwinById } from 'state/features/digitalTwins/actions';

export default function DigitalTwins() {
  const dispatch = useDispatch();
  const [showTwin, setShowTwin] = useState<boolean>(false)
  
  const onTwinSelect = (id: string) => {
    setShowTwin(true);
    const encodedId = encodeURIComponent(id)
    dispatch(fetchTwinById(encodedId));
  }

  return (
    <>
      <Header />
      <main className="digital-twins">
        <TwinTable onTwinSelect={onTwinSelect}/>
      </main>
      <DigitalTwinDetailDialog show={showTwin} onClose={() => setShowTwin(false)}/>
    </>
  )
}
