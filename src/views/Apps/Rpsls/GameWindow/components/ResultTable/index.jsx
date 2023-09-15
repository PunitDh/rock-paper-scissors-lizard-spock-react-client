import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoveRow from "./MoveRow";
import styled from "@emotion/styled";
import PlayerNameHeaderCell from "./PlayerNameHeaderCell";
import { useToken } from "../../../../../../hooks";

const StyledTable = styled(Table)({
  whiteSpace: "nowrap",
  margin: "0rem 4rem 0rem 4rem",
  width: "80%",
  height: "60%",
});

const ResultTable = ({ rounds, maxRounds, players = [], score }) => {
  const token = useToken();
  const firstPlayer = players.find((it) => it.id === token.decoded.id);
  const secondPlayer = players.find((it) => it.id !== token.decoded.id);

  return (
    players.length > 0 && (
      <StyledTable>
        <TableHead>
          <TableRow>
            <PlayerNameHeaderCell
              player={firstPlayer}
              score={score[firstPlayer?.id]?.score}
            />
            <PlayerNameHeaderCell
              player={secondPlayer}
              score={score[secondPlayer?.id]?.score}
            />
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                Winner
              </Typography>
            </TableCell>
            <ResponsiveTableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                Reason
              </Typography>
            </ResponsiveTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {rounds.slice(-maxRounds).map((round) => (
            <MoveRow
              key={round.id}
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
