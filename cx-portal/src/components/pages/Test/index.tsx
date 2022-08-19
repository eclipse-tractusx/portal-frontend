import { Dropzone } from 'components/shared/basic/Dropzone'
import { useAddServiceAccountMutation } from 'features/admin/serviceApiSlice'
import { isString } from 'lodash'
import { useState } from 'react'
import ItemProcessor from './ItemProcessor'

export default function Test() {
  const [addServiceAccount] = useAddServiceAccountMutation()

  const [items, setItems] = useState<any[]>([])

  const techUserRowToJson = (row: string) =>
    ((cols: string[]) =>
      cols.length === 3 && {
        name: cols[1],
        authenticationType: 'SECRET',
        description: cols[2],
        roleIds: [cols[0]],
      })(row.split(','))

  const csvPreview = (files: File[]) =>
    files
      .filter((file: File) => file.type === 'text/csv')
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const str = reader.result
          if (!isString(str)) return
          const techusers = str.split('\n').map(techUserRowToJson)
          setItems([...new Set([...items, ...techusers])])
        }
        reader.readAsText(file)
      })

  return (
    <main>
      <section>
        <Dropzone onFileDrop={csvPreview} />
        <ItemProcessor items={items} process={addServiceAccount} />
      </section>
    </main>
  )
}

/*
<Box sx={{display: 'flex', flexWrap: 'wrap'}}>
  {items.map((item,i) => <pre key={i} style={{overflow: 'hidden', margin: '10px', width: '200px', fontSize: '7px', border: '1px solid lightgray'}}>{JSON.stringify(item, null, 2)}</pre>)}
</Box>
*/

/*
  <Cards
    columns={4}
    buttonText={'click'}
    items={items.map(appToCard)}
  />
*/
