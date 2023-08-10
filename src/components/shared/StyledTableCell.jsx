import { TableCell, Typography } from "@mui/material";

const StyledTableCell = ({ children, ...props }) => (
  <TableCell {...props}>
    <Typography variant="subtitle2" fontWeight={600}>
      {children}
    </Typography>
  </TableCell>
);

export default StyledTableCell;
