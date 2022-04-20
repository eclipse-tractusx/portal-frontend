import { Typography } from "cx-portal-shared-components"
import { useTranslation } from "react-i18next";

const Header =() => {
  const { t } = useTranslation();
  return(
    <div className="header-section">
      <div className="header-content">
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h4">
        {t('pages.digitaltwin')}
        </Typography>
      </div>
      <img
        src="./stage-header-background.png"
        alt="Header Background"
      />
    </div>
  )
}

export default Header;