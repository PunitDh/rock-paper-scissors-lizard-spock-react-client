import React from "react";
import PageContainer from "../../../components/container/PageContainer";
import Sheet from "./Sheet";

export default function Spreadsheet() {
  return (
    <PageContainer title="Spreadsheet" description="React-based spreadsheet">
      <Sheet
        maxColumns={12}
        maxRows={12}
        maxUndos={64}
        toolbar={true}
        formulaField={true}
        statusField={true}
        // maxDisplayColumns={12}
        // maxDisplayRows={12}
        initialData={{}
        //   {
        //   A1: 34,
        //   B1: 45,
        //   A2: "=A1+B1",
        //   c4: "Foobar",
        //   e1: "=B1*A1",
        //   f4: "=SUM(A1,B1,E1,A2)",
        // }
      }
      />
    </PageContainer>
  );
}
