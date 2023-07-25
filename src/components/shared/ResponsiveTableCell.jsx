import { TableCell } from "@mui/material";
import React from "react";

const ResponsiveTableCell = ({ children, ...props }) => {
  return (
    <TableCell {...props} sx={{ display: { xs: "none", sm: "table-cell" } }}>
      {children}
    </TableCell>
  );
};

export default ResponsiveTableCell;
