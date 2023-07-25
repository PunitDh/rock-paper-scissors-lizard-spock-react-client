import { TableCell, Typography } from "@mui/material";
import React from "react";

const StyledTableCell = ({ children, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography variant="subtitle2" fontWeight={600}>
        {children}
      </Typography>
    </TableCell>
  );
};

export default StyledTableCell;
