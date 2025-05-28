import { v4 as uuidv4 } from 'uuid'

declare global {
  interface Window {
    posthog?: {
      identify: (id: string, properties?: Record<string, string>) => void
    }
    __posthogIdentifying?: boolean
  }
}

/**
 * Identify a user in PostHog only if their email domain is 'cofinity-x.com'.
 * @param email - User's email address.
 */
export function identifyCofinityUser(email?: string): void {
  // Early return if email is missing or PostHog is not available
  if (!email || !window.posthog) return

  // Add a guard to prevent infinite recursion
  // PostHog can trigger callbacks that might call this function again
  if (window.__posthogIdentifying) return

  const [, domain] = email.split('@')
  if (domain?.toLowerCase() === 'cofinity-x.com') {
    try {
      // Set tracking flag before making PostHog call
      window.__posthogIdentifying = true

      // Check if we already have a stored distinctId
      const storageKey = 'posthog_distinct_id'
      let distinctId = sessionStorage.getItem(storageKey)

      // If no distinctId found, generate and store a new one
      // We store the distinctId in sessionStorage to avoid generating a new one on every page load
      // Won't work in private mode or in incognito mode
      if (!distinctId) {
        distinctId = uuidv4()
        sessionStorage.setItem(storageKey, distinctId)
      }

      // use a fixed name as identifier to avoid tracking individual users and display it as the user name in PostHog
      window.posthog.identify(distinctId, { name: 'Cofinity-X Internal User' })
      console.log('Identified user in PostHog:', distinctId)
    } finally {
      // Reset tracking flag after PostHog call (even if it fails)
      setTimeout(() => {
        window.__posthogIdentifying = false
      }, 0)
    }
  }
}
