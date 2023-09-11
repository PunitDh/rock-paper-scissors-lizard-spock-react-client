import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setLoading, setMethod, setOutput, setUrl } from "../../actions";
import SendIcon from "../../components/SendIcon";
import sendRequest, { send } from "../../api/rest";
import styled from "@emotion/styled";
import { useNotification } from "src/hooks";

const FlexForm = styled.form({
  display: "flex",
  width: "100%",
  gap: "0.5rem",
  alignItems: "stretch",
});

const URLBar = ({ state, dispatch }) => {
  const notification = useNotification();
  const handleSubmit = (e) => {
    e.preventDefault();

    // const config = sendRequest(
    //   state.request.url.value,
    //   params,
    //   state.request.method,
    //   state.request.headers,
    //   ContentTypeMenuItems[state.request.contentType].value,
    //   state.request.authorization.headers,
    //   state.request.body
    // );

    // console.log(config);

    if (state.request.isValidUrl) {
      send(state.request.url.href, state.request.method)
        .then((response) => {
          dispatch(setLoading(false));
          console.log(response);
          return dispatch(setOutput(response));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          console.log(error);
          return dispatch(setOutput(error.response));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });

      dispatch(setLoading(true));
    } else {
      notification.error(`'${state.request.urlDisplay}' is not a valid URL`);
    }

    // sendRequest(
    //   state.request.url.value,
    //   params,
    //   state.request.method,
    //   state.request.headers,
    //   ContentType[state.request.contentType].value,
    //   state.request.authorization,
    //   state.request.body
    // )
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));
  };

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const handleSetUrl = (e) => {
    e.preventDefault();
    dispatch(setUrl(e.target.value));
  };
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
        value={state.request.method}
        onChange={handleSetMethod}
      >
        {methods.map((method) => (
          <MenuItem
            key={method}
            value={method}
            selected={state.request.method === method}
          >
            {method}
          </MenuItem>
        ))}
      </Select>

      <TextField
        type="url"
        placeholder="https://www.example.com/"
        value={state.request.urlDisplay}
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
