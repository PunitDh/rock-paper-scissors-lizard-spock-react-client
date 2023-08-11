import { TableCell, TableRow } from "@mui/material";

const MoveRow = ({ firstPlayer, secondPlayer, moves, winner }) => {
  const firstPlayerMove = moves.find((move) => move.player === firstPlayer.id);
  const secondPlayerMove = moves.find(
    (move) => move.player === secondPlayer.id
  );

  return (
    <TableRow>
      <TableCell>{firstPlayerMove?.move}</TableCell>
      <TableCell>
        {moves.length === 1 && secondPlayerMove
          ? "<Move Played>"
          : secondPlayerMove?.move}
      </TableCell>
      <TableCell align="right">{winner.firstName}</TableCell>
      <TableCell align="right">{winner.reason}</TableCell>
    </TableRow>
  );
};

export default MoveRow;
