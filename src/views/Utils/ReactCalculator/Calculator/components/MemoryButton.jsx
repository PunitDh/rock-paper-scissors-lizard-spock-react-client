import { Menu, MenuItem, Typography } from "@mui/material";
import {
  addInput,
  addMemory,
  clearMemory,
  removeMemory,
  resetOutput,
  setOutput,
} from "../actions";
import { MemoryOperation } from "../constants";
import { CalculatorButton } from "../styles";
import { evaluateExpression } from "../utils";
import { useState } from "react";
import { FlexBox } from "src/components/shared/styles";

function MemoryButton({ value, state, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleMemory = (address) => () => {
    switch (value) {
      case MemoryOperation.ADD:
        if (state.evaled) {
          dispatch(addMemory({ address, value: state.output }));
        } else {
          const output = evaluateExpression(
            state.input.length === 0 ? { ...state, input: ["0"] } : state
          );
          dispatch(setOutput(output));
          dispatch(addMemory({ address, value: output.value }));
        }
        break;
      case MemoryOperation.REMOVE:
        dispatch(removeMemory(address));
        break;
      case MemoryOperation.RECALL:
        if (state.evaled) dispatch(resetOutput());
        dispatch(addInput(address));
        break;
      default:
        break;
    }
    closeMenu();
  };

  const handleClick = (event) => {
    switch (value) {
      case MemoryOperation.ADD:
      case MemoryOperation.REMOVE:
      case MemoryOperation.RECALL:
        openMenu(event);
        break;
      case MemoryOperation.CLEAR:
        dispatch(clearMemory());
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {Object.keys(state.memory).map((address) => (
          <MenuItem key={address} onClick={handleMemory(address)}>
            <FlexBox justifyContent="space-between" width="100%">
              <Typography display="inline">{address}</Typography>{" "}
              <Typography
                display="inline"
                width="100%"
                textAlign="right"
                variant="caption"
              >
                {state.memory[address].value}
              </Typography>
            </FlexBox>
          </MenuItem>
        ))}
      </Menu>
      <CalculatorButton onClick={handleClick}>{value}</CalculatorButton>
    </>
  );
}

export default MemoryButton;
