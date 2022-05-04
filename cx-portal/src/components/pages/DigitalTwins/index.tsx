import TwinTable from './TwinTable'
import Header from './Header'
import { useEffect, useState } from 'react';
import DigitalTwinDetailDialog from './DigitalTwinDetailDialog';
import { data } from './staticData';
import { useDispatch, useSelector } from 'react-redux';
import { twinsSelector } from 'state/features/digitalTwins/slice';
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
