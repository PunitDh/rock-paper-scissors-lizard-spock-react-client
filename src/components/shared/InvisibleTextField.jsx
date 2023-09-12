const { TextField } = require("@mui/material");
const { withStyles } = require("@mui/styles");

export const InvisibleTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(0, 0, 0, 0.23)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 0, 0, 0.58)",
      },
    },
  },
})(TextField);
