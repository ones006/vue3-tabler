// Composable for flexible link component usage
// This allows components to work with vue-router, Inertia, or any custom link component

import { inject, type Component } from 'vue'

export function useLinkComponent(propLinkComponent?: Component) {
  // Inject global link component if available
  const injectedLinkComponent = inject<Component | undefined>('linkComponent', undefined)

  // Get the appropriate link component for a given href
  const getLinkComponent = (href?: string) => {
    if (!href) return 'span'
    if (isExternalLink(href)) return 'a'
    return propLinkComponent || injectedLinkComponent || 'a'
  }

  // Check if a link is external
  const isExternalLink = (href: string) => {
    try {
      const url = new URL(href, window.location.origin)
      return url.origin !== window.location.origin
    } catch {
      // If URL parsing fails, treat as relative/internal
      return false
    }
  }

  return {
    getLinkComponent,
    isExternalLink
  }
}
