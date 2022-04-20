import { IconButton, Table, Typography } from "cx-portal-shared-components";
import { useTranslation } from "react-i18next"
import { DigitalTwinsTableColumns } from "./digitalTwinTableColumns";

const TwinTable = () => {
  const { t } = useTranslation();

  const twins = [{
    id: 'kdjhddl',
    name: 'Motor',
    type: "A34f",
    prov: "Bosch"
  }]
  const columns = DigitalTwinsTableColumns(useTranslation)

  const onSearch = (value: string) => {
    console.log(value)
  }

  return(
    <div>
      <Table
        title={t('content.digitaltwin.table.title')}
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={twins}
        getRowId={(row: { [key: string]: string }) => row.id}
      />
    </div>
  )
}

export default TwinTable