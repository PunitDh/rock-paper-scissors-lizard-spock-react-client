import styled from "@emotion/styled";
import { Avatar, TableCell, TableRow } from "@mui/material";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import { entities } from "src/assets";

const StyledAvatar = styled(Avatar)({
  borderRadius: 0,
  width: "25px",
  height: "25px",
  justifyContent: "center",
  alignItems: "center",
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

  const otherPlayerPlayed = moves.length === 1 && secondPlayerMove;

  return (
    <TableRow>
      <TableCell>{getImage(firstPlayerMove?.move)}</TableCell>
      <TableCell align="left">
        {otherPlayerPlayed ? "<Move Played>" : getImage(secondPlayerMove?.move)}
      </TableCell>
      <TableCell align="right">{winner.firstName}</TableCell>
      <ResponsiveTableCell align="right">{winner.reason}</ResponsiveTableCell>
    </TableRow>
  );
};

export default MoveRow;
