import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccessService from 'services/AccessService'
import ScrollToTop from '../utils/ScrollToTop'

const AuthorizingRouter = () => {
  const routes = AccessService.permittedRoutes()
  console.log(routes)
  routes.map(route => console.log(route))
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}>
          {AccessService.permittedRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AuthorizingRouter
