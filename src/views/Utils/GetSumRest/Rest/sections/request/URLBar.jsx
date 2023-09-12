import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setMethod, setResponse, setResponseTime, setUrl } from "../../actions";
import SendIcon from "../../components/SendIcon";
import styled from "@emotion/styled";
import { useAPI, useLoading, useNotification } from "src/hooks";
import { useRef } from "react";
import { createAuthorization, createHeaders } from "../../utils";
import { ContentTypeMenuItems, HttpMethod } from "../../constants";

const FlexForm = styled.form({
  display: "flex",
  width: "100%",
  gap: "0.5rem",
  alignItems: "stretch",
});

const URLBar = ({ state, dispatch }) => {
  const api = useAPI();
  const [sendRequest, loading] = useLoading(api.sendRestRequest);
  const notification = useNotification();
  const startTime = useRef(0);
  const handleSubmit = (e) => {
    startTime.current = Date.now();
    e.preventDefault();

    const handleResponse = (response) => {
      dispatch(setResponse(response));
    };

    if (state.request.isValidUrl) {
      const headers = createHeaders(state.request.headers);
      const authorization = createAuthorization(state.request.authorization);

      sendRequest({
        url: state.request.url.href,
        method: state.request.method,
        withCredentials: false,
        headers: {
          ...headers,
          "Content-Type": ContentTypeMenuItems[state.request.contentType].value,
          Authorization: authorization,
        },
      })
        .then(handleResponse)
        .catch(handleResponse)
        .finally(() => {
          dispatch(setResponseTime(Date.now() - startTime.current));
          startTime.current = 0;
        });
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
        {Object.keys(HttpMethod).map((method) => (
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
        {loading ? (
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
