import styled from "@emotion/styled";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useAPI, useToken } from "src/hooks";

const Entity = styled(Button)(({ btncolor }) => ({
  color: btncolor,
}));

const ButtonAvatar = styled(Avatar)({
  borderRadius: 0,
  width: "2rem",
  height: "2rem",
});

const EntityButton = ({ gameId, entity }) => {
  const token = useToken();
  const api = useAPI();

  const handleMove = () => {
    const payload = {
      playerId: token.decoded.id,
      move: entity.name,
      gameId,
    };

    api.playMove(payload);
  };

  return (
    <Tooltip title={`Play ${entity.name}`}>
      <Entity onClick={handleMove} variant="outlined" btncolor={entity.color}>
        <ButtonAvatar className="entity" src={entity.image} />
      </Entity>
    </Tooltip>
  );
};

export default EntityButton;
