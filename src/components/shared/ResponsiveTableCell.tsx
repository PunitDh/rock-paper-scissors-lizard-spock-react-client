import { TableCell } from "@mui/material";

type Props = {
  children: string | React.ReactNode;
  [x: string]: any;
};

const ResponsiveTableCell = ({ children, ...props }: Props) => (
  <TableCell {...props} sx={{ display: { xs: "none", sm: "table-cell" } }}>
    {children}
  </TableCell>
);

export default ResponsiveTableCell;
