import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useAPI, useNotification } from "src/hooks";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import LimitSelect from "src/components/shared/LimitSelect";

const LogTable = styled.div({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  height: "30rem",
  overflowY: "scroll",
});

const LogMessage = styled(Typography)(({ color }) => ({
  color,
  fontFamily: "monospace",
  maxWidth: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  marginTop: "0.5rem",
}));

const APILogs = () => {
  const [logs, setLogs] = useState([]);
  const notification = useNotification();
  const scrollRef = useRef();
  const api = useAPI();
  const [limit, setLimit] = useState(50);
  const limits = [50, 100, 200];

  useEffect(() => {
    api
      .getLogs(limit)
      .then((data) => setLogs(data.payload))
      .catch((data) => notification.error(data.payload));
  }, [limit]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [logs.length]);

  return (
    <DashboardCard
      title="API Logs"
      sx={{ backgroundColor: "#222", color: "white" }}
      action={
        <LimitSelect
          sx={{
            color: "white",
            backgroundColor: "#555",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            ".MuiSvgIcon-root ": {
              fill: "white",
            },
          }}
          onChange={setLimit}
          value={limit}
          limits={limits}
        />
      }
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
