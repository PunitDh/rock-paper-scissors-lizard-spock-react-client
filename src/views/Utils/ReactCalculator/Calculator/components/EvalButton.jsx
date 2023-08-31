import { setDebugValue, setEvaled, setOutput } from "../actions";
import { CalculatorButton } from "../styles";

function EvalButton({ state, dispatch }) {
  const evaluateExpression = () => {
    let value;
    try {
      let parsedInput = state.input
        .join("")
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("%", "/100")
        .replaceAll("²", "**2")
        .replaceAll("^", "**")
        .replaceAll(/(\d+)(?=\()/g, "$&*")
        .replaceAll(/(?<=\))(\d+)/g, "*$&")
        .replaceAll(
          /(\d+)(?=\s*(atan|acos|asin|sin|cos|tan|log|ln|Ans|Rnd|E|π))/g,
          "$&* "
        )
        .replaceAll(/(\d+)(√)(\d+)/g, "(Math.pow($3, 1/$1))")
        .replaceAll("√", "(Math.sqrt(")
        .replaceAll("π", "(Math.PI)")
        .replaceAll("E", "(Math.E)")
        .replaceAll("√", "")
        .replaceAll("Rnd", `(Math.random())`)
        .replaceAll("Ans", `(${state.ans})`)
        .replaceAll("asin(", `${state.deg ? "180/Math.PI*" : ""}Math.asin(`)
        .replaceAll("acos(", `${state.deg ? "180/Math.PI*" : ""}Math.acos(`)
        .replaceAll("atan(", `${state.deg ? "180/Math.PI*" : ""}Math.atan(`)
        .replaceAll(" sin(", `Math.sin(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll(" cos(", `Math.cos(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll(" tan(", `Math.tan(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll("log(", "1/Math.log(10)*Math.log(")
        .replaceAll("ln(", " Math.log(")
        .replaceAll(")(", ")*(")
        .replaceAll(")Math", ")*Math");

      const openBrackets = parsedInput.match(/\(/g)?.length || 0;
      const closeBrackets = parsedInput.match(/\)/g)?.length || 0;

      const diffBrackets = openBrackets - closeBrackets;
      console.log(diffBrackets);
      if (diffBrackets > 0) parsedInput += ")".repeat(diffBrackets);

      dispatch(setDebugValue(parsedInput));
      value = eval(parsedInput);
    } catch (error) {
      console.log(error);
      value = "Syntax Error";
    }
    return value;
  };

  const handleClick = () => {
    dispatch(setOutput(evaluateExpression()));
    dispatch(setEvaled(true));
  };

  return (
    <CalculatorButton variant="contained" onClick={handleClick}>
      =
    </CalculatorButton>
  );
}

export default EvalButton;
