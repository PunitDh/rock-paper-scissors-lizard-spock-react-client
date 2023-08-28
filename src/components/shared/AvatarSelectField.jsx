import styled from "@emotion/styled";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { FlexBox } from "src/components/shared/styles";
import { avatars } from "src/assets";

const SelectableAvatar = styled(Avatar)(({ selected }) => ({
  cursor: "pointer",
  width: 50,
  height: 50,
  opacity: selected ? "1" : "0.5",
  outline: selected ? "0.25rem solid #5D87FF" : "none",
  transform: selected ? "scale(1.1)" : "scale(1.0)",
  "&:hover": {
    outline: selected ? "0.25rem solid #5D87FF" : "0.25rem solid #5D87AA",
    opacity: "1",
    transform: "scale(1.1)",
    transition: "transform 50ms ease-in",
  },
}));

const Container = styled.div({
  marginTop: "1.25rem",
  marginBottom: "1.25rem",
});

const AvatarSelectField = ({ selected = 1 }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(selected);
  return (
    <Container>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        htmlFor="email"
        mb="5px"
        mt="25px"
      >
        Avatar
      </Typography>
      <FlexBox
        justifyContent="center"
        flexWrap="wrap"
        flexGrow={0}
        gap="0.5rem"
      >
        {avatars.map((avatar) => (
          <Tooltip key={avatar.id} title={avatar.name}>
            <SelectableAvatar
              onClick={() => setSelectedAvatar(avatar.id)}
              src={avatar.image}
              alt={String(avatar.id)}
              selected={selectedAvatar === avatar.id}
            />
          </Tooltip>
        ))}
        <input name="avatar" type="hidden" value={selectedAvatar} />
      </FlexBox>
    </Container>
  );
};

export default AvatarSelectField;
