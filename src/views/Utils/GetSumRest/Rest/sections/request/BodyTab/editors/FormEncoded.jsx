import { deleteBodyContent, setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../../../../constants";

export default function FormEncoded({ state, dispatch }) {
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
