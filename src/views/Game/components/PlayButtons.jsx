import styled from "@emotion/styled";
import EntityButton from "./EntityButton";
import { Container } from "./styles";

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const PlayButtons = ({ id }) => {
  return (
    <ButtonContainer>
      <EntityButton gameId={id} btncolor="brown">
        Rock
      </EntityButton>
      <EntityButton gameId={id} btncolor="gray">
        Paper
      </EntityButton>
      <EntityButton gameId={id} btncolor="silver">
        Scissors
      </EntityButton>
      <EntityButton gameId={id} btncolor="green">
        Lizard
      </EntityButton>
      <EntityButton gameId={id} btncolor="blue">
        Spock
      </EntityButton>
    </ButtonContainer>
  );
};

export default PlayButtons;
