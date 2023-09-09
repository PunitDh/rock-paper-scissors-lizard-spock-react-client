import { Item } from "../styles";

const Cell = ({
  id,
  value,
  width,
  formatting,
  textAlign,
  tabIndex,
  isSelected,
  isFormulaHighLighted,
  onMouseOver,
}) => (
  <Item
    colSpan={1}
    selected={isSelected}
    formulacell={Number(isFormulaHighLighted)}
    onMouseOver={onMouseOver}
    id={id}
    tabIndex={tabIndex}
    textalign={textAlign}
    width={width}
    formatting={formatting}
  >
    {value}
  </Item>
);

export default Cell;
