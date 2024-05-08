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

import { Table, Typography } from '@catena-x/portal-shared-components'
import { appManagementSelector } from 'features/appManagement/slice'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  type CompanyDataType,
  SharingStateStatusType,
  useFetchInputCompanyBusinessPartnersMutation,
  useFetchOutputCompanyBusinessPartnersMutation,
  useFetchSharingStateQuery,
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
} from 'features/companyData/slice'
import LoadingProgress from 'components/shared/basic/LoadingProgress'

export const CompanyAddressList = ({
  handleButtonClick,
  handleSecondButtonClick,
}: {
  handleButtonClick: () => void
  handleSecondButtonClick: () => void
}) => {
  const { t } = useTranslation()
  const searchInputData = useSelector(appManagementSelector)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const { data } = useFetchSharingStateQuery()
  const sharingStates = data?.content
  const [outputRequest] = useFetchOutputCompanyBusinessPartnersMutation()
  const [inputRequest] = useFetchInputCompanyBusinessPartnersMutation()
  const [outputs, setOutputs] = useState<CompanyDataType[]>([])
  const [inputs, setInputs] = useState<CompanyDataType[]>([])
  const [details, setDetails] = useState<boolean>(false)
  const dispatch = useDispatch()

  const getInputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) => state.sharingStateType === SharingStateStatusType.Pending
      )
      .map((state) => state.externalId)

    if (params && params?.length > 0)
      await inputRequest(params)
        .unwrap()
        .then((payload) => {
          setOutputs(payload.content)
        })
  }

  const getOutputItems = async () => {
    const params = sharingStates
      ?.filter(
        (state) => state.sharingStateType === SharingStateStatusType.Success
      )
      .map((state) => state.externalId)
    if (params && params?.length > 0)
      await outputRequest(params)
        .unwrap()
        .then((payload) => {
          setInputs(payload.content)
        })
  }

  useEffect(() => {
    getInputItems()
    getOutputItems()
  }, [sharingStates])

  const getStatus = (id: string) =>
    sharingStates?.filter((state) => id === state.externalId)[0]
      .sharingStateType

  const onRowClick = (params: GridCellParams) => {
    const status = getStatus(params.row.externalId)
    setDetails(true)
    dispatch(setSelectedCompanyStatus(status))
    dispatch(setSelectedCompanyData(params.row))
  }

  return (
    <>
      {inputs.length > 0 || outputs.length > 0 ? (
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
          searchInputData={searchInputData}
          searchExpr={searchExpr}
          onSearch={(expr: string) => {
            setSearchExpr(expr)
          }}
          searchDebounce={1000}
          noRowsMsg={t('content.companyData.table.noRowsMsg')}
          title={t('content.companyData.table.title')}
          getRowId={(row: { [key: string]: string }) => row.externalId}
          rows={inputs.concat(outputs)}
          onCellClick={onRowClick}
          columns={[
            {
              field: 'site',
              headerAlign: 'center',
              align: 'center',
              headerName: t('content.companyData.table.site'),
              flex: 1,
              valueGetter: ({ row }: { row: CompanyDataType }) => row.site.name,
            },
            {
              field: 'address',
              headerAlign: 'center',
              align: 'center',
              headerName: t('content.companyData.table.location'),
              flex: 2,
              valueGetter: ({ row }: { row: CompanyDataType }) =>
                `${row.address.name},${row.address.physicalPostalAddress.street.name},${row.address.physicalPostalAddress.street.houseNumber},${row.address.physicalPostalAddress.city},${row.address.physicalPostalAddress.postalCode},${row.address.physicalPostalAddress.country}`,
            },
            {
              field: 'status',
              headerName: '',
              align: 'center',
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
                    {status === SharingStateStatusType.Success && (
                      <CheckCircleIcon />
                    )}
                    {status === SharingStateStatusType.Pending && (
                      <HourglassBottomIcon />
                    )}
                    {status === SharingStateStatusType.Ready && (
                      <WarningAmberIcon />
                    )}
                    <Typography
                      sx={{
                        marginLeft: '10px',
                      }}
                      variant="body3"
                    >
                      {status}
                    </Typography>
                  </Box>
                )
              },
            },
            {
              field: 'details',
              headerName: '',
              align: 'center',
              flex: 0.5,
              renderCell: () => {
                return (
                  <ArrowForwardIcon
                    sx={{
                      cursor: 'pointer',
                    }}
                  />
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
        />
      )}
    </>
  )
}
