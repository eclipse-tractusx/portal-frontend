import TwinTable from './TwinTable'
import Header from './Header'
import { useEffect, useState } from 'react';
import DigitalTwinDetailDialog from './DigitalTwinDetailDialog';
import { data } from './staticData';

export default function DigitalTwins() {
  const [showDetailTwin, setShowDetailTwin] = useState<string>('');
  const [twin, setTwin] = useState<any>(null);

  
  useEffect(() => {
    const filteredTwin = data.items.filter((item) => item.identification === showDetailTwin)
    console.log(filteredTwin);
    if(filteredTwin.length > 0){
      setTwin(filteredTwin[0]);
    } else {
      setTwin(null)
    }
  }, [showDetailTwin]);
  
  const onTwinSelect = (id: string) => {
    setShowDetailTwin(id);
  }
  return (
    <>
      <Header />
      <main className="digital-twins">
        <TwinTable onTwinSelect={onTwinSelect}/>
      </main>
      <DigitalTwinDetailDialog twin={twin} onClose={() => setShowDetailTwin('')}/>
    </>
  )
}
