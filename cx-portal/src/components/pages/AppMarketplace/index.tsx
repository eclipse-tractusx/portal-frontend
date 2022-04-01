import StageSection from './components/StageSection'
import './AppMarketplace.scss'
import FavoriteSection from './components/FavoriteSection'
import AppListSection from './components/AppListSection'

export default function AppMarketplace() {
  return (
    <main className="app-store">
      <StageSection />
      <FavoriteSection />
      <AppListSection />
    </main>
  )
}
