/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { Trans, useTranslation } from 'react-i18next'
import {
  Tooltips,
  Typography,
  CfxButton,
  CfxFormControl,
  CfxFormControlLabel,
  CfxRadio,
  CfxRadioGroup,
  cfxLightTheme,
} from '@cofinity-x/shared-components'
import './style.scss'
import Overlay from './Overlay'
import {
  useFetchUsecaseQuery,
  type VerifiedCredentialsData,
} from 'features/usecase/usecaseApiSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'

interface SelectedCredentialData {
  credential: VerifiedCredentialsData
  credentialType: string
}

export default function ComapnyWalletSubNavigationHeader(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, refetch, isLoading } = useFetchUsecaseQuery('Active')
  const [selectedCredential, setSelectedCredential] =
    useState<SelectedCredentialData | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleOverLayClose = (): void => {
    setSelectedCredential(null)
    setOpenDialog(false)
  }

  const handleCredentialSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedId = event.target.value

    const selectedItem = data?.find((item) =>
      item.verifiedCredentials.some(
        (cred) => cred.externalDetailData.id === selectedId
      )
    )

    const selectedCredential = selectedItem?.verifiedCredentials.find(
      (cred) => cred.externalDetailData.id === selectedId
    )

    if (selectedCredential && selectedItem) {
      // Store both the credential and its credentialType in state
      setSelectedCredential({
        credential: selectedCredential,
        credentialType: selectedItem.credentialType,
      })
    }
  }

  const renderCredentialData = (credential: VerifiedCredentialsData) => {
    return (
      <div className="credential-list-item">
        <Trans
          i18nKey={`content.companyWallet.credentialType.${credential.externalDetailData.verifiedCredentialExternalTypeId}`}
          components={{ strong: <strong /> }}
        />
        <div className="cx-credentials">
          <Tooltips
            tooltipPlacement="top-start"
            tooltipText={
              !credential.externalDetailData.template
                ? t('content.usecaseParticipation.nodocument')
                : ''
            }
            children={
              <Link
                to={credential.externalDetailData.template}
                target={credential.externalDetailData.template && '_blank'}
                className={`thirdSection ${
                  !credential.externalDetailData.template && 'documentDisabled'
                }`}
              >
                <Typography variant="body3" className="framework">
                  {t('content.usecaseParticipation.framework')}
                  <LaunchIcon />
                </Typography>
              </Link>
            }
          />
          <Trans
            values={{
              version: credential.externalDetailData.version,
            }}
          >
            <Typography variant="body3" className="secondSection">
              {t('content.usecaseParticipation.version')}
            </Typography>
          </Trans>
          <Trans
            values={{
              expiry: credential.externalDetailData.expiry
                ? credential.externalDetailData.expiry.split('T')[0]
                : '',
            }}
          >
            <Typography variant="body3" className="forthSection">
              {credential.externalDetailData.expiry
                ? t('content.usecaseParticipation.expiry')
                : 'N/A'}
            </Typography>
          </Trans>
        </div>
      </div>
    )
  }

  const renderCredentialContent = () => {
    if (!data?.length) return null

    return (
      <CfxFormControl component="fieldset">
        <CfxRadioGroup
          value={selectedCredential?.credential.externalDetailData.id}
          onChange={handleCredentialSelection}
        >
          {data.flatMap((item) =>
            item.verifiedCredentials.map((credential) => (
              <CfxFormControlLabel
                key={credential.externalDetailData.id}
                value={credential.externalDetailData.id}
                control={<CfxRadio />}
                label={renderCredentialData(credential)}
              />
            ))
          )}
        </CfxRadioGroup>
      </CfxFormControl>
    )
  }

  return (
    <div className="subnavigation">
      <CfxButton
        data-testid="company-wallet-subnavigation-button4"
        key={t('content.companyWallet.subnavigation.button4')}
        onClick={() => {
          setOpenDialog(true)
        }}
        variant="text"
        size="medium"
        sx={{
          backgroundColor: cfxLightTheme.palette.primary.main,
          color: cfxLightTheme.palette.common.white,
          fontSize: '16px',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: cfxLightTheme.palette.primary.dark,
          },
        }}
      >
        <ConfirmationNumberOutlinedIcon
          sx={{
            marginRight: '.7rem',
            width: '24px',
            height: '24px',
            strokeWidth: 8,
            transform: 'scale(1.2)',
          }}
        />
        {t('content.companyWallet.subnavigation.button4')}
      </CfxButton>
      <Overlay
        loading={isLoading}
        title={t('content.companyWallet.subnavigation.button1')}
        description={
          <Trans i18nKey="content.companyWallet.subnavigation.button1description">
            <br />
          </Trans>
        }
        handleConfirmClick={() => {
          if (selectedCredential) {
            dispatch(
              show(
                OVERLAYS.EDIT_USECASE,
                selectedCredential.credential.externalDetailData.id,
                selectedCredential.credentialType,
                undefined,
                undefined,
                undefined,
                selectedCredential.credential.externalDetailData.template
              )
            )
            handleOverLayClose()
          }
        }}
        handleOverlayClose={handleOverLayClose}
        openDialog={openDialog}
        showConfirmButton={!!selectedCredential}
        className="cx-overlay-header"
      >
        {renderCredentialContent()}
      </Overlay>
    </div>
  )
}
