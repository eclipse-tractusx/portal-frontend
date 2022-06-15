import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

interface DetailGridProps {
  topic: string
  content: string | number
  link?: any
}
export const DetailGrid = ({ topic, content, link }: DetailGridProps) => {
  return (
    <Grid container sx={{ mb: 2, typography: 'body3' }}>
      <Grid item xs={6}>
        {topic}
      </Grid>
      <Grid item xs={6} sx={{ overflowWrap: 'anywhere' }}>
        {link ? <Link to={link}>{content}</Link> : content}
      </Grid>
    </Grid>
  )
}
