import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import {
  setLoading,
  setMethod,
  setOutput,
  setResponseTime,
  setUrl,
} from "../../actions";
import SendIcon from "../../components/SendIcon";
import sendRequest, { send } from "../../api/rest";
import styled from "@emotion/styled";
import { useNotification } from "src/hooks";
import { AuthorizationType } from "./AuthorizationTab/constants";
import { Buffer } from "buffer";
import { useRef, useState } from "react";

const FlexForm = styled.form({
  display: "flex",
  width: "100%",
  gap: "0.5rem",
  alignItems: "stretch",
});

const URLBar = ({ state, dispatch }) => {
  const notification = useNotification();
  const startTime = useRef(0);
  const handleSubmit = (e) => {
    startTime.current = Date.now();
    e.preventDefault();

    const handleResponse = (response) => {
      dispatch(setOutput(response));
    };

    if (state.request.isValidUrl) {
      const createAuth = (authorization) => {
        switch (authorization.type) {
          case AuthorizationType.BASIC_AUTH: {
            const createBasicAuth = (data) => {
              const credentials = Buffer.from(
                `${data.username}:${data.password}`
              ).toString("base64");

              return `Basic ${credentials}`;
            };
            return createBasicAuth(authorization[AuthorizationType.BASIC_AUTH]);
          }
          case AuthorizationType.BEARER_TOKEN: {
            const createBearerToken = (authorization) => {
              return authorization.prefix.length
                ? `${authorization.prefix} ${authorization.token}`
                : authorization.token;
            };
            return createBearerToken(
              authorization[AuthorizationType.BEARER_TOKEN]
            );
          }
          default:
            break;
        }
      };

      const authorization = createAuth(state.request.authorization);
      send(state.request.url.href, state.request.method, {}, authorization)
        .then(handleResponse)
        .catch(handleResponse)
        .finally(() => {
          dispatch(setLoading(false));
          dispatch(setResponseTime(Date.now() - startTime.current));
          startTime.current = 0;
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
