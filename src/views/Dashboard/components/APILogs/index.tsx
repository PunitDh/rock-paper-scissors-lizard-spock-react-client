import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useCallback, useEffect, useReducer } from "react";
import { Theme, Typography, useTheme } from "@mui/material";
import LogActions from "./LogActions";
import { reducer, initialState } from "./reducer";
import { setLogs } from "./actions";
import { useAPI } from "../../../../hooks";
import { formatDate } from "../../../../utils";
import { LogType } from "./constants";

type LogMessageType = {
  theme: Theme;
  type: LogType;
};

const LogMessage = styled(Typography)(({ theme, type }: LogMessageType) => ({
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
  const theme = useTheme();
  const api = useAPI();

  const handleClearLogs = () => {
    api.clearLogs().then((data) => dispatch(setLogs(data.payload)));
  };

  const scrollRef = useCallback(
    (scrollNode: HTMLDivElement) => {
      scrollNode?.scrollIntoView();
    },
    [state.logs.length]
  );

  useEffect(() => {
    api.getLogs(state).then((data) => dispatch(setLogs(data.payload)));
  }, [state]);

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
        <LogMessage theme={theme} type={message.type} key={message.id}>
          [{message.type.toUpperCase()}] [{formatDate(message.timeStamp)}]{" "}
          {message.content}
        </LogMessage>
      ))}
      <div ref={scrollRef} />
    </DashboardCard>
  );
};

export default APILogs;
