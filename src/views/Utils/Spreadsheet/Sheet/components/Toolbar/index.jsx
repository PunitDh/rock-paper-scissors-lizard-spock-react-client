import { useCallback, useEffect, useMemo, useState } from "react";
import { FlexForm } from "../styles";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatUnderlined,
  Redo,
  Undo,
} from "@mui/icons-material";
import {
  redoState,
  setSelectedCellFormatting,
  undoState,
  setCellFormattingBulk,
  recalculateFormulae,
  setCellOutsideBorderFormatting,
  setCellBorderFormattingBulk,
  setCellBorderFormatting,
  addMemento,
  clearCellFormatting,
} from "../../actions";
import OpenFileCSV from "./components/OpenFileCSV";
import SaveFileCSV from "./components/SaveFileCSV";
import FormattingButton from "./components/FormattingButton";
import HistoryButton from "./components/HistoryButton";
import NumberFormattingSelect from "./components/NumberFormattingSelect";
import ColorPicker from "./components/ColorPicker";
import FontFamilySelect from "./components/FontFamilySelect";
import FontSizeSelect from "./components/FontSizeSelect";
import BorderStyleSelect from "./BorderStyleSelect";
import SaveFileJSON from "./components/SaveFileJSON";
import DecimalIcon from "./components/icons/DecimalIcon";
import { clamp } from "lodash";
import CellFormatting from "../../models/CellFormatting";
import { outsideBorders } from "./constants";
import OpenFileJSON from "./components/OpenFileJSON";
import ClearFormattingIcon from "./components/icons/ClearFormatting";
import FlexBox from "../../../../../../components/shared/FlexBox";

const Toolbar = ({ state, dispatch }) => {
  const canUndo = state.currentMementoId !== state.memento[0]?.id;
  const canRedo =
    state.currentMementoId !== state.memento[state.memento.length - 1]?.id;

  const currentCellFormatting = useMemo(() => {
    const element = document.getElementById(state.selectedCell.id);
    if (!element) return new CellFormatting();
    const styles = getComputedStyle(element);
    return {
      fontWeight: styles?.fontWeight,
      fontStyle: styles?.fontStyle,
      // fontFamily: styles?.fontFamily,
      fontSize: styles?.fontSize,
      textAlign: styles?.textAlign,
      textDecoration: styles?.textDecoration,
      borderBottom: styles?.borderBottom,
      borderTop: styles?.borderTop,
      borderRight: styles?.borderRight,
      borderLeft: styles?.borderLeft,
      color: styles?.color,
      backgroundColor: styles?.backgroundColor,
    };
  }, [state.selectedCell.id]);

  const stateCellFormatting = useMemo(() => {
    return (
      state.content.data[state.selectedCell.id]?.formatting ||
      currentCellFormatting
    );
  }, [currentCellFormatting, state.content.data, state.selectedCell.id]);

  const [selectedFormatting, setSelectedFormatting] =
    useState(stateCellFormatting);

  useEffect(() => {
    setSelectedFormatting(stateCellFormatting);
  }, [stateCellFormatting]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUndo = (e) => {
    canUndo && dispatch(undoState());
    dispatch(recalculateFormulae());
  };

  const handleRedo = (e) => {
    canRedo && dispatch(redoState());
    dispatch(recalculateFormulae());
  };

  const toggleStyle = useCallback(
    (styleKey, activeValue, inactiveValue) => {
      const currentValue = stateCellFormatting?.[styleKey];
      return currentValue === activeValue ? inactiveValue : activeValue;
    },
    [stateCellFormatting]
  );

  const setFormattingChange = useCallback(
    (formattingKey) => (event) => {
      const value = event.target?.value || event;
      const formatting = { [formattingKey]: value };

      if (state.highlighted.cells.length > 1)
        dispatch(setCellFormattingBulk(formatting));
      else dispatch(setSelectedCellFormatting(formatting));
      dispatch(addMemento());
    },
    [dispatch, state.highlighted.cells.length]
  );

  const setTextAlign = (textAlign) => () => {
    setFormattingChange("textAlign")(textAlign);
  };

  const setDecimals = (decimals) => () => {
    const currentDecimals = stateCellFormatting.decimals || 0;
    const newDecimals = clamp(currentDecimals + decimals, 0, 10);
    setFormattingChange("decimals")(newDecimals);
  };

  const clearFormatting = () => {
    dispatch(clearCellFormatting());
  };

  const selectBorder = (borderEvent) => {
    const { value } = borderEvent.target;
    if (outsideBorders.includes(value)) {
      dispatch(setCellOutsideBorderFormatting(value));
    } else {
      if (state.highlighted.cells.length > 1)
        dispatch(setCellBorderFormattingBulk({ borderId: value }));
      else dispatch(setCellBorderFormatting({ borderId: value }));
    }
    dispatch(addMemento());
  };

  const createToggleHandler = useCallback(
    (formattingKey, activeValue, inactiveValue) => () => {
      const newValue = toggleStyle(formattingKey, activeValue, inactiveValue);
      setFormattingChange(formattingKey)(newValue);
    },
    [setFormattingChange, toggleStyle]
  );

  const toggleBold = createToggleHandler("fontWeight", "bold", "normal");
  const toggleItalic = createToggleHandler("fontStyle", "italic", "normal");
  const toggleUnderline = createToggleHandler(
    "textDecoration",
    "underline",
    "none"
  );

  return (
    <div tabIndex="1000">
      <FlexForm
        flexWrap="wrap"
        gap="0.5rem"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        <FlexBox gap="0.2rem" justifyContent="flex-start" alignItems="center">
          <OpenFileCSV dispatch={dispatch} />
          <OpenFileJSON dispatch={dispatch} />
          <SaveFileCSV state={state} />
          <SaveFileJSON state={state} />
          <HistoryButton
            title="Undo"
            Icon={Undo}
            onClick={handleUndo}
            disabled={!canUndo}
          />
          <HistoryButton
            title="Redo"
            Icon={Redo}
            onClick={handleRedo}
            disabled={!canRedo}
          />
          <FontFamilySelect
            state={selectedFormatting}
            onChange={setFormattingChange("fontFamily")}
          />
          <FontSizeSelect
            state={selectedFormatting}
            onChange={setFormattingChange("fontSize")}
          />
          <BorderStyleSelect
            state={selectedFormatting}
            onChange={selectBorder}
          />
          <NumberFormattingSelect
            state={selectedFormatting}
            onChange={setFormattingChange("numberFormat")}
          />
        </FlexBox>
        <FlexBox gap="0.2rem" justifyContent="flex-start" alignItems="center">
          <FormattingButton
            title={"Bold"}
            isActive={selectedFormatting.fontWeight === "bold"}
            onClick={toggleBold}
            Icon={FormatBold}
          />
          <FormattingButton
            title={"Italics"}
            isActive={selectedFormatting.fontStyle === "italic"}
            onClick={toggleItalic}
            Icon={FormatItalic}
          />
          <FormattingButton
            title={"Underline"}
            isActive={selectedFormatting.textDecoration === "underline"}
            onClick={toggleUnderline}
            Icon={FormatUnderlined}
          />
          <ColorPicker
            Icon={FormatColorFill}
            stateCellFormatting={selectedFormatting}
            property="backgroundColor"
            onChange={setFormattingChange}
            defaultValue="#FFFFFF"
          />
          <ColorPicker
            Icon={FormatColorText}
            stateCellFormatting={selectedFormatting}
            property="color"
            onChange={setFormattingChange}
            defaultValue="#000000"
          />
          <FormattingButton
            title={"Align left"}
            isActive={selectedFormatting.textAlign === "left"}
            onClick={setTextAlign("left")}
            Icon={FormatAlignLeft}
          />
          <FormattingButton
            title={"Align center"}
            isActive={selectedFormatting.textAlign === "center"}
            onClick={setTextAlign("center")}
            Icon={FormatAlignCenter}
          />
          <FormattingButton
            title={"Align right"}
            isActive={selectedFormatting.textAlign === "right"}
            onClick={setTextAlign("right")}
            Icon={FormatAlignRight}
          />
          <FormattingButton
            title={"Increase Decimal"}
            isActive={false}
            onClick={setDecimals(1)}
          >
            <DecimalIcon type="increase" />
          </FormattingButton>
          <FormattingButton
            title={"Decrease Decimal"}
            isActive={false}
            onClick={setDecimals(-1)}
          >
            <DecimalIcon type="decrease" />
          </FormattingButton>
          <FormattingButton
            title={"Clear Formatting"}
            isActive={false}
            Icon={ClearFormattingIcon}
            onClick={clearFormatting}
          />
        </FlexBox>
      </FlexForm>
    </div>
  );
};

export default Toolbar;
