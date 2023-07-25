import { Link } from "react-router-dom";
import LogoImage from "src/assets/images/logos/logo.png";
import { Typography, styled } from "@mui/material";
import { useTheme } from "@emotion/react";

const LinkStyled = styled(Link)(({ color, hovercolor }) => ({
  height: "70px",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  textDecoration: "none",
  gap: "0.5rem",
  color,
  "&:hover": {
    color: hovercolor,
  },
}));

const Logo = () => {
  const theme = useTheme();
  return (
    <LinkStyled
      color="#5D87FF"
      hovercolor={theme.palette.text.secondary}
      title="Rock Paper Scissors Lizard Spock"
      to="/"
    >
      <img src={LogoImage} alt="Logo" height={70} />
      <Typography variant="h6">Rock Paper Scissors Lizard Spock</Typography>
    </LinkStyled>
  );
};

export default Logo;
