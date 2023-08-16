import styled from "@emotion/styled";
import EntityButton from "./EntityButton";
import { Container } from "../styles";
import { entities } from "src/assets";

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const PlayButtons = ({ id, playerId, lastRound, opponent }) =>
  lastRound.moves && (
    <ButtonContainer>
      {lastRound.moves.length === 1 && lastRound.moves[0].player === playerId
        ? `Waiting for ${opponent.firstName} to play`
        : entities.map((entity) => (
            <EntityButton key={entity.name} gameId={id} entity={entity} />
          ))}
    </ButtonContainer>
  );

export default PlayButtons;
