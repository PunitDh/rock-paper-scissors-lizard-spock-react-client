import PageContainer from "../../../components/container/PageContainer";
import Sheet from "./Sheet";
import { useQueryParam } from "../../../hooks";

export default function Spreadsheet(): React.ReactNode {
  const activeSheet = useQueryParam("activeSheet");

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
        initialData={{}}
      />
    </PageContainer>
  );
}
