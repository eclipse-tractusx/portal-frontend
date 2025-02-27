import { useEffect } from 'react'

const ClickjackingProtection = () => {
  useEffect(() => {
    if (window.top !== window.self) {
      if (window.top) {
        window.top.location.href = window.self.location.href
      }
    }
  }, [])

  return null
}

export default ClickjackingProtection
