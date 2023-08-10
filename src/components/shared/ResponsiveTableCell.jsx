import { TableCell } from "@mui/material";

const ResponsiveTableCell = ({ children, ...props }) => (
  <TableCell {...props} sx={{ display: { xs: "none", sm: "table-cell" } }}>
    {children}
  </TableCell>
);

export default ResponsiveTableCell;
