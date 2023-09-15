import React, { Dispatch } from "react";
import { isNumber } from "../../../../../utils";
import {
  addCellsToHighlight,
  addMemento,
  addNamedRange,
  deleteCellContent,
  highlightCells,
  highlightFormulaCellRange,
  highlightFormulaCells,
  openContextMenu,
  pasteCellContent,
  recalculateFormulae,
  redoState,
  removeCellsFromHighlight,
  resetHighlight,
  selectAll,
  selectCell,
  setCellContent,
  setDragging,
  setFillerMode,
  setFormulaFieldFocused,
  setFormulaFieldText,
  setFormulaMode,
  setHighlightCellAnchor,
  setHovered,
  setMouseDown,
  undoState,
  updateReferenceCells,
} from "../actions";
import { KeyEvent, MouseButton, SheetConfig } from "../constants";
import Cell from "../models/Cell";
import { Action, State } from "../types";
import { generateClipboardContent, isFormula } from "../utils/cellUtils";
import CellData from "../models/CellData";
import Highlight from "../models/Highlight";
import { Clipboard } from "../../../../../hooks/types";

export default class EventHandler {
  state: State;
  dispatch: Dispatch<Action>;
  clipboard: any;
  inputFocusRef: { current: boolean };
  inputRef: HTMLInputElement | null;
  formulaFieldRef: HTMLInputElement | null;
  fillerRef: HTMLDivElement | null;

  constructor(
    state: State,
    dispatch: Dispatch<Action>,
    clipboard: Clipboard,
    inputFocusRef: { current: boolean }
  ) {
    this.state = state;
    this.dispatch = dispatch;
    this.clipboard = clipboard;
    this.inputFocusRef = inputFocusRef;
    this.inputRef = null;
    this.formulaFieldRef = null;
    this.fillerRef = null;
  }

  isCtrlKeyPressed = (e) => {
    return /mac/i.test(navigator.platform) ? e.metaKey : e.ctrlKey;
  };

  setInputRef(ref: HTMLInputElement) {
    this.inputRef = ref;
  }

  setFormulaFieldRef(ref: HTMLInputElement) {
    this.formulaFieldRef = ref;
  }

  setFillerRef(ref: HTMLDivElement) {
    this.fillerRef = ref;
  }

  setFocusInput(value: boolean) {
    if (this.inputFocusRef) this.inputFocusRef.current = value;
  }

  handleInputBoxBlur(e: React.FocusEvent, cellId) {
    if (!this.state.formulaMode) {
      this.setFocusInput(false);
    }

    const triggerRecalculation =
      isFormula((e.target as HTMLInputElement).value) ||
      this.state.formulaTrackedCells.includes(cellId);

    if (triggerRecalculation) {
      this.dispatch(recalculateFormulae());
      this.dispatch(addMemento());
    }
  }

  handleCellInputKeyDown(e: React.KeyboardEvent, navigateRefCurrent: boolean) {
    const cell = this.state.selectedCell;
    const value = (e.target as HTMLInputElement).value;
    switch (e.key) {
      case KeyEvent.SHIFT:
        this.dispatch(setHighlightCellAnchor(cell.id));
        break;
      case KeyEvent.ESCAPE:
        this.dispatch(setFormulaMode(false));
        (e.target as HTMLInputElement).blur();
        break;
      case KeyEvent.BACKSPACE:
        break;
      case KeyEvent.ENTER:
        const triggerRecalculation =
          this.state.formulaTrackedCells.includes(cell.id) || isFormula(value);
        this.dispatch(setCellContent(cell.id, value));
        this.dispatch(setFormulaMode(false));
        triggerRecalculation && this.dispatch(recalculateFormulae());

        this.dispatch(addMemento());
        this.dispatch(highlightCells(cell.id));
        this.dispatch(
          selectCell(
            e.shiftKey
              ? cell.getPreviousRow()
              : cell.getNextRow(this.state.maxRows)
          )
        );
        break;
      case KeyEvent.LOWERCASE_A:
        if (this.isCtrlKeyPressed(e)) {
          e.stopPropagation();
        }
        break;
      case KeyEvent.TAB: {
        e.preventDefault();
        e.shiftKey
          ? this.dispatch(
              selectCell(cell.getPreviousColumn(this.state.maxColumns))
            )
          : this.dispatch(selectCell(cell.getNextColumn(this.state.maxRows)));
        break;
      }
      case KeyEvent.ARROW_LEFT: {
        if (this.inputRef?.value.length === 0 || navigateRefCurrent)
          this.dispatch(
            selectCell(cell.getPreviousColumn(this.state.maxColumns))
          );
        break;
      }
      case KeyEvent.ARROW_RIGHT: {
        if (this.inputRef?.value.length === 0 || navigateRefCurrent)
          this.dispatch(selectCell(cell.getNextColumn(this.state.maxRows)));
        break;
      }
      case KeyEvent.ARROW_UP: {
        this.dispatch(selectCell(cell.getPreviousRow()));
        break;
      }
      case KeyEvent.ARROW_DOWN: {
        this.dispatch(selectCell(cell.getNextRow(this.state.maxRows)));
        break;
      }
      default:
        break;
    }
  }

  /**
   *
   * @param {Event} e
   * @param {String} originalValue
   */
  handleFormulaFieldKeyDown(e: React.KeyboardEvent, originalValue) {
    switch (e.key) {
      case KeyEvent.ESCAPE:
        this.dispatch(setFormulaMode(false));
        // setOriginalValue(originalValue);
        this.dispatch(setFormulaFieldText(originalValue));

        (e.target as HTMLInputElement).blur();
        break;
      case KeyEvent.ENTER:
        e.stopPropagation();
        break;
      default:
        break;
    }
  }

  handleSelectCellSubmit(e) {
    e.preventDefault();
    const value = e.target.currentCell.value;
    if (Cell.isValidId(value)) {
      this.dispatch(selectCell(value));
    } else {
      e.stopPropagation();
      this.dispatch(addNamedRange(value));
    }
  }

  handleFormulaFieldSubmit(e) {
    const triggerRecalculation =
      isFormula(e.target.formulaFieldText.value) ||
      this.state.formulaTrackedCells.includes(this.state.selectedCell.id);
    e.preventDefault();
    this.dispatch(setFormulaFieldText(e.target.formulaFieldText.value));
    this.dispatch(setFormulaFieldFocused(false));
    this.dispatch(
      selectCell(this.state.selectedCell.getNextRow(this.state.maxRows))
    );
    this.dispatch(setFormulaMode(false));
    triggerRecalculation && this.dispatch(recalculateFormulae());
    this.dispatch(addMemento());
  }

  handleFormulaFieldBlur(e, originalValue) {
    const triggerRecalculation =
      isFormula(e.target.value) ||
      this.state.formulaTrackedCells.includes(this.state.selectedCell.id) ||
      originalValue !== e.target.value;
    if (!this.state.formulaMode) {
      triggerRecalculation && this.dispatch(recalculateFormulae());
    }
  }

  handleFunction = () => {
    this.dispatch(setFormulaFieldText("="));
    this.dispatch(setFormulaMode(true));
    this.formulaFieldRef?.focus({ preventScroll: true });
  };

  handleSelectCell = (value) => {
    if (Cell.isValidId(value.toUpperCase())) {
      this.dispatch(selectCell(value.toUpperCase()));
    } else {
      if (value in this.state.content.namedRanges) {
        this.dispatch(resetHighlight());
        this.dispatch(
          addCellsToHighlight(this.state.content.namedRanges[value])
        );
      }
    }
  };

  handleMouseMove(e: React.MouseEvent) {
    this.state.hovered !== ((e.target as HTMLDivElement).id as string) &&
      this.dispatch(setHovered((e.target as HTMLDivElement).id));

    if (this.state.mouseDown) {
      !this.state.dragging && this.dispatch(setDragging(true));
    }

    const { cellAnchor } = this.state.highlighted;

    if (this.state.formulaMode) {
      if (this.state.dragging && !this.isCtrlKeyPressed(e)) {
        if (cellAnchor)
          this.dispatch(
            highlightFormulaCellRange(cellAnchor, this.state.hovered)
          );
      }
    } else {
      if (this.state.dragging && !this.isCtrlKeyPressed(e)) {
        if (cellAnchor)
          this.dispatch(highlightCells(cellAnchor, this.state.hovered));
      }
    }

    if (this.state.fillerMode) {
      this.state.formulaMode && this.dispatch(setFormulaMode(false));
      const getBoundingRect = (id: string): DOMRect => {
        const element = document.getElementById(id);
        return (element as HTMLDivElement).getBoundingClientRect();
      };

      const shouldFill =
        cellAnchor &&
        Cell.isValidId(cellAnchor) &&
        Cell.isValidId(this.state.hovered);

      if (shouldFill) {
        const cellAnchorRect = getBoundingRect(cellAnchor);
        const hoveredRect = getBoundingRect(this.state.hovered);

        const euclideanDistance = {
          x: Math.abs(hoveredRect.right - cellAnchorRect.right),
          y: Math.abs(hoveredRect.bottom - cellAnchorRect.bottom),
        };

        const cellAnchorInstance = new Cell(cellAnchor);
        const hoveredInstance = new Cell(this.state.hovered);

        let rangeEnd =
          euclideanDistance.y > euclideanDistance.x
            ? `${cellAnchorInstance.column}${hoveredInstance.row}`
            : `${hoveredInstance.column}${cellAnchorInstance.row}`;

        this.dispatch(highlightCells(cellAnchor, rangeEnd));
        if (isFormula(this.state.content.data[cellAnchor]?.formula)) {
          this.#handleFillerModeFormulaFill();
        } else {
          this.#handleFillerModeValueFill();
        }
      }
    }
  }

  handleKeyUp(e: React.KeyboardEvent) {
    switch (e.key) {
      case KeyEvent.SHIFT:
        this.dispatch(setHighlightCellAnchor(null));
        break;
      default:
        break;
    }
  }

  handleKeyDown(e: React.KeyboardEvent): void {
    let nextCell: Cell;
    const { cellAnchor } = this.state.highlighted;

    this.inputRef?.focus();

    switch (e.key) {
      case KeyEvent.LOWERCASE_A:
        if (this.isCtrlKeyPressed(e)) {
          e.preventDefault();
          this.dispatch(selectAll());
        }
        break;
      case KeyEvent.LOWERCASE_Z:
        if (this.isCtrlKeyPressed(e)) {
          e.preventDefault();
          e.shiftKey ? this.dispatch(redoState()) : this.dispatch(undoState());
          this.dispatch(recalculateFormulae());
        }
        break;
      case KeyEvent.LOWERCASE_C:
        if (this.isCtrlKeyPressed(e)) {
          e.preventDefault();
          const content = generateClipboardContent(this.state);
        }
        break;
      case KeyEvent.LOWERCASE_X:
        if (this.isCtrlKeyPressed(e)) {
          e.preventDefault();
          const content = generateClipboardContent(this.state);

          this.dispatch(deleteCellContent());
        }
        break;
      case KeyEvent.SHIFT:
        this.dispatch(setHighlightCellAnchor(this.state.selectedCell.id));
        break;
      case KeyEvent.BACKSPACE:
        this.dispatch(deleteCellContent());
        this.dispatch(addMemento());
        break;
      case KeyEvent.ENTER:
        this.dispatch(setFormulaMode(false));
        if (
          this.state.content.data[this.state.selectedCell.id]?.isFormulaCell
        ) {
          this.dispatch(recalculateFormulae());
        }
      // eslint-disable-next-line no-fallthrough
      case KeyEvent.TAB:
      case KeyEvent.ARROW_DOWN:
      case KeyEvent.ARROW_RIGHT:
      case KeyEvent.ARROW_LEFT:
      case KeyEvent.ARROW_UP:
        e.preventDefault();
        e.shiftKey &&
          !cellAnchor &&
          this.dispatch(setHighlightCellAnchor(this.state.selectedCell.id));
        nextCell = this.#determineNextCell(e);
        this.dispatch(selectCell(nextCell));
        if (e.shiftKey) {
          cellAnchor &&
            nextCell &&
            this.dispatch(highlightCells(cellAnchor, nextCell.id));
        }
        break;
      default:
        console.log("Here");
        this.setFocusInput(true);
        // this.inputRef?.focus({ preventScroll: true });
        break;
    }
  }

  async handleCopyCapture(e) {
    e.preventDefault();
    const content = generateClipboardContent(this.state);
    await this.clipboard.copy(content);
  }

  handleCutCapture(e) {
    this.handleCopyCapture(e);
    this.dispatch(deleteCellContent());
    this.dispatch(addMemento());
  }

  async handlePasteCapture(e) {
    e.preventDefault();
    const data = await this.clipboard.get();
    this.dispatch(pasteCellContent(this.state.selectedCell.id, data));
  }

  handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    const element = document.getElementById(this.state.hovered);
    this.dispatch(openContextMenu(element));
  }

  handleDoubleClick() {
    this.setFocusInput(true);
  }

  handleMouseDown(e: React.MouseEvent) {
    if (e.button !== MouseButton.LEFT_CLICK) return;
    this.dispatch(setMouseDown(true));

    const {
      hovered: id,
      selectedCell,
      content: { data: contentData },
      formulaMode,
      highlighted,
      isFormulaFieldFocused,
    } = this.state;

    const isCtrlPressed = this.isCtrlKeyPressed(e);

    if (formulaMode) {
      this.#handleFormulaModeMouseDown(
        id,
        isFormulaFieldFocused,
        selectedCell.id,
        contentData[selectedCell.id],
        highlighted,
        isCtrlPressed,
        e.shiftKey
      );
    } else {
      this.#handleRegularModeMouseDown(
        id,
        highlighted,
        isCtrlPressed,
        e.shiftKey
      );
    }
  }

  handleMouseUp(e: React.MouseEvent<Element, MouseEvent>) {
    if (e.button !== MouseButton.LEFT_CLICK) return;
    this.dispatch(setMouseDown(false));
    this.state.fillerMode && this.dispatch(setFillerMode(false));

    const isSameCellHighlighted =
      this.state.highlighted.cellAnchor === this.state.hovered;
    const isCtrlKeyPressed = this.isCtrlKeyPressed(e);

    if (this.state.formulaMode) {
      this.#handleFormulaModeMouseUp(isSameCellHighlighted, isCtrlKeyPressed);
    } else if (this.state.fillerMode) {
      this.#handleFillerModeFormulaFill();
      this.dispatch(recalculateFormulae());
    } else {
      this.#handleRegularModeMouseUp(isCtrlKeyPressed, isCtrlKeyPressed);
    }

    this.state.dragging && this.dispatch(setDragging(false));
  }

  handleScroll(e) {
    // console.log(e.target.scrollTop);
    // const selectedRow = document.getElementById(`row-${state.selectedCell.row}`);
    // console.log(selectedRow);
    // selectedRow.scrollIntoView();
    if (this.inputRef) this.inputRef.style.top = e.target.scrollTop;
  }

  // Private fields
  #isLastValueRangeRegEx = /([a-z]+[0-9]+):([a-z]+[0-9]+)$/gi;
  #isLastValueCellRegEx = /([a-z]+[0-9]+)$/gi;

  // Private functions
  #determineNextCell(e: React.KeyboardEvent): Cell {
    const { selectedCell, maxRows, maxColumns, formulaMode } = this.state;
    const shouldResetHighlight =
      !e.shiftKey && !formulaMode && this.state.highlighted.hasLength;

    shouldResetHighlight && this.dispatch(resetHighlight()); // reset highlighting if conditions are met

    switch (e.key) {
      case KeyEvent.ENTER:
        return e.shiftKey
          ? selectedCell.getPreviousRow()
          : selectedCell.getNextRow(maxRows);
      case KeyEvent.TAB:
        return e.shiftKey
          ? selectedCell.getPreviousColumn(maxColumns)
          : selectedCell.getNextColumn(maxRows, maxColumns);
      case KeyEvent.ARROW_DOWN:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${maxRows}`)
          : selectedCell.getNextRow(maxRows);
      case KeyEvent.ARROW_RIGHT:
        return this.isCtrlKeyPressed(e)
          ? new Cell(
              `${SheetConfig.COLUMNS[this.state.maxColumns - 1]}${
                selectedCell.row
              }`
            )
          : selectedCell.getNextColumn(maxRows, maxColumns);
      case KeyEvent.ARROW_LEFT:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${SheetConfig.COLUMNS[0]}${selectedCell.row}`)
          : selectedCell.getPreviousColumn(maxColumns);
      case KeyEvent.ARROW_UP:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${1}`)
          : selectedCell.getPreviousRow();
      default:
        return selectedCell;
    }
  }

  #addCellsToFormula = (id: string, isCtrlPressed = false) => {
    const value = this.#addCellToFocusedBox(id, !isCtrlPressed);
    this.dispatch(setCellContent(this.state.selectedCell.id, value));
    this.dispatch(
      updateReferenceCells(this.state.selectedCell.id, [id], !isCtrlPressed)
    );
  };

  #handleRegularModeMouseDown = (
    id: string,
    highlighted: Highlight,
    isCtrlPressed: boolean,
    isShiftPressed: boolean
  ) => {
    if (isCtrlPressed) {
      if (highlighted.cells.includes(id)) {
        this.dispatch(removeCellsFromHighlight([id]));
      } else {
        this.dispatch(addCellsToHighlight([id]));
      }
    } else if (isShiftPressed) {
      highlighted.cellAnchor &&
        this.dispatch(highlightCells(highlighted.cellAnchor, id));
    } else {
      !this.state.dragging &&
        this.state.highlighted.hasLength &&
        this.dispatch(resetHighlight());

      const selectedCellData = this.getSelectedCellData();
      const shouldRecalculate =
        this.isFormulaTrackedCell(this.state.selectedCell.id) &&
        selectedCellData?.hasChanged;

      if (shouldRecalculate) {
        this.dispatch(recalculateFormulae());
      }
      this.dispatch(selectCell(id));
      this.dispatch(setHighlightCellAnchor(id));
    }
  };

  private getSelectedCellData(): CellData | undefined {
    return this.state.content.data[this.state.selectedCell.id];
  }

  private isFormulaTrackedCell(cellId: string): Boolean {
    return this.state.formulaTrackedCells.includes(cellId);
  }

  private getData(cellId: string): CellData {
    return this.state.content.data[cellId];
  }

  #handleFillerModeFormulaFill() {
    const {
      cellAnchor,
      cells: highlightedCells,
      length: highlightedLength,
      hasLength,
      last,
    } = this.state.highlighted;

    if (!hasLength || !cellAnchor || !last) return;

    const anchorCell = this.state.content.data[cellAnchor];
    const anchorFormula = anchorCell?.formula;

    if (isFormula(anchorFormula)) {
      const firstCell = new Cell(cellAnchor);
      const lastCell = new Cell(last);
      if (!firstCell?.columnCharCode || !lastCell?.columnCharCode) return;
      const columnFill = lastCell.columnCharCode > firstCell.columnCharCode;
      const rowFill = lastCell.row > firstCell.row;
      const { referenceCells, formula } = this.state.content.data[firstCell.id];

      let increment = 0;
      Array(highlightedLength - 1)
        .fill(0)
        .forEach((_, i) => {
          if (columnFill) {
            increment++;

            const newFormula = referenceCells.reduce(
              (acc: string, cur: string) => {
                const { columnCharCode, row, id } = new Cell(cur);
                if (!columnCharCode) return acc;
                return acc.replace(
                  id,
                  `${String.fromCharCode(+columnCharCode + increment)}${row}`
                );
              },
              formula
            );

            this.dispatch(
              setCellContent(highlightedCells[i + 1], String(newFormula))
            );
          } else if (rowFill) {
            increment++;

            const newFormula = referenceCells.reduce(
              (acc: string, cur: string) => {
                const { columnCharCode, row, id } = new Cell(cur);
                if (!columnCharCode) return acc;
                return acc.replace(
                  id,
                  `${String.fromCharCode(columnCharCode)}${row + increment}`
                );
              },
              formula
            );

            this.dispatch(
              setCellContent(highlightedCells[i + 1], String(newFormula))
            );
            this.state.formulaMode && this.dispatch(setFormulaMode(false));
            this.dispatch(recalculateFormulae());
          }
        });
    }
  }

  #handleFillerModeValueFill() {
    const {
      cells: highlightedCells,
      hasLength,
      length: highlightedLength,
    } = this.state.highlighted;
    if (!hasLength) return;
    const { cellAnchor } = this.state.highlighted;

    if (!cellAnchor) return;
    const anchorCell = this.state.content.data[cellAnchor];
    const anchorValue = anchorCell?.value;

    if (isNumber(anchorValue)) {
      let increment = 0;
      Array(highlightedLength - 1)
        .fill(0)
        .forEach((_, i) => {
          increment++;
          this.dispatch(
            setCellContent(
              highlightedCells[i + 1],
              String(+anchorValue + increment)
            )
          );
        });
    } else {
      Array(highlightedLength - 1)
        .fill(0)
        .forEach((_, i) => {
          this.dispatch(
            setCellContent(highlightedCells[i + 1], String(anchorValue))
          );
        });
    }
  }

  #handleFormulaModeMouseUp(
    isSameCellHighlighted: boolean,
    isCtrlKeyPressed: boolean
  ) {
    if (this.state.dragging && !isSameCellHighlighted && !isCtrlKeyPressed) {
      const { cellAnchor } = this.state.highlighted;
      if (!cellAnchor) return;
      const range = `${cellAnchor}:${this.state.hovered}`;
      const value = this.#addCellToFocusedBox(range, true);
      this.dispatch(setCellContent(this.state.selectedCell.id, value));
      this.dispatch(
        updateReferenceCells(
          this.state.selectedCell.id,
          [cellAnchor, this.state.hovered],
          true
        )
      );
    }
  }

  #handleRegularModeMouseUp(
    isSameCellHighlighted: boolean,
    isCtrlKeyPressed: boolean
  ) {
    if (!isSameCellHighlighted && isCtrlKeyPressed) {
      this.dispatch(addCellsToHighlight([this.state.hovered]));
    }
    this.dispatch(selectCell(this.state.hovered));
  }

  #handleFormulaModeMouseDown = (
    id: string,
    isFormulaFieldFocused: boolean,
    selectedCellId: string,
    selectedCellData: CellData,
    highlighted: Highlight,
    isCtrlPressed: boolean,
    isShiftPressed: boolean
  ) => {
    if (!selectedCellData) return;
    const { formula } = selectedCellData;
    if (!formula) return;
    const isLastValueClosedBracket = /(\))$/gi.test(formula);
    const isLastValueOperation = /[+-/*^:,]$/gi.test(formula);
    const isSameCellSelected = id === selectedCellId;

    if (isCtrlPressed) {
      this.dispatch(highlightFormulaCells([id]));
      this.#addCellsToFormula(id, isCtrlPressed);
    } else if (isShiftPressed) {
      // TODO
    } else {
      this.dispatch(setHighlightCellAnchor(id));
      if (
        !isSameCellSelected &&
        (!isLastValueClosedBracket || isLastValueOperation)
      ) {
        this.#addCellsToFormula(id, false);
      } else {
        if (isFormulaFieldFocused) {
          this.#addCellsToFormula(id, false);
        } else {
          this.dispatch(setFormulaMode(false));
          this.dispatch(recalculateFormulae());
          highlighted.hasLength &&
            !this.state.dragging &&
            this.dispatch(resetHighlight());
          this.setFocusInput(false);
          // this.inputRef?.blur();
          this.dispatch(selectCell(id));
          this.dispatch(highlightCells(id));
        }
      }
    }
  };

  #addCellToFocusedBox(text: string, replace: boolean) {
    const element = (
      this.state.isFormulaFieldFocused ? this.formulaFieldRef : this.inputRef
    ) as HTMLInputElement;

    const [start, end] = [
      element.selectionStart as number,
      element.selectionEnd as number,
    ];
    const currentValue = element.value.slice(0, end);

    element.focus({ preventScroll: true });

    const isLastValueRange = this.#isLastValueRangeRegEx.test(currentValue);
    const isLastValueCell = this.#isLastValueCellRegEx.test(currentValue);

    if (end > start) {
      element.setRangeText(text, start, end, "end");
    } else if (isLastValueRange) {
      if (replace) {
      }
      element.setRangeText(
        replace
          ? currentValue.replace(this.#isLastValueRangeRegEx, text)
          : "," + text,
        replace ? 0 : start,
        replace ? element.value.length : end,
        "end"
      );
    } else if (isLastValueCell) {
      element.setRangeText(
        replace
          ? currentValue.replace(this.#isLastValueCellRegEx, text)
          : "," + text,
        replace ? 0 : start,
        replace ? element.value.length : end,
        "end"
      );
    } else {
      element.setRangeText(text, start, end, "end");
    }
    return element.value;
  }
}
