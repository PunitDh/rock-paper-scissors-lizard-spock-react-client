import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import EntityButton from "./EntityButton";
import styled from "@emotion/styled";
import GameCard from "src/components/shared/GameCard";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ButtonContainer = styled(Container)({
  height: "20%",
  gap: "0.5rem",
  width: "100%",
  flexWrap: "wrap",
});

const ResultContainer = styled(Container)({
  height: "70%",
  flexDirection: "column",
  overflow: "scroll",
});

const ScoreContainer = styled(Container)({
  height: "10%",
});

const GameCanvas = () => {
  // chart color
//   const theme = useTheme();
//   const primary = theme.palette.primary.main;
//   const secondary = theme.palette.secondary.main;

  const [moves, setMoves] = useState([]);

  const addMove = (move) => {
    setMoves((moves) => [...moves, move]);
  };

  return (
    <GameCard title={`Game with {name}`} elevation={9}>
      <ScoreContainer>Score</ScoreContainer>
      <ResultContainer>
        Game results
        {moves.map((move, idx) => (
          <div key={`${move}-${idx}`}>{move}</div>
        ))}
      </ResultContainer>
      <ButtonContainer>
        <EntityButton onMove={addMove} btncolor="brown">
          Rock
        </EntityButton>
        <EntityButton onMove={addMove} btncolor="gray">
          Paper
        </EntityButton>
        <EntityButton onMove={addMove} btncolor="silver">
          Scissors
        </EntityButton>
        <EntityButton onMove={addMove} btncolor="green">
          Lizard
        </EntityButton>
        <EntityButton onMove={addMove} btncolor="blue">
          Spock
        </EntityButton>
      </ButtonContainer>
    </GameCard>
  );
};

export default GameCanvas;
