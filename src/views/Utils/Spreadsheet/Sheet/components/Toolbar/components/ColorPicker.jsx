import styled from "@emotion/styled";
import { FieldButton } from "../../styles";
import { useRef } from "react";
import { Box, rgbToHex } from "@mui/material";

const Input = styled.input({
  width: "1.25rem",
  height: "0.8rem",
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "absolute",
  top: 1,
  left: "-1.1rem",
});

const ColorPicker = ({
  Icon,
  stateCellFormatting,
  onChange,
  property,
  defaultValue,
}) => {
  const inputRef = useRef();
  const isRgb = /^rgb/g.test(stateCellFormatting[property]);
  const value = isRgb
    ? rgbToHex(stateCellFormatting[property])
    : stateCellFormatting[property];

  return (
    <FieldButton onClick={() => inputRef.current?.click()}>
      <Icon sx={{ width: "1rem" }} />
      <Box sx={{ position: "relative" }}>
        <Input
          ref={inputRef}
          type="color"
          id={`${property}-picker`}
          value={value || defaultValue}
          onChange={onChange(property)}
        />
      </Box>
    </FieldButton>
  );
};

export default ColorPicker;
