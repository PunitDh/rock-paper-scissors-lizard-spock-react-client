import styled from "@emotion/styled";
import DelayedTooltip from "../DelayedTooltip";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useEventHandler from "../../hooks/useEventHandler";

type StatusBoxProps = {
  active: number;
};

const StatusBox = styled(Box)(({ active }: StatusBoxProps) => ({
  cursor: "pointer",
  padding: "0 0.5rem 0 0.5rem",
  borderRadius: "3px",
  "&:hover": {
    backgroundColor: active > 0 ? "#777" : "#aaa",
  },
}));

const HighlightedStats = ({ data, title }): React.ReactNode => {
  const [active, setActive] = useState<boolean>(false);
  const initialTooltip = `Copy '${data}'`;
  const [tooltip, setTooltip] = useState<string>(initialTooltip);
  const eventHandler = useEventHandler();

  const handleClick = (e: React.MouseEvent, data: string): void => {
    e.stopPropagation();
    eventHandler.clipboard.copy(data);
    setTooltip("Copied!");
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setActive(true);
  };
  const handleMouseUp = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setActive(false);
  };

  const handleMouseLeave = () => {
    setTooltip(initialTooltip);
  };

  return (
    <DelayedTooltip title={tooltip} delay={500}>
      <StatusBox
        onClick={(e) => handleClick(e, data)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        active={Number(active)}
      >
        <Typography sx={{ fontSize: "0.75rem" }} variant="subtitle1">
          {title}: {data}
        </Typography>
      </StatusBox>
    </DelayedTooltip>
  );
};

export default HighlightedStats;
