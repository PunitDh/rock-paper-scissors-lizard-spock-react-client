import styled from "@emotion/styled";
import EntityButton from "./EntityButton";
import { Container } from "../styles";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { Bold } from "../../../../../../components/shared/styles";
import { entities } from "../../../../../../assets";
import { GameRound, PlayerType } from "../../../../types";

type Props = {
  id: string;
  playerId: string;
  lastRound: GameRound;
  opponent: PlayerType;
};

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const PlayButtons = ({ id, playerId, lastRound, opponent }: Props): JSX.Element =>
  lastRound.moves && (
    <ButtonContainer>
      {lastRound.moves.length === 1 &&
      lastRound.moves[0].player === playerId ? (
        `Waiting for ${opponent.firstName} to play`
      ) : (
        <FlexBox flexDirection="column" gap="0.5rem">
          <Bold>Your turn!</Bold>
          <FlexBox gap="0.5rem">
            {entities.map((entity) => (
              <EntityButton key={entity.name} gameId={id} entity={entity} />
            ))}
          </FlexBox>
        </FlexBox>
      )}
    </ButtonContainer>
  );

export default PlayButtons;
