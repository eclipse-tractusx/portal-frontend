import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from 'components/pages/NotFound'
import AccessService from 'services/AccessService'

const AuthorizingRouter = () => {
  return (
    <BrowserRouter>
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
