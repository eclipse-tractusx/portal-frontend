import { Box } from '@mui/material'
import { FilePreviewItem } from './FilePreviewItem'
import { PreviewItem } from './PreviewItem'

export const Preview = ({
  files,
  itemPreview = (file) => (
    <PreviewItem key={file.name}>
      <FilePreviewItem file={file} />
    </PreviewItem>
  ),
}: {
  files: File[]
  itemPreview?: (file: File) => JSX.Element | Element
}) => {
  return <Box>{files && files.map(itemPreview)}</Box>
}
