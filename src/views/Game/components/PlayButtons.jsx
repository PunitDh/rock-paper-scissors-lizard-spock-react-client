import styled from "@emotion/styled";
import EntityButton from "./EntityButton";
import { Container } from "./styles";
import { entities } from "src/data";

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const PlayButtons = ({ id }) => {
  return (
    <ButtonContainer>
      {entities.map((entity) => (
        <EntityButton
          key={entity.name}
          gameId={id}
          btncolor={entity.color}
          entity={entity.name}
        />
      ))}
    </ButtonContainer>
  );
};

export default PlayButtons;
