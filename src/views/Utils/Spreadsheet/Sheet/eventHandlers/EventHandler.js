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
import { generateClipboardContent, isFormula } from "../utils/cellUtils";

export default class EventHandler {
  constructor(state, dispatch, clipboard, inputFocusRef) {
    this.state = state;
    this.dispatch = dispatch;
    this.clipboard = clipboard;
    this.inputFocusRef = inputFocusRef;
    this.inputRef = {};
    this.formulaFieldRef = {};
    this.fillerRef = {};
  }

  isCtrlKeyPressed = (e) => {
    return /mac/i.test(navigator.platform) ? e.metaKey : e.ctrlKey;
  };

  setInputRef(ref) {
    this.inputRef = ref;
  }

  setFormulaFieldRef(ref) {
    this.formulaFieldRef = ref;
  }

  setFillerRef(ref) {
    this.fillerRef = ref;
  }

  setFocusInput(value) {
    this.inputFocusRef.current = value;
  }

  handleInputBoxBlur(e) {
    if (!this.state.formulaMode) {
      this.setFocusInput(false);
    }

    const triggerRecalculation =
      !this.state.formulaMode &&
      (isFormula(e.target.value) ||
        this.state.formulaTrackedCells.includes(this.state.selectedCell.id));

    if (triggerRecalculation) {
      this.dispatch(recalculateFormulae());
      this.dispatch(addMemento());
    }
  }

  handleCellInputKeyDown(e, originalValue, currentValue, navigateRefCurrent) {
    const cell = this.state.selectedCell;
    switch (e.key) {
      case KeyEvent.SHIFT:
        this.dispatch(setHighlightCellAnchor(cell.id));
        break;
      case KeyEvent.ESCAPE:
        this.dispatch(setFormulaMode(false));
        break;
      case KeyEvent.BACKSPACE:
        break;
      case KeyEvent.ENTER:
        const triggerRecalculation =
          this.state.formulaTrackedCells.includes(cell.id) ||
          isFormula(e.target.value);
        this.dispatch(setCellContent(cell.id, e.target.value));
        this.dispatch(setFormulaMode(false));
        triggerRecalculation && this.dispatch(recalculateFormulae());
        originalValue !== currentValue && this.dispatch(addMemento());
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
        const { current } = this.inputRef.current;
        if (current?.value.length === 0 || navigateRefCurrent)
          this.dispatch(
            selectCell(cell.getPreviousColumn(this.state.maxColumns))
          );
        break;
      }
      case KeyEvent.ARROW_RIGHT: {
        const { current } = this.inputRef.current;
        if (current?.value.length === 0 || navigateRefCurrent)
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
  handleFormulaFieldKeyDown(e, originalValue) {
    switch (e.key) {
      case KeyEvent.ESCAPE:
        this.dispatch(setFormulaMode(false));
        // setOriginalValue(originalValue);
        this.dispatch(setFormulaFieldText(originalValue));
        e.target.blur();
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
    this.formulaFieldRef.focus();
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

  handleMouseMove(e) {
    this.state.hovered !== e.target.id &&
      this.dispatch(setHovered(e.target.id));
    if (this.state.mouseDown) {
      !this.state.dragging && this.dispatch(setDragging(true));
    }

    if (this.state.formulaMode) {
      if (this.state.dragging && !this.isCtrlKeyPressed(e)) {
        const { cellAnchor } = this.state.highlighted;
        this.dispatch(
          highlightFormulaCellRange(cellAnchor, this.state.hovered)
        );
      }
    } else {
      if (this.state.dragging && !this.isCtrlKeyPressed(e)) {
        const { cellAnchor } = this.state.highlighted;
        this.dispatch(highlightCells(cellAnchor, this.state.hovered));
      }
    }
  }

  handleKeyUp(e) {
    switch (e.key) {
      case KeyEvent.SHIFT:
        this.dispatch(setHighlightCellAnchor(null));
        break;
      default:
        break;
    }
  }

  handleKeyDown(e) {
    let nextCell;
    console.log(e.key);

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
          console.log(content);
        }
        break;
      case KeyEvent.LOWERCASE_X:
        if (this.isCtrlKeyPressed(e)) {
          e.preventDefault();
          const content = generateClipboardContent(this.state);
          console.log(content);

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
      // dispatch(recalculateFormulae());
      // eslint-disable-next-line no-fallthrough
      case KeyEvent.TAB:
      case KeyEvent.ARROW_DOWN:
      case KeyEvent.ARROW_RIGHT:
      case KeyEvent.ARROW_LEFT:
      case KeyEvent.ARROW_UP:
        e.shiftKey &&
          !this.state.highlighted.cellAnchor &&
          this.dispatch(setHighlightCellAnchor(this.state.selectedCell.id));
        nextCell = this.#determineNextCell(e);
        e.preventDefault();
        this.dispatch(selectCell(nextCell));
        break;
      default:
        this.inputRef.focus();
        break;
    }

    if (e.shiftKey) {
      this.dispatch(
        highlightCells(this.state.highlighted.cellAnchor, nextCell?.id)
      );
    }
  }

  async handleCopyCapture(e) {
    e.preventDefault();
    console.log("Here");
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
    console.log(data);
    this.dispatch(pasteCellContent(this.state.selectedCell.id, data));
  }

  handleContextMenu(e) {
    e.preventDefault();
    const element = document.getElementById(this.state.hovered);
    this.dispatch(openContextMenu(element));
  }

  handleDoubleClick() {
    this.setFocusInput(true);
  }

  handleMouseDown(e) {
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

  handleMouseUp(e) {
    if (e.button !== MouseButton.LEFT_CLICK) return;
    this.dispatch(setMouseDown(false));
    this.state.fillerMode && this.dispatch(setFillerMode(false));

    const isSameCellHighlighted =
      this.state.highlighted.cellAnchor === this.state.hovered;
    const isCtrlKeyPressed = this.isCtrlKeyPressed(e);

    if (this.state.formulaMode) {
      this.#handleFormulaModeMouseUp(isSameCellHighlighted, isCtrlKeyPressed);
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
    this.inputRef.style.top = e.target.scrollTop;
  }

  // Private functions
  #determineNextCell(e) {
    const { selectedCell } = this.state;
    const shouldResetHighlight =
      !e.shiftKey &&
      !this.state.formulaMode &&
      this.state.highlighted.cells.length;

    shouldResetHighlight && this.dispatch(resetHighlight()); // reset highlighting if conditions are met

    switch (e.key) {
      case KeyEvent.ENTER:
        return e.shiftKey
          ? selectedCell.getPreviousRow(selectedCell)
          : selectedCell.getNextRow(this.state.maxRows);
      case KeyEvent.TAB:
        return e.shiftKey
          ? selectedCell.getPreviousColumn(this.state.maxColumns)
          : selectedCell.getNextColumn(
              this.state.maxRows,
              this.state.maxColumns
            );
      case KeyEvent.ARROW_DOWN:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${this.state.maxRows}`)
          : selectedCell.getNextRow(this.state.maxRows);
      case KeyEvent.ARROW_RIGHT:
        return this.isCtrlKeyPressed(e)
          ? new Cell(
              `${SheetConfig.COLUMNS[this.state.maxColumns - 1]}${
                selectedCell.row
              }`
            )
          : selectedCell.getNextColumn(
              this.state.maxRows,
              this.state.maxColumns
            );
      case KeyEvent.ARROW_LEFT:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${SheetConfig.COLUMNS[0]}${selectedCell.row}`)
          : selectedCell.getPreviousColumn(this.state.maxColumns);
      case KeyEvent.ARROW_UP:
        return this.isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${1}`)
          : selectedCell.getPreviousRow();
      default:
        break;
    }
  }

  #addCellsToFormula = (id, isCtrlPressed = false) => {
    const value = this.#addCellToFocusedBox(id, !isCtrlPressed);
    this.dispatch(setCellContent(this.state.selectedCell.id, value));
    this.dispatch(
      updateReferenceCells(this.state.selectedCell.id, [id], !isCtrlPressed)
    );
  };

  #handleRegularModeMouseDown = (
    id,
    highlighted,
    isCtrlPressed,
    isShiftPressed
  ) => {
    if (isCtrlPressed) {
      if (highlighted.cells.includes(id)) {
        this.dispatch(removeCellsFromHighlight([id]));
      } else {
        this.dispatch(addCellsToHighlight([id]));
      }
    } else if (isShiftPressed) {
      this.dispatch(highlightCells(highlighted.cellAnchor, id));
    } else {
      !this.state.dragging &&
        this.state.highlighted.cells.length &&
        this.dispatch(resetHighlight());
      this.dispatch(selectCell(id));
      this.dispatch(setHighlightCellAnchor(id));
    }
  };

  #handleFormulaModeMouseUp(isSameCellHighlighted, isCtrlKeyPressed) {
    if (this.state.dragging && !isSameCellHighlighted && !isCtrlKeyPressed) {
      const range = `${this.state.highlighted.cellAnchor}:${this.state.hovered}`;
      const value = this.#addCellToFocusedBox(range, true);
      this.dispatch(setCellContent(this.state.selectedCell.id, value));
      this.dispatch(
        updateReferenceCells(
          this.state.selectedCell.id,
          [this.state.highlighted.cellAnchor, this.state.hovered],
          true
        )
      );
    }
  }

  #handleRegularModeMouseUp(isSameCellHighlighted, isCtrlKeyPressed) {
    if (!isSameCellHighlighted && isCtrlKeyPressed) {
      this.dispatch(addCellsToHighlight([this.state.hovered]));
    }
    this.dispatch(selectCell(this.state.hovered));
  }

  #handleFormulaModeMouseDown = (
    id,
    isFormulaFieldFocused,
    selectedCellId,
    selectedCellData,
    highlighted,
    isCtrlPressed,
    isShiftPressed
  ) => {
    const formula = selectedCellData?.formula;
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
          highlighted.cells.length > 0 &&
            !this.state.dragging &&
            this.dispatch(resetHighlight());
          this.dispatch(selectCell(id));
          this.dispatch(highlightCells(id));
        }
      }
    }
  };

  #addCellToFocusedBox(text, replace) {
    const isLastValueRange = /([a-z]+[0-9]+):([a-z]+[0-9]+)$/gi;
    const isLastValueCell = /([a-z]+[0-9]+)$/gi;

    // const currentValue = state.content.data[state.selectedCell.id].formula;
    const element = this.state.isFormulaFieldFocused
      ? this.formulaFieldRef
      : this.inputRef;

    const [start, end] = [element.selectionStart, element.selectionEnd];
    const currentValue = element.value.slice(0, end);
    element.focus();

    if (end > start) {
      element.setRangeText(text, start, end, "preserve");
    } else if (isLastValueRange.test(currentValue)) {
      element.setRangeText(
        replace ? currentValue.replace(isLastValueRange, text) : "," + text,
        replace ? 0 : start,
        replace ? element.value.length : end,
        "preserve"
      );
    } else if (isLastValueCell.test(currentValue)) {
      element.setRangeText(
        replace ? currentValue.replace(isLastValueCell, text) : "," + text,
        replace ? 0 : start,
        replace ? element.value.length : end,
        "preserve"
      );
    } else {
      element.setRangeText(text, start, end, "preserve");
    }
    return element.value;
  }
}
