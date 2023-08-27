import { useSelector } from "react-redux";
import { calculateScore } from "src/utils";

export default function useCurrentGame() {
  const { currentGame } = useSelector((state) => state.player);
  const score = calculateScore(currentGame);

  return { ...currentGame, score };
}
