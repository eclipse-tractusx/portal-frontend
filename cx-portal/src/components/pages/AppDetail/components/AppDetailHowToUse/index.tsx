import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import './AppDetailHowToUse.scss'

export default function AppDetailHowToUse() {
  const { t } = useTranslation()

  return (
    <>
      <div className="howtouse-content">
        <div className="container">
          <Typography variant="h4">How To Use</Typography>
          <Typography variant="body2">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </Typography>
        </div>
      </div>
      <div className="privacy-table">
        <div className="container">
          <ul>
            <li><a href="#">Document 1</a></li>
            <li><a href="#">Document 2</a></li>
            <li><a href="#">Document 3</a></li>
            <li><a href="#">Document 4</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
