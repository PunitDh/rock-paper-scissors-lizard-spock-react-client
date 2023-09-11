import { setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../constants";

export default function FormDataComponent({ state, dispatch }) {
  const handleChange = (e) => dispatch(setBodyContent(ContentType.FORM_DATA, e));
  return (
    <KeyValueComponent property={state.body.formData} onChange={handleChange} />
  );
}
