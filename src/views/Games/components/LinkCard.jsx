import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LogoImage } from "src/assets";
import { FlexBox } from "src/components/shared/styles";

const CardLink = styled(Link)(({ theme }) => ({
  display: "flex",
  transform: "scale(1.0)",
  transition: "transform 250ms ease-in",
  background:
    "radial-gradient(circle farthest-side at bottom center, #1b00ff22 0%, #00e9ff22 90%)",
  border: "1px solid rgba(0,0,0,0.1)",
  boxShadow: "10px 10px 10px -10px rgba(0,0,0,0.8)",
  borderRadius: "0.5rem",
  flexDirection: "column",
  flexGrow: 2,
  height: "15rem",
  maxWidth: "15rem",
  textDecoration: "none",
  color: theme.palette.primary.dark,
  padding: "0.75rem 0.75rem 0rem 0.75rem",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const Image = styled.img({
  width: "100%",
});

const ImageContainer = styled.div({
  maxHeight: "10rem",
  overflowY: "hidden",
});

const TextContainer = styled.div({
  height: "30%",
});

const ActionContainer = styled.div({
  alignSelf: "flex-end",
  justifySelf: "flex-end",
});

const LinkCard = ({ to, image, title, description }) => (
  <CardLink to={to}>
    <ImageContainer>
      <Image src={LogoImage} title={title} alt={title} />
    </ImageContainer>
    <TextContainer>
      <FlexBox alignItems="flex-start" textAlign="center">
        <Typography variant="h6">{title}</Typography>
      </FlexBox>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {description}
      </Typography>
    </TextContainer>
    <ActionContainer>
      <Button size="small">Play</Button>
      <Button size="small">Rules</Button>
    </ActionContainer>
  </CardLink>
);

export default LinkCard;
