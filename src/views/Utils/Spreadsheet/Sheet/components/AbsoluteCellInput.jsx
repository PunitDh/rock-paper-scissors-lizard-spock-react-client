import { useEffect, useState } from "react";

const AbsoluteCellInput = ({ state }) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const rect = document
      .getElementById(state.selectedCell.id)
      ?.getBoundingClientRect();

    setPosition({
      top: rect.top+ window.scrollY,
      left: rect.left+ window.scrollX,
      width: rect.right - rect.left,
    });
  }, [state.selectedCell.id]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transition: "top 200ms ease-in-out, left 200ms ease-in-out",
        zIndex: "50000",
      }}
    >
      <input
        style={{
          width: `${position.width}px`,
        }}
        type="text"
        value={
          state.content[state.selectedCell.id]?.formula ||
          state.content[state.selectedCell.id]?.value
        }
        suppressHydrationWarning={true}
        // id={`${state.selectedCell.id}-input`}
        autoComplete="off"
      />
    </div>
  );
};

export default AbsoluteCellInput;
