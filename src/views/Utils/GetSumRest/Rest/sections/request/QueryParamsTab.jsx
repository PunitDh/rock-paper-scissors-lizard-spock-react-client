import CustomTabPanel from "../../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../../components/KeyValueComponent";
import { deleteParams, setParams } from "../../actions";

export default function QueryParamsTab({ state, dispatch, value }) {
  const handleChange = (e) => {
    dispatch(setParams(e));
  };
  const handleDelete = (e) => {
    dispatch(deleteParams(e));
  };

  return (
    <CustomTabPanel value={value} index={0}>
      <Bold>Query Params</Bold>
      <KeyValueComponent
        property={state.request.params}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </CustomTabPanel>
  );
}
