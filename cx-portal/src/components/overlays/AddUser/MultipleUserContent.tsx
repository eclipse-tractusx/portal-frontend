import { Trans, useTranslation } from 'react-i18next'
import { Typography, Dropzone } from 'cx-portal-shared-components'
import { Box } from '@mui/material'

export const MultipleUserContent = () => {
  const { t } = useTranslation('', { keyPrefix: 'content.addUser' })
  const dropzoneProps = {
    title: t('userUpload.title'),
    subtitle: t('userUpload.subtitle'),
    accept: '*',
    getUploadParams: () => ({ url: 'https://httpbin.org/post' }),
    onChangeStatus: ({ meta }: { [name: string]: any }, status: string) => {
      if (status === 'headers_received') {
        console.log(`${meta.name} uploaded`)
      } else if (status === 'aborted') {
        console.log(`${meta.name}, upload failed...`)
      }
    },
    statusText: {
      rejected_file_type: t('userUpload.uploadStatus.rejected_file_type'),
      rejected_max_files: t('userUpload.uploadStatus.rejected_max_files'),
      preparing: t('userUpload.uploadStatus.preparing'),
      error_file_size: t('userUpload.uploadStatus.error_file_size'),
      error_validation: t('userUpload.uploadStatus.error_validation'),
      ready: t('userUpload.uploadStatus.ready'),
      started: t('userUpload.uploadStatus.started'),
      getting_upload_params: t('userUpload.uploadStatus.getting_upload_params'),
      error_upload_params: t('userUpload.uploadStatus.error_upload_params'),
      uploading: t('userUpload.uploadStatus.uploading'),
      exception_upload: t('userUpload.uploadStatus.exception_upload'),
      aborted: t('userUpload.uploadStatus.aborted'),
      restarted: t('userUpload.uploadStatus.restarted'),
      removed: t('userUpload.uploadStatus.removed'),
      error_upload: t('userUpload.uploadStatus.error_upload'),
      headers_received: t('userUpload.uploadStatus.headers_received'),
      done: t('userUpload.uploadStatus.done'),
    },
    errorStatus: [
      'error_upload_params',
      'exception_upload',
      'error_upload',
      'aborted',
      'ready',
    ],
  }

  return (
    <Box sx={{ marginBottom: '30px' }}>
      <Typography
        sx={{ margin: '30px 0 10px', textAlign: 'center' }}
        variant="h5"
      >
        {t('multipleUserHeadline')}
      </Typography>
      <Typography
        sx={{ marginBottom: '30px', textAlign: 'center' }}
        variant="body2"
      >
        <Trans i18nKey="multipleUserSubheadline">
          Please use this <a href="/">upload Template</a> to add multiple users
          by file
        </Trans>
      </Typography>
      <Dropzone
        inputContentTitle={dropzoneProps.title}
        inputContentSubTitle={dropzoneProps.subtitle}
        accept={dropzoneProps.accept}
        statusText={dropzoneProps.statusText}
        errorStatus={dropzoneProps.errorStatus}
        getUploadParams={dropzoneProps.getUploadParams}
        onChangeStatus={dropzoneProps.onChangeStatus}
        multiple={false}
        maxFiles={1}
      />
    </Box>
  )
}
