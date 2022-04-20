import { IconButton, Table, Typography } from "cx-portal-shared-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { fetchDigitalTwins } from "state/features/digitalTwins/actions";
import { twinsSelector } from "state/features/digitalTwins/slice";
import { selectorUser } from "state/features/user/userSlice";
import { DigitalTwinsTableColumns } from "./digitalTwinTableColumns";

const TwinTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { token } = useSelector(selectorUser);
  const { twins } = useSelector(twinsSelector);

  useEffect(() => {
    if (token) {
      dispatch(fetchDigitalTwins({token}))
    }
  }, [token, dispatch]);

  const data = [{
    id: 'kdjhddl',
    name: 'Motor',
    type: "A34f",
    prov: "Bosch"
  }];
  const columns = DigitalTwinsTableColumns(useTranslation);

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
        rows={data}
        getRowId={(row: { [key: string]: string }) => row.id}
      />
    </div>
  )
}

export default TwinTable