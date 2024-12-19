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
  type PaginationModel,
  type CompanyAddressListProps,
} from 'features/companyData/companyDataApiSlice'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { type GridColDef, type GridCellParams } from '@mui/x-data-grid'
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
}: CompanyAddressListProps) => {
  const { t } = useTranslation()

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)
  const {
    data,
    isFetching,
    error: sharingStateError,
    refetch: refetchSharingState,
  } = useFetchSharingStateQuery({
    page,
    size: pageSize,
  })

  const [sharingStates, setSharingStates] = useState<SharingStateType[]>([])
  const [outputRequest, { isLoading: isOutputLoading, error: outputError }] =
    useFetchOutputCompanyBusinessPartnersMutation()
  const [inputRequest, { isLoading: isInputLoading, error: inputError }] =
    useFetchInputCompanyBusinessPartnersMutation()
  const [outputs, setOutputs] = useState<CompanyDataType[]>([])
  const [inputs, setInputs] = useState<CompanyDataType[]>([])
  const [details, setDetails] = useState<boolean>(false)
  const [combinedRows, setCombinedRows] = useState<CompanyDataType[]>([])
  const dispatch = useDispatch()
  const refetch = useSelector(companyRefetch)
  const [fetchedOutputIds, setFetchedOutputIds] = useState<Set<string>>(
    new Set()
  )
  const [fetchedInputIds, setFetchedInputIds] = useState<Set<string>>(new Set())

  const getInputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) =>
          (state.sharingStateType === SharingStateStatusType.Pending ||
            state.sharingStateType === SharingStateStatusType.Initial ||
            state.sharingStateType === SharingStateStatusType.Ready ||
            state.sharingStateType === SharingStateStatusType.Error) &&
          !fetchedInputIds.has(state.externalId)
      )
      .map((state) => state.externalId)

    if (params && params?.length > 0) {
      await inputRequest({ ids: params, page: 0, size: pageSize })
        .unwrap()
        .then((payload) => {
          setOutputs((prev) => [...prev, ...payload.content])
          setFetchedInputIds((prev) => new Set([...prev, ...params]))
        })
    }
  }

  const getOutputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) =>
          state.sharingStateType === SharingStateStatusType.Success &&
          !fetchedOutputIds.has(state.externalId)
      )
      .map((state) => state.externalId)

    if (params && params?.length > 0) {
      await outputRequest({ ids: params, page: 0, size: pageSize })
        .unwrap()
        .then((payload) => {
          setInputs((prev) => [...prev, ...payload.content])
          setFetchedOutputIds((prev) => new Set([...prev, ...params]))
        })
    }
  }

  useEffect(() => {
    // refetchSharingState()
    if (refetch) {
      setInputs([])
      setOutputs([])
      setPage(0)
      refetchSharingState()
      dispatch(setCompanyPageRefetch(false))
    }
    getInputItems()
    getOutputItems()
  }, [page, pageSize])

  useEffect(() => {
    setInputs([])
    setOutputs([])
    setFetchedInputIds(new Set())
    setFetchedOutputIds(new Set())

    const fetchDetails = async () => {
      await Promise.all([getInputItems(), getOutputItems()])
    }

    if (data?.content) {
      setSharingStates(data.content)
      fetchDetails()
    }
  }, [data])

  useEffect(() => {
    const fetchItems = async () => {
      const fetchInputs = getInputItems()
      const fetchOutputs = getOutputItems()
      await Promise.all([fetchInputs, fetchOutputs])
    }

    if (sharingStates.length > 0) {
      fetchItems()
    }
  }, [sharingStates])

  useEffect(() => {
    if (data) {
      setRowCount(data.totalElements)
    }
  }, [data])

  useEffect(() => {
    const combined = [...inputs, ...outputs]
    const uniqueCombined = Array.from(
      new Map(combined.map((item) => [item.externalId, item])).values()
    )
    setCombinedRows(uniqueCombined)
  }, [inputs, outputs])

  const getStatus = (id: string) =>
    sharingStates?.find((state) => id === state.externalId)?.sharingStateType

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
    switch (status) {
      case SharingStateStatusType.Success:
        return <CheckCircleIcon />
      case SharingStateStatusType.Pending:
      case SharingStateStatusType.Initial:
      case SharingStateStatusType.Ready:
        return <HourglassBottomIcon />
      default:
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
  const columns: GridColDef[] = [
    {
      field: 'site',
      headerAlign: 'left',
      align: 'left',
      headerName: t('content.companyData.table.site'),
      flex: 1.5,
      valueGetter: ({ row }: { row: CompanyDataType }) => row.site?.name ?? '',
    },
    {
      field: 'address',
      headerAlign: 'left',
      align: 'left',
      headerName: t('content.companyData.table.location'),
      flex: 2,
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
        row.address.addressType === AddressType.SiteMainAddress ? 'S' : 'A',
    },
    {
      field: 'status',
      headerName: t('content.companyData.table.status'),
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
  ]

  const handlePaginationModelChange = (newModel: PaginationModel) => {
    if (newModel.page !== page) setPage(newModel.page)
    if (newModel.pageSize !== pageSize) setPageSize(newModel.pageSize)
  }

  const paginationProps = {
    onPaginationModelChange: handlePaginationModelChange,
    pageSizeOptions: [5, 10, 15],
    paginationModel: { pageSize, page },
    initialState: { pagination: { paginationModel: { pageSize, page } } },
  }

  return (
    <>
      <Table
        loading={isFetching || isOutputLoading || isInputLoading}
        hasMore={data && data.totalPages > page + 1}
        nextPage={() => {
          if (!isFetching && page + 1 < (data?.totalPages ?? 0)) {
            setPage((prev) => prev + 1)
          }
        }}
        hideFooterPagination={false}
        {...paginationProps}
        rowCount={rowCount}
        paginationMode="server"
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
        hideFooter={false}
        autoFocus={false}
        onButtonClick={handleButtonClick}
        rowsCount={data?.totalElements}
        toolbarVariant="premium"
        searchPlaceholder={t('content.companyData.table.search')}
        columnHeadersBackgroundColor={'#FFFFFF'}
        searchDebounce={1000}
        noRowsMsg={
          !isFetching && !isOutputLoading && !isInputLoading
            ? t('content.companyData.table.noRowsMsg')
            : ''
        }
        title={t('content.companyData.table.title')}
        getRowId={(row: { [key: string]: string }) => row.createdAt}
        // getRowId={(row: CompanyDataType) => row.externalId}
        rows={combinedRows}
        columns={columns}
        onCellClick={onRowClick}
        error={errorObj.status === 0 ? null : errorObj}
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
