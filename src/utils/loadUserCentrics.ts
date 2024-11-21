import { useEffect } from 'react'

const loadUserCentrics = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'usercentrics-cmp'
    script.src = 'https://app.usercentrics.eu/browser-ui/latest/loader.js'
    script.async = true
    script.setAttribute('data-settings-id', '1fi6wI3qHCS2h7')
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
}

export default loadUserCentrics
