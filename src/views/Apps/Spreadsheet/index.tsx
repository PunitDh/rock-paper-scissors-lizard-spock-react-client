import PageContainer from "../../../components/container/PageContainer";
import Sheet from "./Sheet";
import { useQueryParam } from "../../../hooks";

export default function Spreadsheet() {
  const activeSheet = useQueryParam("activeSheet");
  console.log({ activeSheet });
  return (
    <PageContainer title="Spreadsheet" description="React-based spreadsheet">
      <Sheet
        maxColumns={12}
        maxRows={12}
        maxUndos={64}
        toolbar={true}
        formulaField={true}
        statusField={true}
        activeSheet={activeSheet}
        // maxDisplayColumns={12}
        // maxDisplayRows={12}
        initialData={
          {}
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
