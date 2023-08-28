import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useAPI } from "src/hooks";
import { useEffect, useReducer, useRef } from "react";
import { Typography } from "@mui/material";
import LogActions from "./LogActions";
import { formatDate } from "src/utils";
import { reducer, initialState } from "./reducer";
import { setLogs } from "./actions";

const LogMessage = styled(Typography)(({ theme, type }) => ({
  color: theme.palette[type].main,
  fontFamily: "monospace",
  Width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  marginTop: "0.5rem",
  display: "block",
  overflowWrap: "anywhere",
}));

const APILogs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef = useRef();
  const api = useAPI();

  const handleClearLogs = () => {
    api.clearLogs().then((data) => dispatch(setLogs(data.payload)));
  };

  useEffect(() => {
    api.getLogs(state).then((data) => dispatch(setLogs(data.payload)));
  }, [state.type, state.time, state.limit]);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView();
  }, [state.logs.length]);

  return (
    <DashboardCard
      title="API Logs"
      sx={{
        backgroundColor: "#222",
        color: "white",
        maxHeight: "50rem",
        overflowY: "auto",
      }}
      action={
        <LogActions
          state={state}
          dispatch={dispatch}
          onClearLogs={handleClearLogs}
        />
      }
    >
      {state.logs.map((message) => (
        <LogMessage type={message.type} key={message.id}>
          [{message.type.toUpperCase()}] [{formatDate(message.time)}]{" "}
          {message.content}
        </LogMessage>
      ))}
      <div ref={scrollRef} />
    </DashboardCard>
  );
};

export default APILogs;
