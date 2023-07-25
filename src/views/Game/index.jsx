import React from "react";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import GameCard from "src/components/shared/GameCard";
import styled from "@emotion/styled";
import { Container } from "./components/styles";
import PlayButtons from "./components/PlayButtons";

const ResultContainer = styled(Container)({
  height: "70%",
  flexDirection: "column",
  overflow: "scroll",
});

const ScoreContainer = styled(Container)({
  height: "10%",
});

const Game = () => {
  const { id } = useParams();
  return (
    <PageContainer title={`Game ${id}`}>
      <GameCard title={`Game with {name}`} elevation={9}>
        <ScoreContainer>Score</ScoreContainer>
        <ResultContainer>Game results</ResultContainer>
        <PlayButtons id={id} />
      </GameCard>
    </PageContainer>
  );
};

export default Game;
