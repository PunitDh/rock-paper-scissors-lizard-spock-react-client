import React, {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  Percent,
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
  autoCalculate,
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
import {
  AutoCalculate,
  BorderType,
  NumberFormat,
  FontSizes,
  OutsideBorders,
} from "./constants";
import OpenFileJSON from "./components/OpenFileJSON";
import ClearFormattingIcon from "./components/icons/ClearFormatting";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { SelectChangeEvent } from "@mui/material";
import {
  IconCurrencyDollar,
  IconMinus,
  IconPlus,
  IconSum,
} from "@tabler/icons-react";
import MenuButton from "./components/MenuButton";
import { Action, State } from "../../types";
import { TextAlign } from "../../../../../../components/shared/styles";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const Toolbar = ({ state, dispatch }: Props): React.ReactNode => {
  const canUndo =
    state.memento.length > 0 && state.currentMementoId !== state.memento[0].id;
  const canRedo =
    state.memento.length > 0 &&
    state.currentMementoId !== state.memento[state.memento.length - 1].id;
  const selectedCell = state.selectedCell.id;
  const selectedCellData =
    state.sheets[state.activeSheet].content.data[selectedCell];

  const currentCellFormatting = useMemo(() => {
    const element = document.getElementById(selectedCell);
    if (!element) return new CellFormatting();
    const styles = getComputedStyle(element);
    return {
      fontWeight: styles?.fontWeight,
      fontStyle: styles?.fontStyle,
      fontFamily: styles?.fontFamily,
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
  }, [selectedCell]);

  const stateCellFormatting = useMemo<CellFormatting>(() => {
    return selectedCellData?.formatting || currentCellFormatting;
  }, [currentCellFormatting, selectedCellData?.formatting]);

  const [selectedFormatting, setSelectedFormatting] =
    useState<CellFormatting>(stateCellFormatting);

  useEffect(() => {
    setSelectedFormatting(stateCellFormatting);
    console.log("setSelectedFormatting hook triggered for Toolbar");
  }, [stateCellFormatting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleUndo = () => {
    canUndo && dispatch(undoState());
    dispatch(recalculateFormulae());
  };

  const handleRedo = () => {
    canRedo && dispatch(redoState());
    dispatch(recalculateFormulae());
  };

  const toggleStyle: (...args: any[]) => any = useCallback(
    (styleKey: string | number, activeValue: string, inactiveValue: string) => {
      const currentValue = stateCellFormatting?.[styleKey];
      return currentValue === activeValue ? inactiveValue : activeValue;
    },
    [stateCellFormatting]
  );

  const setFormattingChange: (...args: any[]) => any = useCallback(
    (formattingKey: string) => (event: any) => {
      const value = ["string", "number"].includes(typeof event)
        ? event
        : (event.target as HTMLButtonElement)?.value;
      const formatting = { [formattingKey]: value };

      if (state.highlighted.hasLength)
        dispatch(setCellFormattingBulk(formatting));
      else dispatch(setSelectedCellFormatting(formatting));
      dispatch(addMemento());
    },
    [dispatch, state.highlighted.hasLength]
  );

  const setTextAlign = (textAlign: TextAlign) => (): void => {
    setFormattingChange("textAlign")(textAlign);
  };

  const setDecimals = (decimals: number) => () => {
    const currentDecimals = stateCellFormatting.decimals || 0;
    const newDecimals = clamp(currentDecimals + decimals, 0, 10);
    setFormattingChange("decimals")(newDecimals);
  };

  const clearFormatting = () => dispatch(clearCellFormatting());
  const handleAutoCalculate = (e: React.MouseEvent, type: AutoCalculate) =>
    dispatch(autoCalculate(type));

  const selectBorder = (borderEvent: SelectChangeEvent): void => {
    const { value } = borderEvent.target;
    if (OutsideBorders.includes(value as BorderType)) {
      dispatch(setCellOutsideBorderFormatting(value));
    } else {
      if (state.highlighted.hasLength)
        dispatch(setCellBorderFormattingBulk({ borderId: value }));
      else dispatch(setCellBorderFormatting({ borderId: value }));
    }
    dispatch(addMemento());
  };

  const createToggleHandler: (
    formattingKey: string,
    activeValue: string,
    inactiveValue: string
  ) => () => void = useCallback(
    (formattingKey: string, activeValue: string, inactiveValue: string) =>
      () => {
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
    <div tabIndex={1000}>
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
          <FormattingButton
            onClick={setFormattingChange("fontSize")}
            title="Decrease Font Size"
            isActive={false}
            Icon={IconMinus}
            value={FontSizes[0]}
          />
          <FontSizeSelect
            state={selectedFormatting}
            onChange={setFormattingChange("fontSize")}
          />
          <FormattingButton
            onClick={setFormattingChange("fontSize")}
            title="Increase Font Size"
            isActive={false}
            Icon={IconPlus}
            value={FontSizes[FontSizes.length - 1]}
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
            isActive={selectedFormatting.styles?.fontWeight === "bold"}
            onClick={toggleBold}
            Icon={FormatBold}
          />
          <FormattingButton
            title={"Italics"}
            isActive={selectedFormatting.styles?.fontStyle === "italic"}
            onClick={toggleItalic}
            Icon={FormatItalic}
          />
          <FormattingButton
            title={"Underline"}
            isActive={selectedFormatting.styles?.textDecoration === "underline"}
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
            isActive={selectedFormatting.styles?.textAlign === "left"}
            onClick={setTextAlign("left")}
            Icon={FormatAlignLeft}
          />
          <FormattingButton
            title={"Align center"}
            isActive={selectedFormatting.styles?.textAlign === "center"}
            onClick={setTextAlign("center")}
            Icon={FormatAlignCenter}
          />
          <FormattingButton
            title={"Align right"}
            isActive={selectedFormatting.styles?.textAlign === "right"}
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
          <MenuButton
            title={"Auto Sum"}
            isActive={false}
            Icon={IconSum}
            onClick={handleAutoCalculate}
          />
          <FormattingButton
            title={"Format as Currency"}
            isActive={false}
            Icon={IconCurrencyDollar}
            onClick={() =>
              setFormattingChange("numberFormat")(NumberFormat.CURRENCY)
            }
          />
          <FormattingButton
            title={"Format as Percentage"}
            isActive={false}
            Icon={Percent}
            onClick={() =>
              setFormattingChange("numberFormat")(NumberFormat.PERCENTAGE)
            }
          />
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
