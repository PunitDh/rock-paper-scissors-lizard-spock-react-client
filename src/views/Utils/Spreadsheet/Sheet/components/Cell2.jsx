import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CellDiv, DivItem } from "../../styles";
import {
  resetHighlighted,
  setContent,
  highlightCells,
  selectCell,
  setHighlightedAnchor,
  setHighlightedCurrent,
  setHovered,
  setEditMode,
  setMenuAnchorElement,
  recalculateFormulae,
} from "../actions";
import { KeyboardEvent, MouseButton } from "../../constants";

const Cell2 = ({ id, state, dispatch }) => {
  const [offset, setOffset] = useState();
  const [focused, setFocused] = useState(false);
  const [cellContent, setCellContent] = useState("");
  const containerRef = useRef();

  const textRef = useRef();

  useEffect(() => {
    const node = textRef.current;

    if (node) {
      const focusInListener = node.addEventListener("focusin", () => {
        setFocused(true);
        const formula = state.content[id]?.formula;
        if (formula) setCellContent(formula);
      });

      const focusOutListener = node.addEventListener("focusout", () => {
        setFocused(false);
        dispatch(recalculateFormulae());
        const value = state.content[id]?.value;
        if (value) setCellContent(value);
      });

      return () => {
        node.removeEventListener("focusin", focusInListener);
        node.removeEventListener("focusout", focusOutListener);
      };
    }
  }, [state.content, id, dispatch]);

  useEffect(() => {
    const node = textRef.current;
    if (node) {
      if (id === state.selected.cell) {
        const selection = window.getSelection(),
          range = document.createRange();
        range.setStart(node, 0);
        range.setEnd(node, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [state.selected.cell]);

  useEffect(() => {
    setCellContent(state.content[id]?.value || "");
  }, [state.content, id]);

  useLayoutEffect(() => {
    if (offset !== undefined && focused) {
      const newRange = document.createRange();
      console.log(newRange);
      // var startNode = textRef.current.childNodes[1].firstChild;
      // var endNode = textRef.current.childNodes[5].firstChild;

      if (textRef.current) {
        // Get the last child node
        const lastChild = textRef.current.lastChild;

        if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
          newRange.setStart(lastChild, lastChild.nodeValue.length);
          newRange.setEnd(lastChild, lastChild.nodeValue.length);
        } else if (!lastChild) {
          // Handle case where the contenteditable is empty
          newRange.setStart(textRef.current, 0);
          newRange.setEnd(textRef.current, 0);
        }
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      const selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  });

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(selectCell(id));
    }
  };

  const handleChange = (e) => {
    const range = document.getSelection().getRangeAt(0);
    setOffset(range.startOffset);
    const newValue = e.target.textContent;
    setCellContent(newValue);
    dispatch(setContent({ cell: id, value: newValue }));
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardEvent.BACKSPACE) {
      state.editMode && e.stopPropagation();
    } else {
      console.log("keydown", e.key, id);
      setFocused(true);
    }
  };

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    console.log(id, state.content[id]?.value);
    if (state.mouseDown) {
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // e.preventDefault();
      if (!state.mouseDown && !state.shiftKey) dispatch(resetHighlighted());
      dispatch(selectCell(id));
      dispatch(setHighlightedAnchor(id));
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(selectCell(id));
    // dispatch(setEditMode(true));
    setFocused(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
  };

  return (
    <DivItem
      ref={containerRef}
      onClick={handleClick}
      selected={
        id === state.selected.cell || state.highlighted.cells.includes(id)
      }
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      id={id}
    >
      <CellDiv
        ref={textRef}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        contentEditable={true}
        suppressContentEditableWarning={true}
        focused={focused}
      >
        {cellContent}
      </CellDiv>
    </DivItem>
  );
};

export default Cell2;
