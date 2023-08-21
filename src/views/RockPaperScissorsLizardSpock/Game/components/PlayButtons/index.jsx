import styled from "@emotion/styled";
import EntityButton from "./EntityButton";
import { Container } from "../styles";
import { entities } from "src/assets";
import { Bold, FlexBox } from "src/components/shared/styles";

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const PlayButtons = ({ id, playerId, lastRound, opponent }) =>
  lastRound.moves && (
    <ButtonContainer>
      {lastRound.moves.length === 1 &&
      lastRound.moves[0].player === playerId ? (
        `Waiting for ${opponent.firstName} to play`
      ) : (
        <FlexBox flexDirection="column" gap="0.5rem">
          <Bold>Your turn!</Bold>
          <FlexBox>
            {entities.map((entity) => (
              <EntityButton key={entity.name} gameId={id} entity={entity} />
            ))}
          </FlexBox>
        </FlexBox>
      )}
    </ButtonContainer>
  );

export default PlayButtons;
