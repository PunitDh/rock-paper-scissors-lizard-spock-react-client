import { Toolbar, styled, Stack } from "@mui/material";

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Footer = () => (
  <ToolbarStyled>
    <Stack spacing={1} direction="row" alignItems="center">
      Copyright 2023 - Punit Dharmadhikari
    </Stack>
  </ToolbarStyled>
);

export default Footer;
