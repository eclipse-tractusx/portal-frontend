import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccessService from 'services/AccessService'
import ScrollToTop from '../utils/ScrollToTop'
import ErrorBondary from 'components/pages/ErrorBoundary'

const ErrorRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="error" element={<ErrorBondary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ErrorRouter
