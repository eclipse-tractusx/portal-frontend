import TwinTable from './TwinTable'
import Header from './Header'
import { useState } from 'react';
import DigitalTwinDetailDialog from './DigitalTwinDetailDialog';

export default function DigitalTwins() {
  const [showDetailTwin, setShowDetailTwin] = useState<string>('');

  const onTwinSelect = (id: string) => {
    setShowDetailTwin(id);
  }
  return (
    <>
      <Header />
      <main className="digital-twins">
        <TwinTable onTwinSelect={onTwinSelect}/>
      </main>
      <DigitalTwinDetailDialog twinId={showDetailTwin} onClose={() => setShowDetailTwin('')}/>
    </>
  )
}
