import { useEffect, useState } from 'react'
import { Navigation, IconButton } from 'cx-portal-shared-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import './Footer.scss'

export const Footer = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  const items = pages.map((page) => ({
    to: page,
    title: t(`pages.${page}`),
  }))
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const toggleVisibility = () => {
    setShowScrollToTop(window.pageYOffset > 350)
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="Footer">
      {showScrollToTop && (
        <IconButton
          color="primary"
          onClick={scrollToTop}
          sx={{ position: 'absolute', right: '40px', top: '2px' }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
      <img
        className="footer-head"
        src="/orange-background-head.svg"
        alt="orange background"
      />
      <div className="footer-content">
        <Navigation unstyled items={items} component={NavLink} />
        <span className="copyright">{`${t('content.footer.copyright')}`}</span>
      </div>
    </div>
  )
}
