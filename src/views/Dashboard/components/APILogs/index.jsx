import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useAPI, useNotification } from "src/hooks";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

const LogTable = styled.div({
  height: "30rem",
  overflowY: "scroll",
});

const LogMessage = styled(Typography)(({ color }) => ({
  color,
  fontFamily: "monospace",
  display: "block",
}));

const APILogs = () => {
  const [logs, setLogs] = useState([]);
  const notification = useNotification();
  const scrollRef = useRef();
  const api = useAPI();

  useEffect(() => {
    api.getLogs().then(setLogs).catch(notification.error);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [logs.length]);

  return (
    <DashboardCard
      title="API Logs"
      sx={{ backgroundColor: "#222", color: "white" }}
    >
      <LogTable>
        {logs.map((message, idx) => (
          <LogMessage color={message.color} key={idx}>
            {message.content}
          </LogMessage>
        ))}
        <div ref={scrollRef} />
      </LogTable>
    </DashboardCard>
  );
};

export default APILogs;
