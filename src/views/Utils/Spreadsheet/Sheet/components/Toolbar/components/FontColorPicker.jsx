import styled from "@emotion/styled";
import { FieldButton } from "../../styles";
import { useRef } from "react";
import { FormatColorText } from "@mui/icons-material";
import { Box } from "@mui/material";

const Input = styled.input({
  opacity: "0",
  width: "5px",
  // display: "none",
  position: "absolute",
  top: 0,
  left: 0,
});

const FontColorPicker = () => {
  const inputRef = useRef();
  return (
    <FieldButton onClick={() => inputRef.current?.click()}>
      <FormatColorText sx={{ width: "1rem" }} />
      <Box sx={{ position: "relative" }}>
        <Input ref={inputRef} type="color" id="font-color-picker" />
      </Box>
    </FieldButton>
  );
};

export default FontColorPicker;
