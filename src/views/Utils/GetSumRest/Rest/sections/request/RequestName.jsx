import { Tooltip } from "@mui/material";
import { setUrl } from "../../actions";
import { InvisibleTextField } from "src/components/shared/InvisibleTextField";

const RequestName = ({ state, dispatch }) => {
  const handleSetUrl = (e) => {
    e.preventDefault();
    dispatch(setUrl(e.target.value));
  };

  return (
    <Tooltip
      title="Click to change request name"
      enterDelay={1000}
      enterNextDelay={1000}
    >
      <InvisibleTextField
        value={"Request Name"}
        name="requestName"
        size="small"
        // onChange={handleChange}
        // onBlur={handleRename}
        autoComplete="off"
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
