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

import { useTranslation, Trans } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import {
  type WalletContent,
  useFetchCompanyWalletQuery,
  CredentialType,
  useRevokeCredentialMutation,
} from 'features/compayWallet/companyWalletApiSlice'
import CompanyWalletSubNavigationHeader from './CompanyWalletSubNavigationHeader'
import WalletCard from './WalletCard'
import RuleCard from './RuleCard'
import { useEffect, useState } from 'react'
import { groupBy } from 'lodash'
import { Box } from '@mui/material'
import LoadingProgress from 'components/shared/basic/LoadingProgress'
import Overlay from './Overlay'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function CompanyWallet(): JSX.Element {
  const { t } = useTranslation()
  const { data, isSuccess, isError, refetch } = useFetchCompanyWalletQuery()
  const [activeWallet, setActiveWallet] = useState<WalletContent[]>([])
  const [credentialId, setCredentialId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [revokeCredential] = useRevokeCredentialMutation()
  useEffect(() => {
    const actives: WalletContent[] = []
    data?.forEach((cont) => {
      if (cont.credentialType === CredentialType.MEMBERSHIP) {
        actives.push(cont)
      }
    })
    setActiveWallet(actives)
  }, [data])

  const groupedItems = groupBy(data, (item: WalletContent) =>
    item.credentialType === CredentialType.TRACEABILITY_FRAMEWORK
      ? item.credentialType
      : t('content.companyWallet.others')
  )

  const handleRevocation = async () => {
    setLoading(true)
    try {
      await revokeCredential(credentialId)
        .unwrap()
        .then(() => {
          setSuccess(true)
          refetch()
        })
    } catch (e) {
      setError(true)
    }
    setLoading(false)
    setCredentialId('')
  }

  return (
    <main className="companywallet-main">
      <div className="companywallet-section">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.companyWallet.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.companyWallet.description')}
            </Typography>
          </Trans>
        </div>
        {isSuccess || isError ? (
          <>
            <div className="container">
              <WalletCard
                isError={activeWallet.length === 0 || isError}
                wallet={activeWallet[0]}
              />
            </div>
            {isSuccess && (
              <>
                <CompanyWalletSubNavigationHeader />
                <div className="container">
                  <RuleCard
                    handleRevoke={(id) => {
                      setCredentialId(id)
                    }}
                    sections={groupedItems}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 0px',
            }}
          >
            <LoadingProgress />
          </Box>
        )}
        {credentialId !== '' && (
          <Overlay
            title={t('content.companyWallet.confirmOverlay.title')}
            description={t('content.companyWallet.confirmOverlay.description')}
            handleConfirmClick={handleRevocation}
            handleOverlayClose={() => {
              setCredentialId('')
            }}
            loading={loading}
            openDialog={credentialId !== ''}
          />
        )}
        {success && (
          <ServerResponseOverlay
            title={t('content.companyWallet.successOverlay.title')}
            intro={t('content.companyWallet.successOverlay.description')}
            dialogOpen={true}
            handleCallback={() => {
              // do nothing
            }}
          >
            <Typography variant="body2"></Typography>
          </ServerResponseOverlay>
        )}
        {error && (
          <ServerResponseOverlay
            title={t('content.companyWallet.errorOverlay.title')}
            intro={t('content.companyWallet.errorOverlay.description')}
            dialogOpen={true}
            iconComponent={
              <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
            }
            handleCallback={() => {
              // do nothing
            }}
          >
            <Typography variant="body2"></Typography>
          </ServerResponseOverlay>
        )}
      </div>
    </main>
  )
}
