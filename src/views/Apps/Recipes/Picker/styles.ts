import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Paper } from "@mui/material";
import { IconReload } from "@tabler/icons-react";

type SelectableOptionProps = {
  active: number;
};

export const SelectableOption = styled(Paper)(
  ({ active }: SelectableOptionProps) => ({
    padding: "0.25rem 1rem 0.25rem 1rem",
    width: "8rem",
    textAlign: "center",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background-color 500ms ease-in-out",
    // backgroundColor: "rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    "&:active": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  })
);

export const rotate = keyframes`
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
`;

type ReloadIconProps = {
  rotateicon: number;
  duration: number;
};

export const ReloadIcon = styled(IconReload)(
  ({ rotateicon, duration }: ReloadIconProps) => ({
    width: "2rem",
    height: "2rem",
    cursor: "pointer",
    animation: rotateicon > 0 ? `${rotate} ${duration}ms linear` : "none",
  })
);
