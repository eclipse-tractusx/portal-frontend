import SearchSection from './components/SearchSection'
import StageSection from './components/StageSection'
import './dashboard.scss'

export default function Dashboard() {
  return (
    <main className='dashboard'>
      <StageSection />
      <SearchSection />
    </main>
  )
}
