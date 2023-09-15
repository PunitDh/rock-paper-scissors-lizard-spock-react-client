import React, { useCallback, useEffect, useState } from "react";
import { Position } from "../components/SheetInput/types";
import CellData from "../models/CellData";

export default function useElementPosition(
  selectedCellData: CellData,
  selectedId: string,
  lastHighlighted: string,
  rowHeight: { value: number },
  columnWidth: { value: number }
) {
  const [position, setPosition] = useState<Position>({
    cellInput: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    filler: { top: 0, left: 0 },
  });

  const setPositions = useCallback(() => {
    const cellInputRect = document
      .getElementById(selectedId)
      ?.getBoundingClientRect();

    if (cellInputRect) {
      setPosition((position) => ({
        ...position,
        cellInput: {
          top: cellInputRect.top + window.scrollY,
          left: cellInputRect.left + window.scrollX,
          width: cellInputRect.width,
          height: cellInputRect.height,
        },
      }));
    }
    const lastHighlightedRect = document
      .getElementById(lastHighlighted || selectedId)
      ?.getBoundingClientRect();

    if (lastHighlightedRect) {
      const top =
        lastHighlightedRect.top +
        window.scrollY +
        lastHighlightedRect.height -
        6;
      const left =
        lastHighlightedRect.left +
        window.scrollX +
        lastHighlightedRect.width -
        6;
      setPosition((position) => ({ ...position, filler: { top, left } }));
    }
  }, [lastHighlighted, selectedId]);

  useEffect(() => {
    setPositions();

    window.addEventListener("resize", setPositions);

    return () => {
      window.removeEventListener("resize", setPositions);
    };
  }, [setPositions, rowHeight, columnWidth, selectedCellData]);

  return position;
}
