import {
  addCellsToHighlight,
  addMemento,
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
  setFormulaMode,
  setHighlightCellAnchor,
  setHovered,
  setMouseDown,
  undoState,
  updateReferenceCells,
} from "../actions";
import { KeyEvent, MouseButton, SheetConfig } from "../constants";
import Cell from "../models/Cell";
import {
  addCellToFocusedBox,
  generateClipboardContent,
  isFormula,
} from "../utils/cellUtils";

export default class EventHandler {
  constructor(state, dispatch, clipboard, inputFocusRef) {
    this.state = state;
    this.dispatch = dispatch;
    this.clipboard = clipboard;
    this.inputFocusRef = inputFocusRef;
  }

  isCtrlKeyPressed = (e) => {
    return /mac/i.test(navigator.platform) ? e.metaKey : e.ctrlKey;
  };

  setInputFocusRef(value) {
    this.inputFocusRef.current = value;
  }

  handleInputBoxBlur(e) {
    this.inputFocusRef.current = false;
    const triggerRecalculation =
      !this.state.formulaMode &&
      (isFormula(e.target.value) ||
        this.state.formulaTrackedCells.includes(this.state.selectedCell.id));

    if (triggerRecalculation) {
      this.dispatch(recalculateFormulae());
      this.dispatch(addMemento());
    }
  }

  handleMouseMove(e) {
    this.dispatch(setHovered(e.target.id));
    if (this.state.mouseDown && !this.isCtrlKeyPressed(e)) {
      const { cellAnchor } = this.state.highlighted;
      if (this.state.formulaMode) {
        this.dispatch(
          highlightFormulaCellRange(cellAnchor, this.state.hovered)
        );
      } else {
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
        console.log("Here", e.key);
        e.shiftKey &&
          !this.state.highlighted.cellAnchor &&
          this.dispatch(setHighlightCellAnchor(this.state.selectedCell.id));
        nextCell = this.#determineNextCell(e);
        e.preventDefault();
        this.dispatch(selectCell(nextCell));
        break;
      default:
        this.state.inputRef.focus();
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
    this.inputFocusRef.current = true;
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
    // Assuming you only want to process the mouse up for the left button.
    if (e.button !== MouseButton.LEFT_CLICK) return;
    this.dispatch(setMouseDown(false));

    const isSameCellHighlighted =
      this.state.highlighted.cellAnchor === this.state.hovered;
    const selectingFormulaCells =
      this.state.formulaMode &&
      this.state.formulaHighlighted.length > 1 &&
      !isSameCellHighlighted;

    if (selectingFormulaCells) {
      const range = `${this.state.highlighted.cellAnchor}:${this.state.hovered}`;
      const value = addCellToFocusedBox(
        this.state,
        range,
        !this.isCtrlKeyPressed(e)
      );
      this.dispatch(setCellContent(this.state.selectedCell.id, value));
      this.dispatch(
        updateReferenceCells(
          this.state.selectedCell.id,
          [this.state.highlighted.cellAnchor, this.state.hovered],
          !this.isCtrlKeyPressed(e)
        )
      );
    } else if (!isSameCellHighlighted) {
      if (this.isCtrlKeyPressed(e)) {
        this.dispatch(addCellsToHighlight([this.state.hovered]));
      }
    }
  }

  handleScroll(e) {
    // console.log(e.target.scrollTop);
    // const selectedRow = document.getElementById(`row-${state.selectedCell.row}`);
    // console.log(selectedRow);
    // selectedRow.scrollIntoView();
    this.state.inputRef.style.top = e.target.scrollTop;
  }

  // Private functions
  #determineNextCell(e) {
    const { selectedCell } = this.state;

    if (!e.shiftKey && !this.state.formulaMode) {
      this.dispatch(resetHighlight()); // reset highlighting if conditions are met
    }

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

  #addCellsToFormula = (id, isCtrlPressed) => {
    const value = addCellToFocusedBox(this.state, id, !isCtrlPressed);
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
      highlighted.cells.length > 0 && this.dispatch(resetHighlight());
      this.dispatch(selectCell(id));
      this.dispatch(setHighlightCellAnchor(id));
    }
  };

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
      this.dispatch(highlightFormulaCells(id));
      this.#addCellsToFormula(id, isCtrlPressed);
    } else if (isShiftPressed) {
      // TODO
    } else {
      this.dispatch(setHighlightCellAnchor(id));
      if (
        !isSameCellSelected &&
        (!isLastValueClosedBracket || isLastValueOperation)
      ) {
        this.#addCellsToFormula(id, isCtrlPressed);
      } else {
        if (isFormulaFieldFocused) {
          this.#addCellsToFormula(id, isCtrlPressed);
        } else {
          this.dispatch(setFormulaMode(false));
          this.dispatch(recalculateFormulae());
          highlighted.cells.length > 0 && this.dispatch(resetHighlight());
          this.dispatch(selectCell(id));
          this.dispatch(highlightCells(id));
        }
      }
    }
  };
}
