import styled from "@emotion/styled";
import DelayedTooltip from "../DelayedTooltip";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useEventHandler from "../../hooks/useEventHandler";

const StatusBox = styled(Box)(({ active }) => ({
  cursor: "pointer",
  padding: "0 0.5rem 0 0.5rem",
  borderRadius: "3px",
  "&:hover": {
    backgroundColor: active > 0 ? "#777" : "#aaa",
  },
}));

const HighlightedStats = ({ data, title }) => {
  const [active, setActive] = useState(false);
  const initialTooltip = `Copy '${data}'`;
  const [tooltip, setTooltip] = useState(initialTooltip);
  const eventHandler = useEventHandler();

  const handleClick = (e, data) => {
    e.stopPropagation();
    eventHandler.clipboard.copy(data);
    setTooltip("Copied!");
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setActive(true);
  };
  const handleMouseUp = (e) => {
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
        <Typography sx={{ fontSize: "0.75rem" }} variant="subtitle-1">
          {title}: {data}
        </Typography>
      </StatusBox>
    </DelayedTooltip>
  );
};

export default HighlightedStats;
