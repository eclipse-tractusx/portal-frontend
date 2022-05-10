import { CustomAccordion, Typography } from "cx-portal-shared-components";
import { useState } from "react";
import { ShellDescriptor } from "state/features/digitalTwins/types";
import { TwinDetailGrid } from "./TwinDetailGrid";
import { Grid, Box, Divider, useTheme }  from '@mui/material';
import { useTranslation } from "react-i18next";

export const TwinDetails = ({ twin }: {twin: ShellDescriptor}) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
  };
  const getDesciption = (elem: ShellDescriptor | any) => 
    <Typography sx={{mb: 3, typography: 'body3'}}>
      {elem.description[0] ? elem.description[0].text : t('content.digitaltwin.detail.no_description')}
    </Typography>

  const hasSubmodels = () => twin.submodelDescriptors.length > 0

  return(
    <>
      <CustomAccordion 
        expanded={expanded === 'panel1'}
        title={twin.idShort}
        id="panel1"
        color="background.background09"
        onChange={handleChange('panel1')}>
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
        </>
      </CustomAccordion>
      {hasSubmodels() &&
        twin.submodelDescriptors.map((subModel, indexSubmodel) => {
          const idKey = `${subModel.idShort}_${indexSubmodel}`;
          const semId = subModel.semanticId.value[0];
          return <CustomAccordion
            key={idKey}
            expanded={expanded === idKey}
            title={subModel.idShort}
            id={idKey}
            onChange={handleChange(idKey)}>
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
          </CustomAccordion>
        }
        )
      }
    </>
  )
}