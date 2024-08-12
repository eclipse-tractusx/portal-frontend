/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Chip, IconButton, Table } from '@catena-x/portal-shared-components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  type CompanyDataType,
  SharingStateStatusType,
  useFetchInputCompanyBusinessPartnersMutation,
  useFetchOutputCompanyBusinessPartnersMutation,
  useFetchSharingStateQuery,
  AddressType,
} from 'features/companyData/companyDataApiSlice'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { type GridCellParams } from '@mui/x-data-grid'
import DetailsOverlay from './DetailsOverlay'
import {
  setSelectedCompanyData,
  setSelectedCompanyStatus,
  setSharingStateInfo,
} from 'features/companyData/slice'
import LoadingProgress from 'components/shared/basic/LoadingProgress'

type StatusColorType =
  | 'success'
  | 'warning'
  | 'info'
  | 'primary'
  | 'error'
  | undefined

const statusColorMap: Record<SharingStateStatusType, StatusColorType> = {
  [SharingStateStatusType.Success]: 'success',
  [SharingStateStatusType.Initial]: 'warning',
  [SharingStateStatusType.Pending]: 'info',
  [SharingStateStatusType.Ready]: 'primary',
  [SharingStateStatusType.Error]: 'error',
}

export const CompanyAddressList = ({
  handleButtonClick,
  handleSecondButtonClick,
  refetch = false,
  handleConfirm,
}: {
  handleButtonClick: () => void
  handleSecondButtonClick: () => void
  refetch: boolean
  handleConfirm: () => void
}) => {
  const { t } = useTranslation()
  const {
    data,
    refetch: refreshSharingData,
    isFetching,
    error: sharingStateError,
  } = useFetchSharingStateQuery()
  const sharingStates = data?.content
  const [outputRequest, { isLoading: isOutputLoading, error: outputError }] =
    useFetchOutputCompanyBusinessPartnersMutation()
  const [inputRequest, { isLoading: isInputLoading, error: inputError }] =
    useFetchInputCompanyBusinessPartnersMutation()
  const [outputs, setOutputs] = useState<CompanyDataType[]>([])
  const [inputs, setInputs] = useState<CompanyDataType[]>([])
  const [details, setDetails] = useState<boolean>(false)
  const dispatch = useDispatch()

  const getInputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) =>
          state.sharingStateType === SharingStateStatusType.Pending ||
          state.sharingStateType === SharingStateStatusType.Initial ||
          state.sharingStateType === SharingStateStatusType.Ready ||
          state.sharingStateType === SharingStateStatusType.Error
      )
      .map((state) => state.externalId)

    if (params && params?.length > 0) {
      await inputRequest(params)
        .unwrap()
        .then((payload) => {
          setOutputs(payload.content)
        })
    } else {
      setOutputs([])
    }
  }

  const getOutputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) => state.sharingStateType === SharingStateStatusType.Success
      )
      .map((state) => state.externalId)
    if (params && params?.length > 0) {
      await outputRequest(params)
        .unwrap()
        .then((payload) => {
          setInputs(payload.content)
        })
    } else {
      setInputs([])
    }
  }

  useEffect(() => {
    if (refetch) {
      refreshSharingData()
      setInputs([])
      setOutputs([])
    }
    getInputItems()
    getOutputItems()
  }, [sharingStates, refetch])

  const getStatus = (id: string) =>
    sharingStates?.filter((state) => id === state.externalId)[0]
      .sharingStateType

  const onRowClick = (params: GridCellParams) => {
    const sharingStateInfo = sharingStates
      ?.filter(
        (state) => state.sharingStateType === SharingStateStatusType.Error
      )
      .filter((state) => state.externalId === params.row.externalId)
    const status = getStatus(params.row.externalId)
    setDetails(true)
    dispatch(setSelectedCompanyStatus(status))
    dispatch(setSelectedCompanyData(params.row))
    if (sharingStateInfo) dispatch(setSharingStateInfo(sharingStateInfo[0]))
  }

  const renderIcon = (status: string | undefined) => {
    if (status === SharingStateStatusType.Success) {
      return <CheckCircleIcon />
    } else if (
      status === SharingStateStatusType.Pending ||
      status === SharingStateStatusType.Initial ||
      status === SharingStateStatusType.Ready
    ) {
      return <HourglassBottomIcon />
    } else {
      return <WarningAmberIcon />
    }
  }

  const errorObj = {
    status: 0,
  }

  const error = sharingStateError ?? inputError ?? outputError

  if (error && 'status' in error) {
    errorObj.status = error.status as number
  }

  return (
    <>
      {!isFetching && !isOutputLoading && !isInputLoading ? (
        <Table
          autoFocus={false}
          onButtonClick={handleButtonClick}
          rowsCount={inputs.length + outputs.length}
          buttonLabel={t('content.companyData.table.buttonAddress')}
          secondButtonLabel={t('content.companyData.table.buttonSite')}
          onSecondButtonClick={handleSecondButtonClick}
          toolbarVariant="premium"
          searchPlaceholder={t('content.companyData.table.search')}
          columnHeadersBackgroundColor={'#FFFFFF'}
          searchDebounce={1000}
          noRowsMsg={t('content.companyData.table.noRowsMsg')}
          title={t('content.companyData.table.title')}
          getRowId={(row: { [key: string]: string }) => row.createdAt}
          rows={inputs.concat(outputs)}
          onCellClick={onRowClick}
          error={errorObj}
          columns={[
            {
              field: 'site',
              headerAlign: 'left',
              align: 'left',
              headerName: t('content.companyData.table.site'),
              flex: 1.5,
              valueGetter: ({ row }: { row: CompanyDataType }) =>
                row.site?.name ?? '',
            },
            {
              field: 'address',
              headerAlign: 'left',
              align: 'left',
              headerName: t('content.companyData.table.location'),
              flex: 2.5,
              valueGetter: ({ row }: { row: CompanyDataType }) =>
                row.address
                  ? `${row.address.name ?? ''} ${row.address.physicalPostalAddress.street?.name ?? ''} ${row.address.physicalPostalAddress.street?.houseNumber ?? ''} ${row.address.physicalPostalAddress.city ?? ''} ${row.address.physicalPostalAddress.postalCode ?? ''} ${row.address.physicalPostalAddress.country ?? ''}`
                  : '',
            },
            {
              field: 'type',
              headerAlign: 'left',
              align: 'left',
              headerName: t('content.companyData.table.type'),
              flex: 1,
              valueGetter: ({ row }: { row: CompanyDataType }) =>
                row.address.addressType === AddressType.SiteMainAddress
                  ? 'S'
                  : 'A',
            },
            {
              field: 'status',
              headerName: '',
              align: 'left',
              flex: 1,
              renderCell: ({ row }: { row: CompanyDataType }) => {
                const status = getStatus(row.externalId)
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Chip
                      icon={renderIcon(status)}
                      color={
                        status
                          ? statusColorMap[status as SharingStateStatusType]
                          : 'error'
                      }
                      variant="filled"
                      label={status}
                      size="medium"
                      withIcon={true}
                      sx={{
                        marginRight: '0 !important',
                        margin: '0 auto',
                        width: '100px',
                        maxWidth: '100px',
                      }}
                    />
                  </Box>
                )
              },
            },
            {
              field: 'details',
              headerName: '',
              align: 'left',
              flex: 0.5,
              renderCell: () => {
                return (
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      // do nothing
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                )
              },
            },
          ]}
          disableColumnMenu
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LoadingProgress />
        </Box>
      )}
      {details && (
        <DetailsOverlay
          title={t('content.companyData.label')}
          handleClose={() => {
            setDetails(false)
          }}
          open={details}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  )
}
