import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import {
  APIKeyAddTo,
  AuthorizationType,
  AuthorizationTypeItems,
  KeyValuePairType,
} from "../../../../constants";
import {
  deleteHeaders,
  deleteParams,
  setAuthorization,
  setHeaders,
  setParams,
} from "../../../../actions";
import KeyValuePair from "../../../../models/KeyValuePair";
import { FlexForm } from "src/views/Utils/Spreadsheet/Sheet/components/styles";
import { useCallback, useEffect, useRef, useState } from "react";

export default function APIKey({ state, dispatch }) {
  const formRef = useRef();
  const [key, value, addTo] = Object.keys(
    AuthorizationTypeItems.API_KEY.initialState
  );
  const credentials = state.request.authorization[AuthorizationType.API_KEY];
  const [currentAddTo, setCurrentAddTo] = useState(credentials.addTo);

  const updateHeadersOrParams = useCallback(
    (value) => {
      const keyValuePair = new KeyValuePair(
        credentials.key,
        credentials.value
      ).setId(KeyValuePairType.API_KEY);

      switch (value) {
        case APIKeyAddTo.HEADER:
          dispatch(setHeaders(keyValuePair));
          dispatch(deleteParams(keyValuePair));
          break;
        case APIKeyAddTo.QUERY_PARAMS:
          dispatch(setParams(keyValuePair));
          dispatch(deleteHeaders(keyValuePair));
          break;
        default:
          break;
      }
    },
    [credentials.key, credentials.value, dispatch]
  );

  const handleSubmit = (e) => e.preventDefault();

  const handleSelect = (e) => {
    setCurrentAddTo(e.target.value);
    handleChange(e);
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(
      setAuthorization(AuthorizationType.API_KEY, e.target.name, e.target.value)
    );
    updateHeadersOrParams(formRef.current.addTo.value);
  };

  useEffect(() => {
    updateHeadersOrParams(formRef.current.addTo.value);
  }, [currentAddTo, updateHeadersOrParams]);

  return (
    <FlexForm
      height="20rem"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      marginLeft="2rem"
      backgroundColor="white"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Bold>Key</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                name={key}
                value={credentials.key}
                sx={{ width: "80%" }}
                onChange={handleChange}
                autoComplete="off"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Value</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                name={value}
                value={credentials.value}
                sx={{ width: "80%" }}
                onChange={handleChange}
                autoComplete="off"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Add to</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <FlexBox textAlign="left" justifyContent="flex-end">
                <Select
                  size="small"
                  name={addTo}
                  sx={{ width: "80%" }}
                  value={credentials.addTo}
                  onChange={handleSelect}
                >
                  {Object.keys(APIKeyAddTo).map((key) => (
                    <MenuItem value={APIKeyAddTo[key]} key={key}>
                      {APIKeyAddTo[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FlexBox>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexForm>
  );
}
