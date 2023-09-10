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
} from "../../actions";
import OpenFileCSV from "./OpenFileCSV";
import SaveFileCSV from "./SaveFileCSV";
import FormattingButton from "./components/FormattingButton";
import HistoryButton from "./HistoryButton";
import NumberFormattingSelect from "./NumberFormattingSelect";
import ColorPicker from "./components/ColorPicker";
import FontFamilySelect from "./FontFamilySelect";
import FontSizeSelect from "./FontSizeSelect";
import BorderStyleSelect from "./BorderStyleSelect";
import SaveFileJSON from "./SaveFileJSON";
import DecimalIcon from "./components/DecimalIcon";
import { clamp } from "lodash";
import CellFormatting from "../../models/CellFormatting";
import { FlexBox } from "src/components/shared/styles";
import { Border } from "./constants";

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

  const selectBorder = (borderEvent) => {
    if (borderEvent.target.value === Border.OUTSIDE_BORDERS) {
      dispatch(setCellOutsideBorderFormatting());
    } else setFormattingChange("borderId")(borderEvent);
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
            onChange={() => {}}
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
            state={selectedFormatting}
            onChange={() => {}}
          />
          <ColorPicker
            Icon={FormatColorText}
            state={selectedFormatting}
            onChange={() => {}}
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
        </FlexBox>
      </FlexForm>
    </div>
  );
};

export default Toolbar;
