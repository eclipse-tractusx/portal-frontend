import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import './AppDetailPrivacy.scss'

export default function AppDetailPrivacy() {
  const { t } = useTranslation()

  const tableData: TableType = {
    head: ['Linked to your identity', 'Linked NOT to your identity'],
    body: [
      ['Personal Information', 'Lorem Personal Information'],
      ['Used Content', 'Ipsum Used Content'],
      ['Catena X Account Data', 'Lorem Catena X Account Data'],
      ['Diagnostic Data', ''],
    ],
  }

  return (
    <>
      <div className="privacy-content">
        <div className="container">
          <Typography variant="h4">{t('content.appdetail.privacy.heading')}</Typography>
          <Typography variant="body2">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia. It is a paradisematic
            country, in which roasted parts of sentences fly into your mouth.
          </Typography>
        </div>
      </div>
      <div className="privacy-table">
        <div className="container">
          <StaticTable data={tableData} horizontal={false} />
        </div>
      </div>
    </>
  )
}
