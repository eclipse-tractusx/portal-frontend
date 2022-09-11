import React from 'react'
export type TableType = {
  head: string[]
  body: string[][] | React.FC[][]
}
