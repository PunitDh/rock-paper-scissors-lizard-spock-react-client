import styled from "@emotion/styled";
import { FieldButton } from "../../styles";
import { useRef } from "react";
import { Box, rgbToHex } from "@mui/material";
import CellFormatting from "../../../models/CellFormatting";

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

type Props = {
  Icon: any;
  stateCellFormatting: CellFormatting;
  onChange: (color: string) => any;
  property: string;
  defaultValue: string;
};

const ColorPicker = ({
  Icon,
  stateCellFormatting,
  onChange,
  property,
  defaultValue,
}: Props) => {
  const style =
    stateCellFormatting?.styles && stateCellFormatting?.styles[property];
  const inputRef = useRef<HTMLInputElement>(null);
  const isRgb = /^rgb/g.test(style);
  const value = isRgb ? rgbToHex(style) : style;

  const handleClick = () => inputRef.current?.click();

  return (
    <FieldButton onClick={handleClick}>
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
