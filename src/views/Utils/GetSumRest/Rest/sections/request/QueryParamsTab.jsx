import CustomTabPanel from "../../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../../components/KeyValueComponent";
import { deleteParams, setParams } from "../../actions";

export default function QueryParamsTab({ state, dispatch, value, tabId }) {
  const handleChange = (keyValuePair) => {
    dispatch(setParams(keyValuePair));
  };
  const handleDelete = (keyValuePair) => {
    dispatch(deleteParams(keyValuePair));
  };

  return (
    <CustomTabPanel value={value} index={0} id={tabId}>
      <Bold>Query Params</Bold>
      <KeyValueComponent
        property={state.request.params}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </CustomTabPanel>
  );
}
