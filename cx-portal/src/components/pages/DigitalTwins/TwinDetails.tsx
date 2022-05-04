import { CustomAccordion, Typography } from "cx-portal-shared-components";
import { useState } from "react";
import { ShellDescriptor } from "state/features/digitalTwins/types";
import { TwinDetailGrid } from "./TwinDetailGrid";
import { Grid }  from '@mui/material';

export const TwinDetails = ({ twin }: {twin: ShellDescriptor}) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
  };

  return(
    <>
      <CustomAccordion 
        expanded={expanded === 'panel1'}
        title={twin.idShort}
        id="panel1"
        onChange={handleChange('panel1')}>
        <>
          <Typography>{twin.description[0] ? twin.description[0].text : 'This asset has no description'}</Typography>
          {twin.specificAssetIds.length > 0 &&
            <>
              <Grid container>
                {twin.submodelDescriptors &&
                  <TwinDetailGrid
                    topic="Submodel Endpoints:"
                    content={twin.submodelDescriptors.length} 
                  />
                }
              </Grid>
              <Typography >Specific Asset IDs</Typography>
              {twin.specificAssetIds.map(saId =>
              <Grid container>
                <TwinDetailGrid
                  topic="Key:"
                  content={saId.key} 
                />
                <TwinDetailGrid
                  topic="Value:"
                  content={saId.value} 
                />
              </Grid>

              )}
            </>
          }
        </>
      </CustomAccordion>
      <CustomAccordion
        expanded={expanded === 'panel2'}
        title={twin.idShort}
        id="panel2"
        onChange={handleChange('panel2')}>
        <Typography>{twin.description[0] ? twin.description[0].text : 'This asset has no description'}</Typography>
      </CustomAccordion>
    </>
  )
}