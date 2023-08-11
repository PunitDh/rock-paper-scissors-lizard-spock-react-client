import { useEffect, useState } from "react";
import { useGame, useToken } from "src/hooks";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import GameCard from "src/components/shared/GameCard";
import styled from "@emotion/styled";
import PlayButtons from "./components/PlayButtons";
import ResultTable from "./components/ResultTable";
import GameActions from "./components/GameActions";
import { FlexBox } from "src/components/shared/styles";
import GameTitle from "./components/GameTitle";
import { CircularProgress } from "@mui/material";
import { calculateScore } from "src/utils";

const ResultContainer = styled(FlexBox)({
  height: "60%",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginTop: "2rem",
});

const Game = () => {
  const { gameId } = useParams();
  const game = useGame();
  const [maxRounds, setMaxRounds] = useState(3);
  const token = useToken();

  useEffect(() => {
    game.getGame({ gameId });
  }, [gameId]);

  const lastRound =
    game.currentGame.rounds &&
    game.currentGame.rounds[game.currentGame.rounds.length - 1];

  const opponent = game.currentGame.players?.find(
    (player) => player.id !== token.decoded.id
  );

  const score = game.currentGame.id && calculateScore(game.currentGame);

  return game.currentGame.id ? (
    <PageContainer title={game.currentGame.name}>
      <GameCard
        title={<GameTitle currentGame={game.currentGame} />}
        action={
          <GameActions
            onMaxRoundsChange={setMaxRounds}
            maxRounds={maxRounds}
            gameId={gameId}
          />
        }
      >
        <ResultContainer>
          <ResultTable
            rounds={game.currentGame.rounds?.filter(
              (it) => it.moves.length > 0
            )}
            maxRounds={maxRounds}
            players={game.currentGame.players}
            score={score}
          />
        </ResultContainer>
        <PlayButtons
          id={gameId}
          playerId={token.decoded.id}
          lastRound={lastRound}
          opponent={opponent}
        />
      </GameCard>
    </PageContainer>
  ) : (
    <PageContainer title={"Loading..."} id="pagecontainer">
      <FlexBox height="100vh">
        <CircularProgress />
      </FlexBox>
    </PageContainer>
  );
};

export default Game;
