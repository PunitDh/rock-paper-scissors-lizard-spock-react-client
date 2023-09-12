import { deleteBodyContent, setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../../../../constants";

export default function FormDataComponent({ state, dispatch }) {
  const handleChange = (e) =>
    dispatch(setBodyContent(ContentType.FORM_DATA, e));
  const handleDelete = (e) =>
    dispatch(deleteBodyContent(ContentType.FORM_DATA, e));

  return (
    <KeyValueComponent
      fileUpload={true}
      property={state.request.body.formData}
      onChange={handleChange}
      onDelete={handleDelete}
    />
  );
}
