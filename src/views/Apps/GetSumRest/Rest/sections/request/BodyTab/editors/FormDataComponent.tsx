import { deleteBodyContent, setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../../../../constants";
import KeyValuePair from "../../../../models/KeyValuePair";
import { Action, State } from "../../../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function FormDataComponent({ state, dispatch }: Props) {
  const handleChange = (pair: KeyValuePair) =>
    dispatch(setBodyContent(ContentType.FORM_DATA, pair));
  const handleDelete = (pair: KeyValuePair) =>
    dispatch(deleteBodyContent(ContentType.FORM_DATA, pair));

  return (
    <KeyValueComponent
      fileUpload={true}
      property={state.request.body.formData}
      onChange={handleChange}
      onDelete={handleDelete}
    />
  );
}
