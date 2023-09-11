import { setBodyContent } from "../../../../actions";
import KeyValueComponent from "../../../../components/KeyValueComponent";
import { ContentType } from "../constants";

export default function FormEncoded({ state, dispatch }) {
  const handleChange = (e) =>
    dispatch(setBodyContent(ContentType.FORM_ENCODED, e));
  return (
    <KeyValueComponent
      property={state.body.formEncoded}
      onChange={handleChange}
    />
  );
}
