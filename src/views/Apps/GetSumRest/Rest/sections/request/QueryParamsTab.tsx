import CustomTabPanel from "../../components/CustomTabPanel";
import KeyValueComponent from "../../components/KeyValueComponent";
import { deleteParams, setParams } from "../../actions";
import { Bold } from "../../../../../../components/shared/styles";
import { Dispatch } from "react";
import { Action, State } from "../../types";
import KeyValuePair from "../../models/KeyValuePair";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: number;
  tabId: string;
};

export default function QueryParamsTab({
  state,
  dispatch,
  value,
  tabId,
}: Props): JSX.Element {
  const handleChange = (keyValuePair: KeyValuePair) => {
    dispatch(setParams(keyValuePair));
  };
  const handleDelete = (keyValuePair: KeyValuePair) => {
    dispatch(deleteParams(keyValuePair));
  };

  return (
    <CustomTabPanel value={value} index={0} tabId={tabId}>
      <Bold>Query Params</Bold>
      <KeyValueComponent
        property={state.request.params}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </CustomTabPanel>
  );
}
