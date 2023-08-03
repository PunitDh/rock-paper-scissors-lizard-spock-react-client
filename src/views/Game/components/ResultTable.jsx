import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ResultTable = ({ rounds, maxRounds, players = [] }) => {
  return (
    players.length > 0 && (
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: "2rem",
          ml: "4rem",
          mr: "4rem",
          width: "80%",
          height: "60%",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {players[0].firstName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {players[1].firstName}
              </Typography>
            </TableCell>
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
          {rounds
            .slice(rounds.length - maxRounds)
            .map((round, idx) => (
              <TableRow key={idx}>
                {round.moves.map((move, idx) => (
                  <TableCell key={idx}>{move.move}</TableCell>
                ))}
                <TableCell align="right">{round.winner.firstName}</TableCell>
                <TableCell align="right">{round.winner.reason}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  );
};

export default ResultTable;
