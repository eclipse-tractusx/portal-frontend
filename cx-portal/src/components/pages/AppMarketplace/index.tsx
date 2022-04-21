import StageSection from './components/StageSection'
import AppListSection from './components/AppListSection'
import FavoriteSection from './components/FavoriteSection'
import './AppMarketplace.scss'

export default function AppMarketplace() {
  return (
    <main className="app-store">
      <StageSection />
      <FavoriteSection />
      <AppListSection />
    </main>
  )
}
