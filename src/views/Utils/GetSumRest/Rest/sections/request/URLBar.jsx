import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setLoading, setMethod, setUrl } from "../../actions";
import SendIcon from "../../components/SendIcon";
import sendRequest from "../../api/rest";
import styled from "@emotion/styled";
import { ContentTypeMenuItems } from "./BodyTab/constants";

const FlexForm = styled.form({
  display: "flex",
  width: "100%",
  gap: "0.5rem",
  alignItems: "stretch",
});

const URLBar = ({ state, dispatch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    state.params.forEach((param) => {
      params.set(param.key, param.value);
    });

    const config = sendRequest(
      state.url.value,
      params,
      state.method,
      state.headers,
      ContentTypeMenuItems[state.contentType].value,
      state.authorization,
      state.body
    );

    console.log(config);

    // sendRequest(
    //   state.url.value,
    //   params,
    //   state.method,
    //   state.headers,
    //   ContentType[state.contentType].value,
    //   state.authorization,
    //   state.body
    // )
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));

    dispatch(setLoading(true));
    setTimeout(() => dispatch(setLoading(false)), 4000);
  };

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const handleSetUrl = (e) => dispatch(setUrl(e.target.value));
  const handleSetMethod = (e) => dispatch(setMethod(e.target.value));

  return (
    <FlexForm
      width="100%"
      gap="0.5rem"
      alignItems="stretch"
      onSubmit={handleSubmit}
    >
      <Select
        labelId="method-select"
        id="method-select"
        value={state.method}
        onChange={handleSetMethod}
      >
        {methods.map((method) => (
          <MenuItem
            key={method}
            value={method}
            selected={state.method === method}
          >
            {method}
          </MenuItem>
        ))}
      </Select>

      <TextField
        type="url"
        placeholder="https://www.example.com/"
        value={state.url.display}
        onChange={handleSetUrl}
        sx={{ width: "100%" }}
        autoComplete="off"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ height: "3rem", width: "8rem" }}
      >
        {state.loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <FlexBox gap="0.5rem">
            Send
            <SendIcon fill="none" width="1.25rem" height="1.25rem" />
          </FlexBox>
        )}
      </Button>
    </FlexForm>
  );
};

export default URLBar;
