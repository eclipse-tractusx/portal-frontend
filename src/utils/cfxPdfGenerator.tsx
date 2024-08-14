import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontSize: '12px',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          This PDF is generated automatically as part of the onboarding process.
          Please ignore it.
        </Text>
      </View>
    </Page>
  </Document>
)

export const generateDummyPdf = async () => {
  const blob = await pdf(<MyDocument />).toBlob()
  const pdfFile = new File([blob], 'cfx-dummy.pdf', { type: 'application/pdf' })
  return pdfFile
}
