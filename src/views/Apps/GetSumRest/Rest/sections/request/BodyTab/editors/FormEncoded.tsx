import { deleteBodyContent, setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../../../../constants";
import { Action, State } from "../../../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function FormEncoded({ state, dispatch }: Props) {
  const handleChange = (e) =>
    dispatch(setBodyContent(ContentType.FORM_ENCODED, e));
  const handleDelete = (e) =>
    dispatch(deleteBodyContent(ContentType.FORM_DATA, e));

  return (
    <KeyValueComponent
      property={state.request.body.formEncoded}
      onChange={handleChange}
      onDelete={handleDelete}
    />
  );
}
