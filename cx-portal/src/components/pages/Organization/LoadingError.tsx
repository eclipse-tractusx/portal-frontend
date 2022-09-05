import { useTheme, CircularProgress } from '@mui/material'
export default function LoadingError({
  isLoading,
  isError,
  errorText,
}: {
  isLoading: boolean
  isError: boolean
  errorText: string
}) {
  const theme = useTheme()
  return (
    <>
      {isLoading ? (
        <div className="organization-loader">
          <CircularProgress
            size={50}
            sx={{
              color: theme.palette.primary.main,
              zIndex: 1,
              position: 'absolute',
            }}
          />
        </div>
      ) : null}
      {isError ? <div className="organization-error">{errorText}</div> : null}
    </>
  )
}
