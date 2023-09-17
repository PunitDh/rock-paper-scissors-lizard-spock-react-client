import styled from '@emotion/styled'
import { Paper, Tooltip } from '@mui/material'
import React from 'react'

const Container = styled(Paper)({
  borderRadius: "50%",
  width: "3.5rem",
  height: "3.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

type Props = {
  Icon: any;
  color: string;
  title: string;
  onClick: () => void;
}

const ActionButton = ({ Icon, color, title, onClick }: Props) => {
  return (
    <Tooltip title={title}>
      <Container elevation={7} onClick={onClick}>{<Icon style={{ width: "2rem", height: "2rem", color }} />}</Container>
    </Tooltip>
  )
}

export default ActionButton