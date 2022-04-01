import { Trans, useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { Dropzone } from './Dropzone'

export const MultipleUserContent = () => {
  const { t } = useTranslation()
  const dropzoneProps = {
    title: t('content.addUser.userUpload.title'),
    subTitle: t('content.addUser.userUpload.subtitle'),
    fileTypes: 'image/*,audio/*,video/*',
    maxFilesCount: 3,
    getUploadParams: () => ({ url: 'https://httpbin.org/post' }),
    onChangeStatus: ({ meta }: { [name: string]: any }, status: string) => {
      if (status === 'headers_received') {
        console.log(`${meta.name} uploaded`)
      } else if (status === 'aborted') {
        console.log(`${meta.name}, upload failed...`)
      }
    },
    statusText: {
      rejected_file_type: t(
        'content.addUser.userUpload.uploadStatus.rejected_file_type'
      ),
      rejected_max_files: t(
        'content.addUser.userUpload.uploadStatus.rejected_max_files'
      ),
      preparing: t('content.addUser.userUpload.uploadStatus.preparing'),
      error_file_size: t(
        'content.addUser.userUpload.uploadStatus.error_file_size'
      ),
      error_validation: t(
        'content.addUser.userUpload.uploadStatus.error_validation'
      ),
      ready: t('content.addUser.userUpload.uploadStatus.ready'),
      started: t('content.addUser.userUpload.uploadStatus.started'),
      getting_upload_params: t(
        'content.addUser.userUpload.uploadStatus.getting_upload_params'
      ),
      error_upload_params: t(
        'content.addUser.userUpload.uploadStatus.error_upload_params'
      ),
      uploading: t('content.addUser.userUpload.uploadStatus.uploading'),
      exception_upload: t(
        'content.addUser.userUpload.uploadStatus.exception_upload'
      ),
      aborted: t('content.addUser.userUpload.uploadStatus.aborted'),
      restarted: t('content.addUser.userUpload.uploadStatus.restarted'),
      removed: t('content.addUser.userUpload.uploadStatus.removed'),
      error_upload: t('content.addUser.userUpload.uploadStatus.error_upload'),
      headers_received: t(
        'content.addUser.userUpload.uploadStatus.headers_received'
      ),
      done: t('content.addUser.userUpload.uploadStatus.done'),
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
        {t('content.addUser.multipleUserHeadline')}
      </Typography>
      <Typography
        sx={{ marginBottom: '30px', textAlign: 'center' }}
        variant="body2"
      >
        <Trans i18nKey="content.addUser.multipleUserSubheadline">
          Please use this <a href="/">upload Template</a> to add multiple users
          by file
        </Trans>
      </Typography>
      <Dropzone
        title={dropzoneProps.title}
        subTitle={dropzoneProps.subTitle}
        fileTypes={'image/*,audio/*,video/*'}
        maxFilesCount={3}
        statusText={dropzoneProps.statusText}
        errorStatus={dropzoneProps.errorStatus}
        onChangeStatus={dropzoneProps.onChangeStatus}
        getUploadParams={dropzoneProps.getUploadParams}
      />
    </Box>
  )
}
