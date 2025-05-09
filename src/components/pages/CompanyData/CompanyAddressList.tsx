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
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  type CompanyDataType,
  SharingStateStatusType,
  useFetchInputCompanyBusinessPartnersMutation,
  useFetchOutputCompanyBusinessPartnersMutation,
  useFetchSharingStateQuery,
  AddressType,
  type SharingStateType,
} from 'features/companyData/companyDataApiSlice'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { type GridCellParams } from '@mui/x-data-grid'
import DetailsOverlay from './DetailsOverlay'
import {
  companyRefetch,
  setCompanyPageRefetch,
  setSelectedCompanyData,
  setSelectedCompanyStatus,
  setSharingStateInfo,
} from 'features/companyData/slice'
import { statusColorMap } from 'utils/dataMapper'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import UploadIcon from '@mui/icons-material/Upload'

export const CompanyAddressList = ({
  handleButtonClick,
  handleSecondButtonClick,
  handleConfirm,
}: {
  handleButtonClick: () => void
  handleSecondButtonClick: () => void
  handleConfirm: () => void
}) => {
  const { t } = useTranslation()
  const [noRowsMsg, setNoRowsMsg] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const {
    data,
    isFetching,
    error: sharingStateError,
    refetch: refetchSharingState,
  } = useFetchSharingStateQuery({
    page,
  })
  const [sharingStates, setSharingStates] = useState<SharingStateType[]>([])
  const [outputRequest, { isLoading: isOutputLoading, error: outputError }] =
    useFetchOutputCompanyBusinessPartnersMutation()
  const [inputRequest, { isLoading: isInputLoading, error: inputError }] =
    useFetchInputCompanyBusinessPartnersMutation()
  const [outputs, setOutputs] = useState<CompanyDataType[]>([])
  const [inputs, setInputs] = useState<CompanyDataType[]>([])
  const [details, setDetails] = useState<boolean>(false)
  const dispatch = useDispatch()
  const refetch = useSelector(companyRefetch)

  const rows = useMemo(() => inputs.concat(outputs), [inputs, outputs])

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
      setInputs([])
      setOutputs([])
      setPage(0)
      refetchSharingState()
      dispatch(setCompanyPageRefetch(false))
    }
    getInputItems()
    getOutputItems()
  }, [sharingStates, refetch])

  useEffect(() => {
    if (data) {
      setSharingStates((i) =>
        page === 0 ? data.content : i.concat(data.content)
      )
    }
  }, [data])

  useEffect(() => {
    if (rows && rows.length === 0) {
      setNoRowsMsg(t('global.table.emptyDataMsg'))
    }
  }, [rows])

  const getStatus = (id: string) =>
    sharingStates?.filter((state) => id === state.externalId)[0]
      ?.sharingStateType

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
      <Table
        loading={isFetching ?? isOutputLoading ?? isInputLoading}
        hasMore={data && data.totalPages > page + 1}
        nextPage={() => {
          setPage((i) => i + 1)
        }}
        hideFooterPagination={true}
        buttons={[
          {
            title: t('content.companyData.table.buttonSite'),
            click: () => {
              handleSecondButtonClick()
            },
            icon: <AddCircleOutlineIcon />,
          },
          {
            title: t('content.companyData.csvUploadBtn'),
            click: () => dispatch(show(OVERLAYS.CSV_UPLOAD_OVERLAY)),
            icon: <UploadIcon />,
          },
        ]}
        autoFocus={false}
        onButtonClick={handleButtonClick}
        rowsCount={inputs.length + outputs.length}
        buttonLabel={t('content.companyData.table.buttonAddress')}
        toolbarVariant="premium"
        searchPlaceholder={t('content.companyData.table.search')}
        columnHeadersBackgroundColor={'#FFFFFF'}
        searchDebounce={1000}
        noRowsMsg={
          !isFetching && !isOutputLoading && !isInputLoading ? noRowsMsg : ''
        }
        title={t('content.companyData.table.title')}
        getRowId={(row: { [key: string]: string }) => row.createdAt}
        rows={inputs.concat(outputs)}
        onCellClick={onRowClick}
        error={errorObj.status === 0 ? null : errorObj}
        columns={[
          {
            field: 'site',
            headerAlign: 'left',
            align: 'left',
            headerName: t('content.companyData.table.site'),
            flex: 1.5,
            valueGetter: (_value_, row: CompanyDataType) =>
              row.site?.name ?? '',
          },
          {
            field: 'address',
            headerAlign: 'left',
            align: 'left',
            headerName: t('content.companyData.table.location'),
            flex: 2,
            valueGetter: (_value_, row: CompanyDataType) =>
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
            valueGetter: (_value_, row: CompanyDataType) =>
              row.address.addressType === AddressType.SiteMainAddress
                ? 'S'
                : 'A',
          },
          {
            field: 'status',
            headerName: t('content.companyData.table.status'),
            align: 'left',
            flex: 1,
            renderCell: ({ row }: { row: CompanyDataType }) => {
              if (sharingStates.length > 0) {
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
              }
            },
          },
          {
            field: 'details',
            headerName: t('content.companyData.table.details'),
            align: 'left',
            flex: 1,
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
      {details && (
        <DetailsOverlay
          title={t('content.companyData.label')}
          handleClose={() => {
            setDetails(false)
          }}
          open={details}
          handleConfirm={() => {
            setSharingStates([])
            handleConfirm()
          }}
        />
      )}
    </>
  )
}
