import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box } from '@mui/material'
import { Typography } from '../../basic/Typography';

function LinkText(props: { title: string; link: string, noBorder: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: props.noBorder ? '0px' : '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px 0px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.link, '_blank')}
    >
      <Typography>{props.title}</Typography>
      <OpenInNewIcon />
    </Box>
  )
}

export const AboutCard = (props: {
  title: string
  subtitles: string[]
  links: { text: string; url: string }[]
  footerText: string
}) => {
  const parentBlock = {

  }
  return (
    <Box sx={{
      background: '#FFFFFF',
      boxShadow: '0px 5px 10px rgba(80, 80, 80, 0.3)',
      borderRadius: '8px',
      padding: '20px 20px 0px 20px'
    }}>
      <Box>
      <Typography variant='h3'>{props.title}</Typography>
        <Box>
          <Box
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            {props.subtitles.map((str) => (
              <Typography
                sx={{
                  padding: '10px 0px',
                }}
                key={str}
              >
                {str}
              </Typography>
            ))}
          </Box>
          {props.links.map((link, index) => (
            <LinkText key={link.text} title={link.text} link={link.url} noBorder={props.links.length - 1 === index} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
