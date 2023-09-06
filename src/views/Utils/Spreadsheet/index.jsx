import PageContainer from "src/components/container/PageContainer";
import Sheet from "./Sheet";
import TestSheet from "./TestSheet";

export default function Spreadsheet() {
  return (
    <PageContainer title="Spreadsheet">
      <Sheet
        maxColumns={12}
        maxRows={12}
        formulaField={true}
        statusField={true}
      />
      <TestSheet />
    </PageContainer>
  );
}
