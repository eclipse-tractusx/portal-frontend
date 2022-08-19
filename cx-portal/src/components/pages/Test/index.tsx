import { Dropzone } from 'components/shared/basic/Dropzone'
import DropArea from 'components/shared/basic/Dropzone/components/DropArea'
import { Box } from '@mui/material'
import { isString } from 'lodash'
import { useCallback, useState } from 'react'
import { Cards } from 'cx-portal-shared-components'
import { appToCard } from 'features/apps/mapper'

export default function Test() {
  const [items, setItems] = useState([])

  const onFileDrop = (files: File[]) => {
    files.forEach((file: File) => {
      console.log('file', file)
      /*
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
      */
    })
  }

  const jsonPreview = (files: File[]) => (
    <>
      {files
        .filter((file: File) => file.type === 'application/json')
        .map((file: File) => {
          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            const str = reader.result
            if (isString(str)) setItems(JSON.parse(str))
          }
          const json = reader.readAsText(file)
        })}
    </>
  )

  return (
    <main>
      <section>
        <Dropzone onFileDrop={jsonPreview}>
          <Cards
            columns={4}
            buttonText={'click'}
            items={items.map(appToCard)}
          />
        </Dropzone>
      </section>
    </main>
  )
}
/*
<Box sx={{display: 'flex', flexWrap: 'wrap'}}>
  {items.map((item,i) => <pre key={i} style={{overflow: 'hidden', margin: '10px', width: '200px', fontSize: '7px', border: '1px solid lightgray'}}>{JSON.stringify(item, null, 2)}</pre>)}
</Box>
*/
