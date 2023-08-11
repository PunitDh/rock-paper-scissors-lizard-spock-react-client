import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useToken } from "src/hooks";
import MoveRow from "./MoveRow";
import styled from "@emotion/styled";
import PlayerNameHeaderCell from "./PlayerNameHeaderCell";

const StyledTable = styled(Table)({
  whiteSpace: "nowrap",
  margin: "0rem 4rem 0rem 4rem",
  width: "80%",
  height: "60%",
});

const ResultTable = ({ rounds, maxRounds, players = [] }) => {
  const token = useToken();
  const firstPlayer = players.find((it) => it.id === token.decoded.id);
  const secondPlayer = players.find((it) => it.id !== token.decoded.id);

  return (
    players.length > 0 && (
      <StyledTable>
        <TableHead>
          <TableRow>
            <PlayerNameHeaderCell player={firstPlayer} />
            <PlayerNameHeaderCell player={secondPlayer} />
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                Winner
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                Reason
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {rounds.slice(rounds.length - maxRounds).map((round) => (
            <MoveRow
              key={round._id}
              firstPlayer={firstPlayer}
              secondPlayer={secondPlayer}
              moves={round.moves}
              winner={round.winner}
            />
          ))}
        </TableBody>
      </StyledTable>
    )
  );
};

export default ResultTable;
