import StageSection from './components/StageSection'
import AppListSection from './components/AppListSection'
import './AppMarketplace.scss'

export default function AppMarketplace() {
  return (
    <main className="app-store">
      <StageSection />
      <AppListSection />
    </main>
  )
}
