import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from 'components/pages/NotFound'
import AccessService from 'services/AccessService'
import ScrollToTop from '../utils/ScrollToTop'

const AuthorizingRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}>
          {AccessService.permittedRoutes()}
          <Route path="*" element={NotFound()} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AuthorizingRouter
