import { Avatar } from "@mui/material";
import { MessageContent, TimeStamp } from "./styles";

import styled from "@emotion/styled";
import { DoneAll } from "@mui/icons-material";
import FlexBox from "../../../components/shared/FlexBox";

const MessageOrange = styled.div({
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  paddingBottom: "2px",
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

export const MessageRight = ({
  content,
  displayName,
  timestamp,
  photoURL,
  read,
}) => (
  <FlexBox alignItems="flex-start" justifyContent="flex-end" width="100%">
    <FlexBox alignItems="flex-end" flexDirection="column" width="100%">
      <DisplayName>{displayName}</DisplayName>
      <MessageOrange>
        <MessageContent>{content}</MessageContent>
        <TimeStamp>
          <span>{timestamp}</span>
          <span>
            {read ? (
              <DoneAll color="primary" fontSize="inherit" />
            ) : (
              <DoneAll color="inherit" fontSize="inherit" />
            )}
          </span>
        </TimeStamp>
      </MessageOrange>
    </FlexBox>
    <FlexBox justifyContent="flex-start" alignItems="flex-start">
      <MessageAvatar alt={displayName} src={photoURL}></MessageAvatar>
    </FlexBox>
  </FlexBox>
);
