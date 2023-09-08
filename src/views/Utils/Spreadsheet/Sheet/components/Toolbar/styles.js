export const formattingSelectStyle = (styles) => ({
  color: "black",
  backgroundColor: "#eee",
  height: "1.75rem",
  border: "1px solid rgba(0,0,0,0.3)",
  cursor: "pointer",
  ...styles,
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  ".MuiSvgIcon-root ": {
    fill: "black",
  },
});
