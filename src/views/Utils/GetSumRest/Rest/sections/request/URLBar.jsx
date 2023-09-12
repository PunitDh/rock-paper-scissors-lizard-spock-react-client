import styled from "@emotion/styled";
import { useRef } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setMethod, setResponse, setResponseTime, setUrl } from "../../actions";
import SendIcon from "../../components/SendIcon";
import { useAPI, useLoading, useNotification } from "src/hooks";
import { createAuthorizationHeader, createHeaders } from "../../utils";
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
  const handleSubmit = async (e) => {
    startTime.current = Date.now();
    e.preventDefault();

    const handleResponse = (response) => {
      dispatch(setResponse(response));
    };

    if (state.request.isValidUrl) {
      const headers = createHeaders(state.request.headers);
      const authorization = createAuthorizationHeader(
        state.request.authorization
      );

      const requestConfig = {
        url: state.request.url.href,
        method: state.request.method,
        withCredentials: true,
        headers: {
          ...headers,
          "Content-Type": ContentTypeMenuItems[state.request.contentType].value,
          Authorization: authorization,
        },
      };

      sendRequest(requestConfig)
        .then(handleResponse)
        .catch(() =>
          api
            .sendProxyRestRequest(requestConfig)
            .then((response) => handleResponse(response))
            .catch(() =>
              notification.error(
                `Unable to get a response from '${requestConfig.url}'`
              )
            )
        )
        .finally(() => {
          dispatch(setResponseTime(Date.now() - startTime.current));
          startTime.current = 0;
        });
    } else {
      notification.error(`'${state.request.urlDisplay}' is not a valid URL`);
    }
  };

  const handleSetUrl = (e) => {
    e.preventDefault();
    dispatch(setUrl(e.target.value));
  };

  const handleSetMethod = (e, value) => dispatch(setMethod(value));

  return (
    <FlexForm
      width="100%"
      gap="0.5rem"
      alignItems="stretch"
      onSubmit={handleSubmit}
    >
      <div>
        <Autocomplete
          inputValue={state.request.method}
          onInputChange={handleSetMethod}
          id="method-select"
          options={Object.keys(HttpMethod)}
          sx={{ width: "8rem" }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
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
