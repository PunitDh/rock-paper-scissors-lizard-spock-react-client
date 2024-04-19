import CustomTabPanel from "../../components/CustomTabPanel";
import KeyValueComponent from "../../components/KeyValueComponent";
import { deleteHeaders, setHeaders } from "../../actions";
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

export default function HeadersTab({
  state,
  dispatch,
  value,
  tabId,
}: Props): React.ReactNode {
  const handleChange = (pair: KeyValuePair) => dispatch(setHeaders(pair));
  const handleDelete = (pair: KeyValuePair) => dispatch(deleteHeaders(pair));

  return (
    <CustomTabPanel value={value} index={2} tabId={tabId}>
      <Bold>Headers</Bold>
      <KeyValueComponent
        property={state.request.headers}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </CustomTabPanel>
  );
}
