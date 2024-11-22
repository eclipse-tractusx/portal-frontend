import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

interface RoleType {
  roleId: string
  clientId: string
  roleName: string
}
export const useOverlappingContent = ({ roles }: { roles: RoleType[] }) => {
  const [visibleRoles, setVisibleRoles] = useState<(RoleType | string)[]>(roles)
  const [remainingCount, setRemainingCount] = useState<number>(0)
  const { ref: containerRef, width } = useResizeDetector()

  const calculateVisibleRoles = () => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    const children = Array.from(
      container?.children[0]?.children ?? []
    ) as HTMLElement[]
    let usedWidth = 0
    let lastVisibleIndex = -1
    if (children?.length) {
      for (let i = 0; i < children?.length; i++) {
        const childWidth = children[i]?.offsetWidth + 5
        if (usedWidth + childWidth > containerWidth - 55) {
          break
        }
        usedWidth += childWidth
        lastVisibleIndex = i
      }

      setVisibleRoles(roles.slice(0, lastVisibleIndex + 1))
      setRemainingCount(roles.length - (lastVisibleIndex + 1))
    }
  }

  useEffect(() => {
    calculateVisibleRoles()
  }, [width, roles])

  return { containerRef, visibleRoles, remainingCount }
}
