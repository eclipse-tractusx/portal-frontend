import { Typography, CustomAccordion } from "cx-portal-shared-components";
import { ShellDescriptor, SubmodelDescriptors } from "state/features/digitalTwins/types";
import { TwinDetailGrid } from "./TwinDetailGrid";
import { Grid, Box, Divider, useTheme }  from '@mui/material';
import { useTranslation } from "react-i18next";

export const TwinDetails = ({ twin }: {twin: ShellDescriptor}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const getDesciption = (elem: ShellDescriptor | SubmodelDescriptors) => 
    <Typography sx={{mb: 3, typography: 'body3'}}>
      {elem.description[0] ? elem.description[0].text : t('content.digitaltwin.detail.no_description')}
    </Typography>

  const hasSubmodels = () => twin.submodelDescriptors.length > 0

  const primaryContent = 
    <>
      {getDesciption(twin)}
      {hasSubmodels() &&
        <>
          <Divider sx={{mb: 2, mr: -2, ml: -2}} />
          <Typography sx={{mb: 3, typography: 'label2'}}>
            {t('content.digitaltwin.detail.assetId')}
          </Typography>
          {twin.submodelDescriptors.length > 0 &&
            <TwinDetailGrid
              topic={t('content.digitaltwin.detail.submodel_endpoints')}
              content={twin.submodelDescriptors.length} 
            />
          }
          <Divider sx={{mb: 2, mr: -2, ml: -2}} />
          {twin.specificAssetIds.map((saId, index) =>
            <Box key={saId.key}>
              <TwinDetailGrid
                topic={t('content.digitaltwin.detail.key')}
                content={saId.key} 
              />
              <Divider sx={{mb: 2, mr: -2, ml: -2}} />
              <TwinDetailGrid
                topic={t('content.digitaltwin.detail.value')}
                content={saId.value} 
              />
              {saId.semanticId &&
                <>
                  <Divider sx={{mb: 2, mr: -2, ml: -2}} />
                  <TwinDetailGrid
                    topic={t('content.digitaltwin.detail.semanticid')}
                    content={saId.semanticId.value.join(', ')} 
                  />
                </>
              }
              {(index + 1) !== twin.specificAssetIds.length && 
                <Divider sx={{mb: 2, mr: -2, ml: -2}} />
              }
            </Box>
          )}
        </>
      }
    </>;

  const secondaryContent = (subModel: SubmodelDescriptors, semId: string, idKey: string) =>
    <>
      {getDesciption(subModel)}
      <Divider sx={{mb: 2, mr: -2, ml: -2}} />
      <TwinDetailGrid
        topic={t('content.digitaltwin.detail.semanticid')}
        link={{
          pathname: `/semantichub/${encodeURIComponent(semId)}`,
          state: semId
        }}
        content={semId}
      />
      <Divider sx={{mr: -2, ml: -2}} />
      <Grid container
        sx={{
          width: `calc(100% + ${theme.spacing(4)})`,
          m: `0 -${theme.spacing(2)}`,
          p: 2,
          typography: 'label3',
          bgcolor: 'background.background09'
        }}
      >
        <Grid item xs={12}>
          {t('content.digitaltwin.detail.endpoints')}
        </Grid>
      </Grid>
      {subModel.endpoints.map((endpoint, indexEndpoint) =>
        <Box key={`${idKey}_${endpoint.interface}_${indexEndpoint}`}>
          <Divider sx={{mb: 2, mr: -2, ml: -2}} />
          <TwinDetailGrid
            topic={t('content.digitaltwin.detail.interface')}
            content={endpoint.interface} 
          />
          <Divider sx={{mb: 2, mr: -2, ml: -2}} />
          <TwinDetailGrid
            topic={t('content.digitaltwin.detail.protocol')}
            content={endpoint.protocolInformation.endpointProtocol} 
          />
          <Divider sx={{mb: 2, mr: -2, ml: -2}} />
          <TwinDetailGrid
            topic={t('content.digitaltwin.detail.protocol_version')}
            content={endpoint.protocolInformation.endpointProtocolVersion} 
          />
        </Box>
      )}
    </>
  
  const accordionItems = () => {
    let items = [{
      title: twin.idShort,
      id: 'panel1',
      expanded: true,
      color: 'background.background09',
      children: primaryContent
    }];
    if(hasSubmodels()){
      twin.submodelDescriptors.forEach((subModel, indexSubmodel) => {
        const idKey = `${subModel.idShort}_${indexSubmodel}`;
        const item = {
          title: subModel.idShort,
          id: idKey,
          expanded: false,
          children: secondaryContent(subModel, subModel.semanticId.value[0], idKey),
          color: ''
        }
        items.push(item);
      }
    )}
    return items;
  }

  return(
    <CustomAccordion items={accordionItems()} />
  )
}