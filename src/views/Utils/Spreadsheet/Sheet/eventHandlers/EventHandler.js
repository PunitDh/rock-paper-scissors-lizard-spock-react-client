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
  isCtrlKeyPressed,
} from "../utils/cellUtils";

export default class EventHandler {
  constructor(state, dispatch, clipboard, inputFocusRef) {
    this.state = state;
    this.dispatch = dispatch;
    this.clipboard = clipboard;
    this.inputFocusRef = inputFocusRef;
  }

  handleMouseMove(e) {
    this.dispatch(setHovered(e.target.id));
    if (this.state.mouseDown && !isCtrlKeyPressed(e)) {
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
    this.state.inputRef.focus();

    switch (e.key) {
      case KeyEvent.LOWERCASE_A:
        if (isCtrlKeyPressed(e)) {
          e.preventDefault();
          this.dispatch(selectAll());
        }
        break;
      case KeyEvent.LOWERCASE_Z:
        if (isCtrlKeyPressed(e)) {
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
        e.shiftKey &&
          !this.state.highlighted.cellAnchor &&
          this.dispatch(setHighlightCellAnchor(this.state.selectedCell.id));
        nextCell = this.#determineNextCell(e);
        e.preventDefault();
        this.dispatch(selectCell(nextCell));
        break;
      default:
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
    this.dispatch(pasteCellContent(this.state.selectedCell.id, data));
  }

  handleContextMenu(e) {
    e.preventDefault();
    const element = document.getElementById(this.state.hovered);
    this.dispatch(openContextMenu(element));
  }

  handleDoubleClick(e) {
    this.inputFocusRef.current = true;
  }

  handleMouseDown(e) {
    if (e.button !== MouseButton.LEFT_CLICK) return;
    this.dispatch(setMouseDown(true));
    const id = this.state.hovered;
    const selectedCellId = this.state.selectedCell.id;
    const selectedCellData = this.state.content.data[selectedCellId];
    const formula = selectedCellData?.formula;
    const isLastValueClosedBracket = /(\))$/gi.test(formula);
    const isLastValueOperation = /[+-/*^:,]$/gi.test(formula);
    const isShiftPressed = e.shiftKey;
    const isCtrlPressed = isCtrlKeyPressed(e);
    const isSameCellSelected = id === this.state.selectedCell.id;

    const addCellsToFormula = () => {
      const value = addCellToFocusedBox(this.state, id, !isCtrlKeyPressed(e));
      this.dispatch(setCellContent(this.state.selectedCell.id, value));
      this.dispatch(
        updateReferenceCells(
          this.state.selectedCell.id,
          [id],
          !isCtrlKeyPressed(e)
        )
      );
    };

    if (isCtrlPressed) {
      if (this.state.formulaMode) {
        this.dispatch(highlightFormulaCells(this.state.hovered));
        addCellsToFormula();
      } else {
        if (this.state.highlighted.cells.includes(id)) {
          this.dispatch(removeCellsFromHighlight([id]));
        } else {
          this.dispatch(addCellsToHighlight([id]));
        }
      }
    } else if (isShiftPressed) {
      if (this.state.formulaMode) {
        // TODO
      } else {
        this.dispatch(
          highlightCells(this.state.highlighted.cellAnchor, this.state.hovered)
        );
      }
    } else {
      if (this.state.formulaMode) {
        this.dispatch(setHighlightCellAnchor(id));
        if (
          !isSameCellSelected &&
          (!isLastValueClosedBracket || isLastValueOperation)
        ) {
          addCellsToFormula();
        } else {
          if (this.state.isFormulaFieldFocused) {
            addCellsToFormula();
          } else {
            this.dispatch(setFormulaMode(false));
            this.dispatch(recalculateFormulae());
            this.state.highlighted.cells.length > 0 &&
              this.dispatch(resetHighlight());
            this.dispatch(selectCell(id));
            this.dispatch(highlightCells(id));
          }
        }
      } else {
        this.state.highlighted.cells.length > 0 &&
          this.dispatch(resetHighlight());
        this.dispatch(selectCell(id));
        this.dispatch(setHighlightCellAnchor(id));
      }
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
        !isCtrlKeyPressed(e)
      );
      this.dispatch(setCellContent(this.state.selectedCell.id, value));
      this.dispatch(
        updateReferenceCells(
          this.state.selectedCell.id,
          [this.state.highlighted.cellAnchor, this.state.hovered],
          !isCtrlKeyPressed(e)
        )
      );
    } else if (!isSameCellHighlighted) {
      if (isCtrlKeyPressed(e)) {
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
        return isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${this.state.maxRows}`)
          : selectedCell.getNextRow(this.state.maxRows);
      case KeyEvent.ARROW_RIGHT:
        return isCtrlKeyPressed(e)
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
        return isCtrlKeyPressed(e)
          ? new Cell(`${SheetConfig.COLUMNS[0]}${selectedCell.row}`)
          : selectedCell.getPreviousColumn(this.state.maxColumns);
      case KeyEvent.ARROW_UP:
        return isCtrlKeyPressed(e)
          ? new Cell(`${selectedCell.column}${1}`)
          : selectedCell.getPreviousRow();
      default:
        break;
    }
  }
}
