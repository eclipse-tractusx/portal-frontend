import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const useFormattedDate = () => {
  const { i18n } = useTranslation()

  const formatDate = (date: string | Date, customFormat?: string): string => {
    const lang = i18n.language

    const format = customFormat
      ? customFormat
      : lang === 'de'
        ? 'DD-MM-YYYY'
        : 'YYYY-MM-DD'

    return dayjs(date).format(format)
  }

  return { formatDate, language: i18n.language }
}

export default useFormattedDate
