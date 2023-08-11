import styled from "@emotion/styled";
import { Avatar, TableCell, TableRow } from "@mui/material";
import { entities } from "src/data";

const StyledAvatar = styled(Avatar)({
  borderRadius: 0,
  width: "25px",
  height: "25px",
});

const MoveRow = ({ firstPlayer, secondPlayer, moves, winner }) => {
  const firstPlayerMove = moves.find((move) => move.player === firstPlayer.id);
  const secondPlayerMove = moves.find(
    (move) => move.player === secondPlayer.id
  );

  const getImage = (move) =>
    move && (
      <StyledAvatar
        src={entities.find((entity) => entity.name === move).image}
      />
    );

  return (
    <TableRow>
      <TableCell>{getImage(firstPlayerMove?.move)}</TableCell>
      <TableCell>
        {moves.length === 1 && secondPlayerMove
          ? "<Move Played>"
          : getImage(secondPlayerMove?.move)}
      </TableCell>
      <TableCell align="right">{winner.firstName}</TableCell>
      <TableCell align="right">{winner.reason}</TableCell>
    </TableRow>
  );
};

export default MoveRow;
