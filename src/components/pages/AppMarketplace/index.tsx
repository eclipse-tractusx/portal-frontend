import StageSection from './StageSection'
import AppListSection from './AppListSection'
import SearchSection from './SearchSection'
import { Box } from '@mui/material'
import PageService from 'services/PageService'
import { useRef } from 'react'

export default function AppMarketplace() {
  const reference = PageService.registerReference('AppList', useRef(null))

  return (
    <>
      <StageSection />
      <Box ref={reference} className="overview-section">
        <Box sx={{ py: '40px' }}></Box>
        <SearchSection />
        <AppListSection />
      </Box>
    </>
  )
}
