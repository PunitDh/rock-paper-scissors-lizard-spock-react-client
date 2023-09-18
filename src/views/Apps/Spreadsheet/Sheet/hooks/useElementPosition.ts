import { useCallback, useEffect, useState } from "react";
import { Position } from "../components/SheetInput/types";

export default function useElementPosition(
  selectedId: string,
  firstHighlighted: string,
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
    highlight: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  });

  const setPositions = useCallback(() => {
    const cellInputRect = document
      .getElementById(selectedId)
      ?.getBoundingClientRect();

    if (cellInputRect) {
      const fillerTop =
        cellInputRect.top + window.scrollY + cellInputRect.height - 6;
      const fillerLeft =
        cellInputRect.left + window.scrollX + cellInputRect.width - 6;
      setPosition((position) => ({
        ...position,
        cellInput: {
          top: cellInputRect.top + window.scrollY,
          left: cellInputRect.left + window.scrollX,
          width: cellInputRect.width,
          height: cellInputRect.height,
        },
        filler: {
          top: fillerTop,
          left: fillerLeft,
        },
      }));
    }

    const firstHighlightedRect = document
      .getElementById(firstHighlighted)
      ?.getBoundingClientRect();

    const lastHighlightedRect = document
      .getElementById(lastHighlighted)
      ?.getBoundingClientRect();

    if (firstHighlightedRect && lastHighlightedRect) {
      const top = firstHighlightedRect.top + window.scrollY;
      const left = firstHighlightedRect.left + window.scrollX;
      const width = lastHighlightedRect.right + window.scrollX - left;
      const height = lastHighlightedRect.bottom + window.scrollY - top;
      setPosition((position) => ({
        ...position,
        highlight: { top, left, width, height },
      }));
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
    }
  }, [firstHighlighted, lastHighlighted, selectedId]);

  useEffect(() => {
    setPositions();

    window.addEventListener("resize", setPositions);

    return () => {
      window.removeEventListener("resize", setPositions);
    };
  }, [setPositions, rowHeight, columnWidth]);

  return position;
}
