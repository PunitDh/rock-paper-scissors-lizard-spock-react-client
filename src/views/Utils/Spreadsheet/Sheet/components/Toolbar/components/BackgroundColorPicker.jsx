import styled from "@emotion/styled";
import { FormatColorFill } from "@mui/icons-material";
import { FieldButton } from "../../styles";
import { useRef } from "react";
import { Box } from "@mui/material";

const Input = styled.input({
  opacity: "0",
  width: "1px",
  display: "none",
  position: "absolute",
  bottom: 0,
  left: 0,
});

const BackgroundColorPicker = () => {
  const inputRef = useRef();
  return (
    <FieldButton onClick={() => inputRef.current?.click()}>
      <FormatColorFill sx={{ width: "1rem" }} />
      <Box sx={{ position: "relative" }}>
        <Input ref={inputRef} type="color" id="bg-color-picker" />
      </Box>
    </FieldButton>
  );
};

export default BackgroundColorPicker;
