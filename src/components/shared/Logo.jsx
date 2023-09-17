import React from "react";
import { Link } from "react-router-dom";
import { Typography, styled } from "@mui/material";
import { useTheme } from "@emotion/react";
import { LogoImage } from "../../assets";

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
      title="One Site To Rule Them All"
      to="/"
    >
      <img src={LogoImage} alt="Logo" height={70} />
      <Typography variant="h6">One Site to Rule Them All</Typography>
    </LinkStyled>
  );
};

export default Logo;
