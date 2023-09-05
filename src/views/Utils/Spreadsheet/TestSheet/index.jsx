import { useEffect, useState } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { FlexBox } from "src/components/shared/styles";
import { useToken } from "src/hooks";

const TestSheet = () => {
  const token = useToken();
  const [value, setValue] = useState("");

  useEffect(() => {
    const l = document.addEventListener("keydown", (e) => {
      setValue(e.key);
    });

    return () => {
      document.removeEventListener("keydown", l);
    };
  }, []);

  return token.decoded.isAdmin ? (
    <DashboardCard sx={{ height: "100%" }} title="Test Sheet">
      <FlexBox width="100%" height="100%">
        <div
          style={{
            width: "6.5rem",
            height: "2.5rem",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "cell",
          }}
        >
          {value}
        </div>
      </FlexBox>
    </DashboardCard>
  ) : null;
};

export default TestSheet;
