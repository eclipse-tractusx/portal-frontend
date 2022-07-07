import i18next from 'i18next'

export default function SetLang({ lang }: { lang: string }) {
  i18next.changeLanguage(lang)

  return <></>
}
