import React from "react";
import { useParams } from "react-router";
import GameCanvas from "./components/GameCanvas";
import PageContainer from "src/components/container/PageContainer";

const Game = () => {
  const { id } = useParams();
  console.log({ id });
  return <PageContainer title={`Game ${id}`}><GameCanvas /></PageContainer>;
};

export default Game;
