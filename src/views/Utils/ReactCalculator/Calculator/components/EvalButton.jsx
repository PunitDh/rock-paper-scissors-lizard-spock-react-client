import { setDebugValue, setEvaled, setOutput } from "../actions";
import { Calc } from "../constants";
import { CalculatorButton } from "../styles";

const EvalButton = ({ state, dispatch }) => {
  const evaluateExpression = (input) => {
    let output;
    try {
      let parsedInput = input
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
        .replaceAll(
          /(\d+)(!+)/g,
          "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
        )
        .replaceAll(/(\d+)(√)(\d+)/g, "(Math.pow($3, 1/$1))")
        .replaceAll("√", "(Math.sqrt(")
        .replaceAll("π", "(Math.PI)")
        .replaceAll("E", "(Math.E)")
        .replaceAll("√", "")
        .replaceAll("Rnd", `(Math.random())`)
        .replaceAll("Ans", `(${state.answer})`)
        .replaceAll("asin(", `${state.degrees ? "180/Math.PI*" : ""}Math.asin(`)
        .replaceAll("acos(", `${state.degrees ? "180/Math.PI*" : ""}Math.acos(`)
        .replaceAll("atan(", `${state.degrees ? "180/Math.PI*" : ""}Math.atan(`)
        .replaceAll(" sin(", `Math.sin(${state.degrees ? "Math.PI/180*" : ""}`)
        .replaceAll(" cos(", `Math.cos(${state.degrees ? "Math.PI/180*" : ""}`)
        .replaceAll(" tan(", `Math.tan(${state.degrees ? "Math.PI/180*" : ""}`)
        .replaceAll("log(", "1/Math.log(10)*Math.log(")
        .replaceAll("ln(", " Math.log(")
        .replaceAll(")(", ")*(")
        .replaceAll(")Math", ")*Math");

      const openBrackets = parsedInput.match(/\(/g)?.length || 0;
      const closeBrackets = parsedInput.match(/\)/g)?.length || 0;

      const diffBrackets = openBrackets - closeBrackets;
      if (diffBrackets > 0) parsedInput += ")".repeat(diffBrackets);

      dispatch(setDebugValue(parsedInput));
      output = eval(parsedInput);
    } catch (error) {
      output = "Syntax Error";
    }
    return output;
  };

  const handleClick = () => {
    if (Calc.OPERATIONS.includes(state.input[state.input.length - 1])) {
      dispatch(setOutput(evaluateExpression(state.input.concat(Calc.ANS))));
    } else {
      dispatch(setOutput(evaluateExpression(state.input)));
    }
    dispatch(setEvaled(true));
  };

  return (
    <CalculatorButton variant="contained" onClick={handleClick}>
      =
    </CalculatorButton>
  );
};

export default EvalButton;
