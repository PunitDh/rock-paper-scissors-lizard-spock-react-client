import { setDebugValue, setEvaled, setOutput } from "../actions";
import { CalculatorButton } from "../styles";

function EvalButton({ state, dispatch }) {
  const evaluateExpression = () => {
    let value;
    try {
      const parsedInput = state.input
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("%", "/100")
        .replaceAll("^", "**")
        .replaceAll(")(", ")*(")
        .replaceAll(
          /(\d+)(?=\s*(atan|acos|asin|sin|cos|tan|log|ln|Ans|E|π|√))/g,
          "$&*"
        )
        .replaceAll("ππ", "π*π")
        .replaceAll("π", "Math.PI")
        .replaceAll("EE", "E*E")
        .replaceAll("E", "Math.E")
        .replaceAll(/(?<=√)\w+/g, "Math.sqrt($&)")
        .replaceAll("√", "")
        .replaceAll("AnsAns", "Ans*Ans")
        .replaceAll("Ans", state.ans)

        .replaceAll("asin(", `${state.deg ? "180/Math.PI*" : ""}Math.asin(`)
        .replaceAll("acos(", `${state.deg ? "180/Math.PI*" : ""}Math.acos(`)
        .replaceAll("atan(", `${state.deg ? "180/Math.PI*" : ""}Math.atan(`)
        .replaceAll(" sin(", ` Math.sin(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll(" cos(", ` Math.cos(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll(" tan(", ` Math.tan(${state.deg ? "Math.PI/180*" : ""}`)
        .replaceAll("log(", "1/Math.log(10)*Math.log(")
        .replaceAll("ln(", " Math.log(")
        .replaceAll(")Math", ")*Math");

      dispatch(setDebugValue(parsedInput));
      value = eval(parsedInput);
    } catch {
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
