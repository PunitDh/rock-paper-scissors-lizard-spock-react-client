import styled from "@emotion/styled";
import FlexBox from "../../../../../../../components/shared/FlexBox";

type BorderProps = {
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
};

const Table = styled.table(
  ({ borderTop, borderRight, borderBottom, borderLeft }: BorderProps) => ({
    width: "1rem",
    height: "1rem",
    border: "1px solid black",
    borderTop: borderTop || "1px dotted rgba(0,0,0,0.4)",
    borderRight: borderRight || "1px dotted rgba(0,0,0,0.4)",
    borderBottom: borderBottom || "1px dotted rgba(0,0,0,0.4)",
    borderLeft: borderLeft || "1px dotted rgba(0,0,0,0.4)",
    padding: 0,
    borderSpacing: 0,
  })
);

const Body = styled.tbody({
  padding: 0,
  margin: 0,
});

const Row = styled.tr({
  outline: 0,
});

const Cell = styled.td(
  ({ borderTop, borderRight, borderBottom, borderLeft }: BorderProps) => ({
    borderTop: borderTop || "1px dotted rgba(0,0,0,0.4)",
    borderRight: borderRight || "1px dotted rgba(0,0,0,0.4)",
    borderBottom: borderBottom || "1px dotted rgba(0,0,0,0.4)",
    borderLeft: borderLeft || "1px dotted rgba(0,0,0,0.4)",
    margin: 0,
  })
);

const BorderTypeMenuItem = (props: any) => (
  <FlexBox justifyContent="space-between" gap="1rem">
    <Table {...props}>
      <Body>
        <Row>
          <Cell {...props.cellBorders}></Cell>
          <Cell {...props.cellBorders}></Cell>
        </Row>
        <Row>
          <Cell {...props.cellBorders}></Cell>
          <Cell {...props.cellBorders}></Cell>
        </Row>
      </Body>
    </Table>
    {props.title}
  </FlexBox>
);

export default BorderTypeMenuItem;
