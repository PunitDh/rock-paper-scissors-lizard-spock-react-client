import { TableCell, Typography } from "@mui/material";

type Props = {
  children: JSX.Element | string;
  props?: { [key: string]: any }[];
};

const StyledTableCell = ({ children, ...props }: Props) => (
  <TableCell {...props}>
    <Typography variant="subtitle2" fontWeight={600}>
      {children}
    </Typography>
  </TableCell>
);

export default StyledTableCell;
