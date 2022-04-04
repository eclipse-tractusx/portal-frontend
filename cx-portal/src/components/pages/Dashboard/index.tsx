import SearchSection from './components/SearchSection'
import NewsSection from './components/NewsSection'
import BusinessApplicationsSection from './components/BusinessApplicationsSection'
import StageSection from './components/StageSection'
import AppStoreSection from './components/AppStoreSection'
import './Dashboard.scss'

export default function Dashboard() {
  return (
    <main className="dashboard">
      <StageSection />
      <SearchSection />
      <NewsSection />
      <BusinessApplicationsSection />
      <AppStoreSection />
    </main>
  )
}
