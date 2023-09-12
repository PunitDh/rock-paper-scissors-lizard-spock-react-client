import React, { useRef, useState } from "react";
import PrettifyHTML from "./PrettifyHTML";
import { OutputPretty } from "../styles";
import { Button } from "@mui/material";

const XMLEditor = ({ state }) => {
  const [prettified, setPrettified] = useState("");
  const inputRef = useRef(prettified);
  const textRef = useRef();
  
  const handleInput = (e) => {
    inputRef.current = textRef.current.textContent;
  };

  const prettifyInput = () => {
    const prettifiedInput = (
      <PrettifyHTML>{textRef.current.textContent}</PrettifyHTML>
    );
    setPrettified(prettifiedInput);
  };

  return (
    <>
      <Button variant="contained" onClick={prettifyInput}>
        Prettify
      </Button>
      <OutputPretty
        contentEditable={true}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        ref={textRef}
      >
        {prettified}
      </OutputPretty>
    </>
  );
};

export default XMLEditor;
