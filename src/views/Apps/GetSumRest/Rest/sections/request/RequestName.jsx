import { InputBase, Tooltip } from "@mui/material";
import { setRequestName } from "../../actions";
import styled from "@emotion/styled";

const RequestNameField = styled(InputBase)({
  padding: "0.5rem",
  fontWeight: "bold",
  borderRadius: "4px",
  "&:hover": {
    outline: "1px solid rgba(0,0,0,0.1)",
  },
  "&:focused": {
    outline: "1px solid rgba(0,0,0,0.1)",
  },
  "&:active": {
    outline: "1px solid rgba(0,0,0,0.1)",
  },
});

const RequestName = ({ state, dispatch }) => {
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setRequestName(e.target.value));
  };

  return (
    <Tooltip
      title="Click to change request name"
      enterDelay={1000}
      enterNextDelay={1000}
    >
      <RequestNameField
        value={state.request.name}
        name="requestName"
        size="small"
        onChange={handleChange}
        // onBlur={handleRename}
        autoComplete="off"
        variant="standard"
      />
    </Tooltip>
    // <TextField
    //   size="small"
    //   placeholder="https://www.example.com/"
    //   value={state.request.urlDisplay}
    //   onChange={handleSetUrl}
    //   // sx={{ width: "100%" }}
    //   autoComplete="off"
    // />
  );
};

export default RequestName;
