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

import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import {
  Button,
  CircleProgress,
  CustomAccordion,
  Input,
  StatusTag,
  Typography,
} from '@catena-x/portal-shared-components'
import {
  EndUrlMap,
  ProgressStatus,
  RetriggerableProcessSteps,
  StatusType,
  useApproveChecklistMutation,
  useDeclineChecklistMutation,
  useRetriggerProcessMutation,
  type ProgressButtonsType,
} from 'features/admin/applicationRequestApiSlice'
import './style.scss'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { refreshApplicationRequest } from 'features/admin/registration/actions'

enum ActionKind {
  SET_RETRIGGER_LOADING = 'SET_RETRIGGER_LOADING',
  SET_APPROVE_LOADING = 'SET_APPROVE_LOADING',
  SET_DECLINE_LOADING = 'SET_DECLINE_LOADING',
  SET_SELECTED_CHECKLISTBUTTON = 'SET_SELECTED_CHECKLISTBUTTON',
  SET_CHECKLIST_BUTTONS = 'SET_CHECKLIST_BUTTONS',
  SET_ERROR = 'SET_ERROR',
  SET_CHECKLISTBUTTONS_AND_SELECTEDBUTTON = 'SET_CHECKLISTBUTTONS_AND_SELECTEDBUTTON',
  SET_SHOW_INPUT = 'SET_SHOW_INPUT',
  STOP_DECLINE_LOADIN_SHOW_INPUT = 'STOP_DECLINE_LOADIN_SHOW_INPUT',
  SET_DECLINE_COMMENT = 'SET_DECLINE_COMMENT',
  SET_CHECKLIST_BUTTONS_AND_SHOWINPUT = 'SET_CHECKLIST_BUTTONS_AND_SHOWINPUT',
}

type State = {
  retriggerLoading: boolean
  approveLoading: boolean
  declineLoading: boolean
  selectedCheckListButton: ProgressButtonsType
  checkListButton: ProgressButtonsType[]
  error: string
  showInput: boolean
  declineComment: string
}

const initialState: State = {
  retriggerLoading: false,
  approveLoading: false,
  declineLoading: false,
  selectedCheckListButton: {
    statusId: ProgressStatus.DONE,
    typeId: StatusType.BUSINESS_PARTNER_NUMBER,
  },
  checkListButton: [],
  error: '',
  showInput: false,
  declineComment: '',
}

type Action = {
  type: string
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  payload: any
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case ActionKind.SET_RETRIGGER_LOADING:
      return { ...state, retriggerLoading: payload }
    case ActionKind.SET_APPROVE_LOADING:
      return { ...state, approveLoading: payload }
    case ActionKind.SET_DECLINE_LOADING:
      return { ...state, declineLoading: payload }
    case ActionKind.SET_SELECTED_CHECKLISTBUTTON:
      return { ...state, selectedCheckListButton: payload }
    case ActionKind.SET_CHECKLIST_BUTTONS:
      return { ...state, checkListButton: payload }
    case ActionKind.SET_ERROR:
      return { ...state, error: payload }
    case ActionKind.SET_SHOW_INPUT:
      return { ...state, showInput: payload }
    case ActionKind.SET_CHECKLISTBUTTONS_AND_SELECTEDBUTTON:
      return {
        ...state,
        selectedCheckListButton: payload.selected,
        checkListButton: payload.buttons,
      }
    case ActionKind.STOP_DECLINE_LOADIN_SHOW_INPUT:
      return {
        ...state,
        declineLoading: payload.declineLoading,
        showInput: payload.showInput,
      }
    case ActionKind.SET_DECLINE_COMMENT:
      return {
        ...state,
        declineComment: payload,
      }
    case ActionKind.SET_CHECKLIST_BUTTONS_AND_SHOWINPUT:
      return {
        ...state,
        checkListButton: payload.checkListButton,
        showInput: payload.showInput,
      }
    default:
      return state
  }
}

export const ProgressVerificationButton = ({
  selectedRequestId,
  ...props
}: ProgressButtonsType) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [approveChecklist] = useApproveChecklistMutation()
  const [declineChecklist] = useDeclineChecklistMutation()
  const [retriggerProcess] = useRetriggerProcessMutation()

  const [
    {
      retriggerLoading,
      approveLoading,
      declineLoading,
      error,
      showInput,
      declineComment,
    },
    setState,
  ] = useReducer(reducer, initialState)

  const onUpdateComment = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      type: ActionKind.SET_DECLINE_COMMENT,
      payload: e.target.value,
    })
  }

  const onApprove = async () => {
    if (!selectedRequestId) return
    setState({ type: ActionKind.SET_APPROVE_LOADING, payload: true })
    await approveChecklist(selectedRequestId)
      .unwrap()
      .then((payload) => {
        console.log('fulfilled', payload)
      })
      .catch((error) => {
        setState({ type: ActionKind.SET_ERROR, payload: error.data.title })
      })
    setState({ type: ActionKind.SET_APPROVE_LOADING, payload: false })
    dispatch(refreshApplicationRequest(Date.now()))
  }

  const onDecline = () => {
    setState({ type: ActionKind.SET_SHOW_INPUT, payload: true })
  }

  const onConfirmDecline = async () => {
    if (!selectedRequestId) return
    setState({ type: ActionKind.SET_DECLINE_LOADING, payload: true })
    await declineChecklist({
      applicationId: selectedRequestId,
      comment: declineComment,
    })
      .unwrap()
      .then((payload) => {
        console.log('fulfilled', payload)
      })
      .catch((error) => {
        setState({ type: ActionKind.SET_ERROR, payload: error.data.title })
      })
    setState({
      type: ActionKind.STOP_DECLINE_LOADIN_SHOW_INPUT,
      payload: { declineLoading: false, showInput: false },
    })
    dispatch(refreshApplicationRequest(Date.now()))
  }

  const onRetrigger = () => {
    if (!selectedRequestId) return
    console.log(
      'props.retriggerableProcessSteps',
      props.retriggerableProcessSteps
    )
    setState({ type: ActionKind.SET_RETRIGGER_LOADING, payload: true })
    props.retriggerableProcessSteps &&
      props.retriggerableProcessSteps.forEach(async (process: string) => {
        const args = {
          applicationId: selectedRequestId,
          endUrl: EndUrlMap[process],
        }
        await retriggerProcess(args)
          .unwrap()
          .then(() => {
            setState({ type: ActionKind.SET_RETRIGGER_LOADING, payload: false })
            dispatch(refreshApplicationRequest(Date.now()))
          })
          .catch((error) => {
            setState({
              type: ActionKind.SET_RETRIGGER_LOADING,
              payload: error.data.title,
            })
          })
      })
  }

  const getStepName = () =>
    t(`content.checklistOverlay.${props.typeId}.stepName`)

  const getAdditionalText = () =>
    t(`content.checklistOverlay.${props.typeId}.additionalText`)

  const getStpeDescription = () =>
    t(`content.checklistOverlay.${props.typeId}.stepDescription`)

  const getTitle = () =>
    t(`content.checklistOverlay.${props.typeId}.${props.statusId}.title`)

  const getDescription = () =>
    t(`content.checklistOverlay.${props.typeId}.${props.statusId}.description`)

  const getButtonTitle = () => {
    if (
      props.retriggerableProcessSteps &&
      props.retriggerableProcessSteps.indexOf(
        RetriggerableProcessSteps.MANUAL_TRIGGER_OVERRIDE_CLEARING_HOUSE
      ) > -1
    ) {
      return t('content.checklistOverlay.buttonOverwrite')
    }
    return t('content.checklistOverlay.buttonRetrigger')
  }

  const canShowApproveAndDecline = () =>
    props.typeId === StatusType.REGISTRATION_VERIFICATION &&
    props.statusId === ProgressStatus.TO_DO

  return (
    <div className="progress-verification">
      <CustomAccordion
        items={[
          {
            expanded: false,
            id: props.typeId,
            title: '',
            titleElement: (
              <Box
                sx={{
                  display: 'flex',
                  placeItems: 'center',
                  flexDirection: 'row',
                  margin: '0px 0px 20px 0px',
                  width: '100%',
                  height: '60px',
                  padding: '12px 8px',
                  borderRadius: '6px',
                  // backgroundColor: props?.backgroundColor ?? '#fff',
                  color: '#111',
                  fontSize: '14px',
                  outlined: 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: '5px',
                      display: 'flex',
                      placeItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    {props.icon}
                    <Typography
                      sx={{
                        paddingLeft: '15px',
                      }}
                      variant="label3"
                    >
                      {' '}
                      {props.label}
                    </Typography>
                  </Box>
                  <Box>
                    <StatusTag
                      color={props.statusTag}
                      label={props.statusLabel}
                    />
                  </Box>
                </Box>
              </Box>
            ),
            color: props?.backgroundColor ?? '#fff',
            children: (
              <>
                <div
                  style={{
                    textAlign: 'left',
                    padding: '0px 0 32px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      paddingBottom: '10px',
                      fontWeight: '600',
                    }}
                    variant="h5"
                  >
                    {getStepName()}
                  </Typography>
                  <Typography
                    sx={{
                      paddingBottom:
                        getAdditionalText() !== '' ? '30px' : '10px',
                    }}
                    variant="caption3"
                  >
                    {getStpeDescription()}
                  </Typography>
                  {getAdditionalText() !== '' && (
                    <Typography
                      sx={{
                        paddingBottom: '10px',
                      }}
                      variant="caption3"
                    >
                      {getAdditionalText()}
                    </Typography>
                  )}
                </div>
                <div
                  style={{
                    borderBottomWidth: '1px',
                    borderColor: '#e3e3e3',
                    borderBottomStyle: 'dashed',
                  }}
                />
                <div
                  style={{
                    textAlign: 'left',
                    padding: '32px 0 0 20px',
                  }}
                >
                  <Typography
                    sx={{
                      paddingBottom: '10px',
                      fontWeight: '600',
                    }}
                    variant="h5"
                  >
                    {t('content.checklistOverlay.comments')}
                  </Typography>
                  <Typography
                    sx={{
                      paddingBottom: '10px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      height: '70px',
                    }}
                    variant="caption3"
                  >
                    {props.details
                      ? props.details
                      : t('content.checklistOverlay.nocomments')}
                  </Typography>
                </div>
                <div
                  style={{
                    borderBottomWidth: '1px',
                    borderColor: '#e3e3e3',
                    borderBottomStyle: 'dashed',
                  }}
                />
                <div
                  style={{
                    textAlign: 'left',
                    padding: '32px 0 0 20px',
                  }}
                >
                  <Typography
                    sx={{
                      paddingBottom: '10px',
                      fontWeight: '600',
                    }}
                    variant="h5"
                  >
                    {getTitle()}
                  </Typography>
                  <Typography
                    sx={{
                      paddingBottom: '10px',
                    }}
                    variant="caption3"
                  >
                    {getDescription()}
                  </Typography>
                </div>
                {showInput && (
                  <div>
                    <Input
                      label={t(
                        'content.admin.registration-requests.confirmCancelModal.inputLabel'
                      )}
                      sx={{
                        paddingTop: '10px',
                      }}
                      multiline
                      rows={2}
                      maxRows={4}
                      placeholder={''}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) => {
                        onUpdateComment(e)
                      }}
                      value={declineComment}
                    />
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    padding: '32px 0 0 20px',
                  }}
                >
                  {props.retriggerableProcessSteps &&
                    props.retriggerableProcessSteps?.length > 0 &&
                    !showInput && (
                      <>
                        <div style={{ marginRight: '20px' }}>
                          {retriggerLoading && (
                            <span
                              style={{
                                marginRight: '75px',
                                marginLeft: '40px',
                                width: '116px',
                                textAlign: 'center',
                              }}
                            >
                              <CircleProgress
                                size={40}
                                step={1}
                                interval={0.1}
                                colorVariant={'primary'}
                                variant={'indeterminate'}
                                thickness={8}
                              />
                            </span>
                          )}
                          {!retriggerLoading && (
                            <Button
                              onClick={() => {
                                onRetrigger()
                              }}
                              size="small"
                              variant="contained"
                            >
                              {getButtonTitle()}
                            </Button>
                          )}
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              onDecline()
                            }}
                            size="small"
                            variant="outlined"
                            disabled={retriggerLoading}
                          >
                            {t('content.checklistOverlay.buttonCancel')}
                          </Button>
                        </div>
                      </>
                    )}
                  {canShowApproveAndDecline() && !showInput && (
                    <>
                      <div style={{ marginRight: '10px' }}>
                        {approveLoading && (
                          <span
                            style={{
                              marginRight: '50px',
                              width: '116px',
                              textAlign: 'center',
                            }}
                          >
                            <CircleProgress
                              size={40}
                              step={1}
                              interval={0.1}
                              colorVariant={'primary'}
                              variant={'indeterminate'}
                              thickness={8}
                            />
                          </span>
                        )}
                        {!approveLoading && (
                          <Button
                            onClick={() => onApprove()}
                            size="small"
                            variant="contained"
                          >
                            {t('content.checklistOverlay.buttonApprove')}
                          </Button>
                        )}
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            onDecline()
                          }}
                          size="small"
                          variant="outlined"
                          disabled={approveLoading}
                        >
                          {t('content.checklistOverlay.buttonDecline')}
                        </Button>
                      </div>
                    </>
                  )}
                  {showInput && (
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '30px',
                        marginBottom: '30px',
                      }}
                    >
                      <div style={{ marginRight: '20px' }}>
                        {declineLoading && (
                          <span
                            style={{
                              marginRight: '50px',
                              width: '116px',
                              textAlign: 'center',
                            }}
                          >
                            <CircleProgress
                              size={40}
                              step={1}
                              interval={0.1}
                              colorVariant={'primary'}
                              variant={'indeterminate'}
                              thickness={8}
                            />
                          </span>
                        )}
                        {!declineLoading && (
                          <>
                            <Button
                              onClick={() => onConfirmDecline()}
                              size="small"
                              variant="contained"
                            >
                              {t('content.checklistOverlay.buttonConfirm')}
                            </Button>
                            <Button
                              sx={{
                                marginLeft: '10px',
                              }}
                              onClick={() => {
                                setState({
                                  type: ActionKind.SET_SHOW_INPUT,
                                  payload: false,
                                })
                              }}
                              size="small"
                              variant="outlined"
                            >
                              {t('content.checklistOverlay.cancel')}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {error !== '' && (
                  <Typography
                    sx={{
                      textAlign: 'left',
                    }}
                    color="error"
                    variant="body2"
                  >
                    {error}
                  </Typography>
                )}
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
