import { Table } from "cx-portal-shared-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { fetchDigitalTwins } from "state/features/digitalTwins/actions";
import { twinsSelector } from "state/features/digitalTwins/slice";
import { DigitalTwinsTableColumns } from "./DigitalTwinsTableColumns";

interface TwinTableProps {
  onTwinSelect: (id: string) => void
}
const TwinTable = ({ onTwinSelect }: TwinTableProps ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { twinList, loading, error } = useSelector(twinsSelector);
  const rowCount = 100;

  useEffect(() => {
    dispatch(fetchDigitalTwins({filter: { page: 1, pageSize: rowCount }}));
  }, [dispatch]);

  const onSearch = (value: string) => {
    console.log(value);
  }

  const columns = DigitalTwinsTableColumns(useTranslation, onTwinSelect);

  return(
    <section>
      <Table
        rowCount={rowCount}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loading}
        disableSelectionOnClick={true}
        title={t('content.digitaltwin.table.title')}
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={twinList.items}
        getRowId={(row) => row.identification}
      />
    </section>
  )
}

export default TwinTable