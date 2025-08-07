// shared styles for the cfx components

export const GRID_STYLES = {
  display: 'grid',
  gap: '24px',
  maxWidth: '310px',
  margin: '0px auto 60px auto',

  '@media(min-width:768px)': {
    maxWidth: '644px',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media(min-width:1024px)': {
    maxWidth: '976px',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@media (min-width: 1366px)': {
    maxWidth: '1312px',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}
