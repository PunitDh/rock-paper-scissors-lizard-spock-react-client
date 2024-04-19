import styled from "@emotion/styled";
import { Avatar, TableCell, TableRow } from "@mui/material";
import { getEntity } from "../../../../../../assets";
import ResponsiveTableCell from "../../../../../../components/shared/ResponsiveTableCell";
import { GameMove, GameWinner, PlayerType } from "../../../../types";

type Props = {
  firstPlayer: PlayerType;
  secondPlayer: PlayerType;
  moves: GameMove[];
  winner: GameWinner;
};

const StyledAvatar = styled(Avatar)({
  borderRadius: 0,
  width: "25px",
  height: "25px",
  justifyContent: "center",
  alignItems: "center",
});

const MoveRow = ({ firstPlayer, secondPlayer, moves, winner }: Props): JSX.Element => {
  const firstPlayerMove = moves.find((move) => move.player === firstPlayer.id);
  const secondPlayerMove = moves.find(
    (move) => move.player === secondPlayer.id
  );
  const getImage = (move: string) =>
    move && <StyledAvatar src={getEntity(move)?.image} />;

  const otherPlayerPlayed = moves.length === 1 && secondPlayerMove;

  return (
    <TableRow>
      <TableCell>{getImage(firstPlayerMove?.move!)}</TableCell>
      <TableCell align="left">
        {otherPlayerPlayed ? "<Move Played>" : getImage(secondPlayerMove?.move!)}
      </TableCell>
      <TableCell align="right">{winner.firstName}</TableCell>
      <ResponsiveTableCell align="right">{winner.reason}</ResponsiveTableCell>
    </TableRow>
  );
};

export default MoveRow;
