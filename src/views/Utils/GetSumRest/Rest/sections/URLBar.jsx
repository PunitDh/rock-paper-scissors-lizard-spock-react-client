import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setMethod, setUrl } from "../actions";
import SendIcon from "../components/SendIcon";

const URLBar = ({ state, dispatch }) => {
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const handleSetUrl = (e) => dispatch(setUrl(e.target.value));
  const handleSetMethod = (e) => dispatch(setMethod(e.target.value));

  return (
    <FlexBox width="100%" gap="0.5rem" alignItems="stretch">
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
    </FlexBox>
  );
};

export default URLBar;
