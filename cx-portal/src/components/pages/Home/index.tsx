import SearchSection from './components/SearchSection'
import SearchResultSection from './components/SearchResultSection'
import NewsSection from './components/NewsSection'
import BusinessApplicationsSection from './components/BusinessApplicationsSection'
import StageSection from './components/StageSection'
import AppStoreSection from './components/AppStoreSection'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Home.scss'

export default function Home() {
  return (
    <main className="home">
      <StageSection />
      <SearchSection />
      <SearchResultSection />
      <NewsSection />
      <BusinessApplicationsSection />
      <AppStoreSection />
    </main>
  )
}
