import { Calc } from "./constants";

export const evaluateExpression = (state) => {
  let parsedInput, value;
  try {
    const _input = Calc.OPERATIONS.includes(state.input[state.input.length - 1])
      ? state.input.concat(Calc.ANS)
      : state.input;

    parsedInput = _input
      .join("")
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("%", "/100")
      .replaceAll("²", "**2")
      .replaceAll("^", "**")
      .replaceAll(/(\d+)(?=\()/g, "$&*")
      .replaceAll(/(?<=\))(\d+)/g, "*$&")
      .replaceAll(
        /(\d+|\))(?=\s*(atan|acos|asin| sin| cos| tan|log|ln|Ans|Rnd|E|π))/g,
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
      .replaceAll(
        /\((\d+)\)!/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
      )
      .replaceAll("M1", `(${state.memory.M1.value})`)
      .replaceAll("M2", `(${state.memory.M2.value})`)
      .replaceAll("M3", `(${state.memory.M3.value})`)
      .replaceAll("M4", `(${state.memory.M4.value})`)
      .replaceAll("M5", `(${state.memory.M5.value})`)
      .replaceAll("M6", `(${state.memory.M6.value})`)
      .replaceAll("M7", `(${state.memory.M7.value})`)
      .replaceAll("M8", `(${state.memory.M8.value})`)
      .replaceAll("asin ", `${state.degrees ? "180/Math.PI*" : ""}Math.asin(`)
      .replaceAll("acos ", `${state.degrees ? "180/Math.PI*" : ""}Math.acos(`)
      .replaceAll("atan ", `${state.degrees ? "180/Math.PI*" : ""}Math.atan(`)
      .replaceAll(" sin ", `Math.sin(${state.degrees ? "Math.PI/180*" : ""}`)
      .replaceAll(" cos ", `Math.cos(${state.degrees ? "Math.PI/180*" : ""}`)
      .replaceAll(" tan ", `Math.tan(${state.degrees ? "Math.PI/180*" : ""}`)
      .replaceAll("log ", "1/Math.log(10)*Math.log(")
      .replaceAll("ln ", " Math.log(")
      .replaceAll(")(", ")*(")
      .replaceAll(")Math", ")*Math");

    const openBrackets = parsedInput.match(/\(/g)?.length || 0;
    const closeBrackets = parsedInput.match(/\)/g)?.length || 0;

    const diffBrackets = openBrackets - closeBrackets;
    if (diffBrackets > 0) parsedInput += ")".repeat(diffBrackets);

    value = eval(parsedInput);
    return { value, parsedInput };
  } catch (error) {
    return { value: "Syntax Error", parsedInput };
  }
};
