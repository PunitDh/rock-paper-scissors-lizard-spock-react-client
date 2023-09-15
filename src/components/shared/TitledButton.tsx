import { Button, Tooltip } from '@mui/material';
import React from 'react'

type Props = {
  title: string;
  children: JSX.Element;
  other?: object
}

const TitledButton = ({ title, children, ...other }: Props) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export default TitledButton