import { DropArea } from 'cx-portal-shared-components'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IHashMap } from 'types/MainTypes'
import { Preview } from './components/Preview'

export const Dropzone = ({
  onFileDrop,
  preview = (files) => <Preview files={files} />,
  children,
}: {
  onFileDrop: (files: File[]) => void
  preview?: (files: File[]) => JSX.Element
  children?: JSX.Element[] | JSX.Element
}) => {
  const [dropped, setDropped] = useState<IHashMap<File>>({})

  const onDrop = useCallback(
    (files: File[]) => {
      setDropped(
        files.reduce(
          (map: any, file: File) => {
            map[file.name] = file
            return map
          },
          { ...dropped }
        )
      )
      onFileDrop(files)
    },
    [dropped, onFileDrop]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <DropArea />
      {preview(Object.values(dropped))}
      {children}
    </div>
  )
}
