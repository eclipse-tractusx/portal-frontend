import { Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { appDetailsSelector } from 'state/features/appDetails/slice'
import { fetchItem } from 'state/features/appDetails/actions'
import { userSelector } from 'state/features/user/slice'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import NotFound from '../NotFound'
import './AppDetail.scss'

export default function AppDetail() {
  const dispatch = useDispatch()
  const appId = useParams().appId
  const { token } = useSelector(userSelector)
  const { item } = useSelector(appDetailsSelector)

  useEffect(() => {
    if (token && appId) {
      dispatch(fetchItem(appId))
    }
  }, [appId, token, dispatch])

  return item === null ? (
    <NotFound />
  ) : (
    <main className="appdetail-main">
      <div className="back-btn">
        <div className="container">
          <div className="row">
            <a href="/appmarketplace">Back</a>
          </div>
        </div>
      </div>
      <div className="appdetail-header">
        <AppDetailHeader item={item} />
      </div>
      <div className="product-description">
        <div className="container">
          <Typography variant="body2">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia. It is a paradisematic
            country, in which roasted parts of sentences fly into your mouth.
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic life One day however a small line of
            blind text by the name of Lorem Ipsum decided to leave for the far
            World of Grammar...
          </Typography>
          <a href="/#" className="product-desc-more">
            + more
          </a>
        </div>
      </div>
      <div className="appdetail-gallery">
        <AppDetailImageGallery />
      </div>
      <div className="appdetail-privacy">
        <AppDetailPrivacy />
      </div>
      <div className="appdetail-howtouse">
        <AppDetailHowToUse />
      </div>
      <div className="appdetail-provider">
        <AppDetailProvider />
      </div>
      <div className="appdetail-tags">
        <AppDetailTags />
      </div>
    </main>
  )
}
