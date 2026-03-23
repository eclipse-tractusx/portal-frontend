/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import {
  Typography,
  PageHeader,
  Button,
  LoadingButton,
  TabPanel,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, Tab, Tabs } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { error, success } from 'services/NotifyService'
import ConnectorFormInputFieldShortAndLongDescription from 'components/shared/basic/ReleaseProcess/components/ConnectorFormInputFieldShortAndLongDescription'
import Patterns from 'types/Patterns'
import { useForm } from 'react-hook-form'
import {
  useFetchDescriptionQuery,
  useSaveDescriptionMutation,
} from 'features/appManagement/apiSlice'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { PAGES } from 'types/Constants'
import type { ItemType } from './AddRoles'

export default function ChangeDescription() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items = state
  const app = items?.filter((item: ItemType) => item.id === appId)
  const [activeTab, setActiveTab] = useState<number>(0)
  const longDescriptionMaxLength = 2000
  const { data: description, refetch } = useFetchDescriptionQuery(appId ?? '')
  const [saveDescription] = useSaveDescriptionMutation()

  const defaultValues = useMemo(() => {
    const defaultDescriptionEN = description?.find(
      (desc) => desc.languageCode === 'en'
    )
    const defaultDescriptionDE = description?.find(
      (desc) => desc.languageCode === 'de'
    )
    return {
      longDescriptionEN: defaultDescriptionEN?.longDescription ?? '',
      longDescriptionDE: defaultDescriptionDE?.longDescription ?? '',
      shortDescriptionEN: defaultDescriptionEN?.shortDescription ?? '',
      shortDescriptionDE: defaultDescriptionDE?.shortDescription ?? '',
    }
  }, [description])

  useEffect(() => {
    refetch()
    reset(defaultValues)
  }, [state, description])

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
    getValues,
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const handleSave = async () => {
    setIsLoading(true)

    if (appId) {
      const saveData = {
        appId,
        body: [
          {
            languageCode: 'de',
            longDescription: getValues().longDescriptionDE,
            shortDescription: getValues().shortDescriptionDE,
          },
          {
            languageCode: 'en',
            longDescription: getValues().longDescriptionEN,
            shortDescription: getValues().shortDescriptionEN,
          },
        ],
      }

      await saveDescription(saveData)
        .unwrap()
        .then(() => {
          navigate(`/${PAGES.APP_OVERVIEW}`, {
            state: 'change-description-success',
          })
          success(t('content.changeDescription.successMsg'))
        })
        .catch((err) => {
          setIsLoading(false)
          error(t('content.changeDescription.errorMsg'), '', err)
        })
    }
  }

  const patternValidation = (item: string) => {
    if (
      (item === 'longDescriptionEN' &&
        /[ @=<>*\-+#?%&_:;]/.test(getValues().longDescriptionEN?.charAt(0))) ||
      item === 'longDescriptionEN'
    ) {
      return `${t(
        'content.apprelease.appReleaseForm.validCharactersIncludes'
      )} a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:% ${t(
        'content.apprelease.appReleaseForm.shouldNotStartWith'
      )} @=<>*-+ #?%&_:;`
    } else {
      return `${t(
        'content.apprelease.appReleaseForm.validCharactersIncludes'
      )} a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:% ${t(
        'content.apprelease.appReleaseForm.shouldNotStartWith'
      )} @=<>*-+ #?%&_:;`
    }
  }

  return (
    <main className="change-image-main">
      <PageHeader title={app?.[0]?.title} headerHeight={200} topPage={true} />
      <section>
        <Typography variant="body2" align="center" mb={3}>
          {app?.[0]?.title}
        </Typography>
        <Typography variant="h2" align="center" mb={3}>
          {t('content.changeDescription.headerTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('content.changeDescription.description')}
        </Typography>
      </section>
      <div className="main-container">
        <div className="main-row">
          <Tabs
            value={activeTab}
            onChange={(_e, newValue: number) => {
              setActiveTab(newValue)
            }}
            centered
            sx={{
              '.MuiTab-root': {
                textTransform: 'none',
              },
            }}
          >
            <Tab
              sx={{
                fontSize: '16px',
                '&.Mui-selected': {
                  borderBottom: '3px solid #0f71cb',
                },
              }}
              label={t('content.changeDescription.longDescription')}
              icon={<TextSnippetOutlinedIcon />}
              id={`simple-tab-${activeTab}`}
              aria-controls={`simple-tabpanel-${activeTab}`}
              iconPosition="start"
            />
            <Tab
              sx={{
                fontSize: '16px',
                '&.Mui-selected': {
                  borderBottom: '3px solid #0f71cb',
                },
              }}
              label={t('content.changeDescription.shortDescription')}
              icon={<TextSnippetOutlinedIcon />}
              id={`simple-tab-${activeTab}`}
              aria-controls={`simple-tabpanel-${activeTab}`}
              iconPosition="start"
            />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <div className="form-field">
              {['longDescriptionEN', 'longDescriptionDE'].map(
                (item: string) => (
                  <div key={item}>
                    <ConnectorFormInputFieldShortAndLongDescription
                      {...{
                        control,
                        trigger,
                        errors,
                        item,
                      }}
                      label={
                        <>
                          {item === 'longDescriptionEN'
                            ? t('content.changeDescription.longDescriptionEN')
                            : t('content.changeDescription.longDescriptionDE')}
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (item === 'longDescriptionEN'
                          ? getValues().longDescriptionEN?.length
                          : getValues().longDescriptionDE?.length) +
                        `/${longDescriptionMaxLength}`
                      }
                      patternKey="longDescriptionEN"
                      patternEN={Patterns.appPage.longDescriptionEN}
                      patternDE={Patterns.appPage.longDescriptionDE}
                      rules={{
                        required:
                          t(`content.apprelease.appPage.${item}`) +
                          t('content.apprelease.appReleaseForm.isMandatory'),
                        minLength: `${t(
                          'content.apprelease.appReleaseForm.minimum'
                        )} 10 ${t(
                          'content.apprelease.appReleaseForm.charactersRequired'
                        )}`,
                        pattern: patternValidation(item),
                        maxLength: `${t(
                          'content.apprelease.appReleaseForm.maximum'
                        )} ${longDescriptionMaxLength} ${t(
                          'content.apprelease.appReleaseForm.charactersAllowed'
                        )}`,
                      }}
                      maxLength={longDescriptionMaxLength}
                    />
                  </div>
                )
              )}
            </div>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (item: string) => (
                  <div key={item}>
                    <ConnectorFormInputFieldShortAndLongDescription
                      {...{
                        control,
                        trigger,
                        errors,
                        item,
                      }}
                      label={
                        <>
                          {item === 'shortDescriptionEN'
                            ? t('content.changeDescription.shortDescriptionEN')
                            : t('content.changeDescription.shortDescriptionDE')}
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (item === 'shortDescriptionEN'
                          ? getValues().shortDescriptionEN?.length
                          : getValues().shortDescriptionDE?.length) + '/255'
                      }
                      patternDE={Patterns.appMarketCard.shortDescriptionDE}
                      patternEN={Patterns.appMarketCard.shortDescriptionEN}
                      patternKey="shortDescriptionEN"
                      rules={{
                        required: `${t(
                          `content.apprelease.appMarketCard.${item}`
                        )} ${t(
                          'content.apprelease.appReleaseForm.isMandatory'
                        )}`,
                        maxLength: `${t(
                          'content.apprelease.appReleaseForm.maximum'
                        )} 255 ${t(
                          'content.apprelease.appReleaseForm.charactersAllowed'
                        )}`,
                        minLength: `${t(
                          'content.apprelease.appReleaseForm.minimum'
                        )} 10 ${t(
                          'content.apprelease.appReleaseForm.charactersRequired'
                        )}`,
                        pattern: `${t(
                          'content.apprelease.appReleaseForm.validCharactersIncludes'
                        )} ${
                          item === 'shortDescriptionEN'
                            ? 'a-zA-Z0-9 !?@&#\'"()_-=/*.,;:'
                            : 'a-zA-ZÀ-ÿ0-9 !?@&#\'"()_-=/*.,;:'
                        }`,
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </TabPanel>
        </div>
      </div>
      <section>
        <hr style={{ border: 0, borderTop: '1px solid #DCDCDC' }} />
        <Box sx={{ position: 'relative', marginTop: '30px' }}>
          <Button
            color="secondary"
            onClick={() => {
              navigate(`/${PAGES.APP_OVERVIEW}`)
            }}
            size="small"
          >
            {t('global.actions.cancel')}
          </Button>

          <span style={{ position: 'absolute', right: '10px' }}>
            {isLoading ? (
              <LoadingButton
                size="small"
                variant="contained"
                onButtonClick={() => {
                  // do nothing
                }}
                loading={isLoading}
                label={`${t('global.actions.confirm')}`}
                loadIndicator="Loading..."
              />
            ) : (
              <Button
                disabled={!(isDirty && isValid)}
                size="small"
                variant="contained"
                onClick={handleSubmit(handleSave)}
              >
                {t('global.actions.save')}
              </Button>
            )}
          </span>
        </Box>
      </section>
    </main>
  )
}
