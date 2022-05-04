import { Grid }  from '@mui/material';

interface TwinDetailGridProps {
  topic: string,
  content: string | number
}
export const TwinDetailGrid = ({topic, content}: TwinDetailGridProps) => {
  return(
    <>
      <Grid item xs={6}>
        {topic}
      </Grid>
      <Grid item xs={6} sx={{overflowWrap: 'anywhere'}}>
        {content}
      </Grid>
    </>
  )
}