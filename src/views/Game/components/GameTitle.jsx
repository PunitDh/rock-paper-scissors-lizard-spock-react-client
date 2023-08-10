import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
import IconSelectField from "src/components/shared/IconSelectField";
import { FlexBox } from "src/components/shared/styles";
import { icons } from "src/data";

const InvisibleTextField = styled(TextField)({
  border: "none",
  outline: "none",
});

const GameTitle = ({ currentGame }) => {
  const icon = icons.find((it) => it.id === currentGame.icon);
  return (
    <FlexBox gap="0.5rem" alignItems="stretch">
      <IconSelectField selected={icon.id} gameId={currentGame.id} />
      <InvisibleTextField value={currentGame.name} />
    </FlexBox>
  );
};

export default GameTitle;
