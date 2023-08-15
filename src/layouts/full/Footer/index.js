import { Toolbar, styled, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ChatBar from "src/views/ChatBar";
import ChatBox from "src/views/ChatBox";

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Footer = () => {
  const { siteSettings } = useSelector((state) => state.site);
  return (
    <ToolbarStyled>
      <Stack spacing={1} direction="row" alignItems="center">
        Copyright 2023 - Punit Dharmadhikari
      </Stack>
      {siteSettings.conversations && <ChatBar />}
    </ToolbarStyled>
  );
};

export default Footer;
