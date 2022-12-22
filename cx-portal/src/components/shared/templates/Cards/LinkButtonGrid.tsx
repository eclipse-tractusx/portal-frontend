import { Typography } from 'cx-portal-shared-components'
import React from 'react'
import { ProviderProps, linkProps } from 'types/StaticTemplate'

export default function LinkButtonGrid({
  provider,
  grid = 3,
}: {
  provider: ProviderProps
  grid: number
}) {
  return (
    <div
      className="linkGridContainer"
      style={{
        gridTemplateColumns: `repeat(${grid}, 1fr)`,
      }}
    >
      {provider.links.map((link: linkProps) => {
        return (
          <div
            key={link.title}
            style={{
              backgroundColor: link.background,
              width: `${100 / grid}%`,
            }}
          >
            <Typography variant="h5">{link.title}</Typography>
          </div>
        )
      })}
    </div>
  )
}
