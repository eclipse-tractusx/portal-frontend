import React from 'react'
import {
  styled,
  CfxCard,
  CfxCardMedia,
  CfxCardContent,
  CfxCardActionArea,
  CfxBox,
  CfxTypography,
} from '@cofinity-x/shared-components'

interface CardPreviewProps {
  appTitle: string
  description: string
  imageUrl: string
  imageAlt?: string
  positionValue?: React.CSSProperties['position']
}

const clippingStyles = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  marginTop: '15px',
}

const StyledCfxCard = styled(CfxCard)<{
  positionValue?: React.CSSProperties['position']
}>(({ positionValue }) => ({
  position: positionValue ?? 'revert',
  top: 100,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
}))

export const AppCardPreview: React.FC<CardPreviewProps> = ({
  appTitle,
  description,
  imageUrl,
  positionValue,
  imageAlt,
}: CardPreviewProps) => {
  return (
    <StyledCfxCard
      sx={{ minWidth: 310, width: 310, height: 154 }}
      data-testid="app-release-card-preview"
      positionValue={positionValue}
    >
      <CfxCardActionArea
        sx={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'start',
        }}
      >
        <CfxCardMedia
          image={imageUrl}
          title={imageAlt}
          sx={{ height: 130, minWidth: 130 }}
        />
        <CfxCardContent
          sx={{
            padding: '0px 0px 0px 17px',
            height: 130,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          data-testid="cfx-card-marketplace-content"
        >
          <CfxBox>
            <CfxBox
              sx={{
                height: '30px',
                minHeight: '30px',
                WebkitLineClamp: 2,
                ...clippingStyles,
              }}
            >
              <CfxTypography
                variant="caption"
                color="text.secondary"
                marginBottom={(theme) => theme.spacing(0.5)}
              >
                {appTitle}
              </CfxTypography>
            </CfxBox>
            <CfxBox
              sx={{
                height: '50px',
                minHeight: '20px',
                WebkitLineClamp: 3,
                ...clippingStyles,
              }}
            >
              <CfxTypography
                variant="h6"
                color="text.primary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  wordBreak: 'break-word',
                }}
              >
                {description}
              </CfxTypography>
            </CfxBox>
          </CfxBox>
        </CfxCardContent>
      </CfxCardActionArea>
    </StyledCfxCard>
  )
}

export default AppCardPreview
