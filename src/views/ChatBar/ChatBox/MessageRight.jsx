import { Avatar } from "@mui/material";
import { MessageContent, TimeStamp } from "./styles";
import { FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";

const MessageOrange = styled.div({
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#f8e896",
  width: "60%",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #dfd087",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #f8e896",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    right: "-15px",
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #dfd087",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    right: "-17px",
  },
});

const DisplayName = styled.div({
  fontSize: "0.85em",
  marginRight: "10px",
});

const MessageAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";

  return (
    <FlexBox alignItems="flex-start" justifyContent="flex-end" width="100%">
      <FlexBox alignItems="flex-end" flexDirection="column" width="100%">
        <DisplayName>{props.displayName}</DisplayName>
        <MessageOrange>
          <MessageContent>{message}</MessageContent>
          <TimeStamp>{timestamp}</TimeStamp>
        </MessageOrange>
      </FlexBox>
      <FlexBox justifyContent="flex-start" alignItems="flex-start">
        <MessageAvatar alt={message} src={photoURL}></MessageAvatar>
      </FlexBox>
    </FlexBox>
  );
};