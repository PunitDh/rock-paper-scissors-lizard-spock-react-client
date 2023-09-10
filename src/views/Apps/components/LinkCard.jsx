import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FlexBox } from "src/components/shared/styles";

const CardLink = styled(Link)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  transform: "scale(1.0)",
  transition: "transform 250ms ease-in",
  border: "1px solid rgba(0,0,0,0.1)",
  boxShadow: "10px 10px 10px -10px rgba(0,0,0,0.8)",
  borderRadius: "0.5rem",
  flexDirection: "column",
  flexGrow: 1,
  height: "15rem",
  maxWidth: "15rem",
  width: "15rem",
  aspectRatio: "1/1",
  textDecoration: "none",
  color: theme.palette.primary.dark,
  padding: "0.75rem 0.75rem 0rem 0.75rem",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const ImageContainer = styled.div({
  display: "flex",
  width: "100%",
  height: "50%",
  justifyContent: "center",
});

const TextContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "30%",
  justifySelf: "flex-end",
  gap: "0.75rem"
});

const LinkCard = ({ to, Icon, title, description }) => (
  <CardLink to={to}>
    <ImageContainer>
      <Icon fill="white" width="50%" />
    </ImageContainer>
    <TextContainer>
      <FlexBox alignItems="flex-start" textAlign="center" height="3rem">
        <Typography variant="h6">{title}</Typography>
      </FlexBox>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {description}
      </Typography>
    </TextContainer>
  </CardLink>
);

export default LinkCard;
