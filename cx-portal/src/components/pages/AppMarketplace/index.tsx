import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApps } from 'state/features/appMarketplace/appMarketplaceActions'
import { selectorUser } from 'state/features/user/userSlice'
import StageSection from './components/StageSection'
import './AppMarketplace.scss'
import AppListSection from './components/AppListSection'
import FavoriteSection from './components/FavoriteSection'

export default function AppMarketplace() {
  const dispatch = useDispatch()
  const { token } = useSelector(selectorUser)

  useEffect(() => {
    if (token) {
      dispatch(fetchApps(token))
    }
  }, [token, dispatch])

  return (
    <main className="app-store">
      <StageSection />
      <FavoriteSection />
      <AppListSection />
    </main>
  )
}
