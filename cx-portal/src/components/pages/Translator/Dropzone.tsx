import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const text = reader.result
        console.log(text)
      }
      reader.readAsText(file, 'utf-8')
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop some files here, or click to select files</p>
    </div>
  )
}
