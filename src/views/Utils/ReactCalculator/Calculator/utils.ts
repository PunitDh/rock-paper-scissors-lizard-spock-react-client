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
      .replaceAll(/((\d+|\w+)|\(([^)]*)(\)))+(?:%)/g, "($&/100)")
      .replaceAll("%", "")
      .replaceAll("²", "**(2)")
      .replaceAll("^", "**")
      .replaceAll(/(\b)e(\b|\B)/g, "(1e0)")
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
      .replaceAll(/(\d+)(√\()(\d+)/g, "(Math.pow($3, 1/$1))")
      .replaceAll("√(", "(Math.sqrt(")
      .replaceAll("π", "(Math.PI)")
      .replaceAll("E", "(Math.E)")
      .replaceAll("√(", "")
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
      .replaceAll(
        /(asin|acos|atan)/g,
        `${state.degrees ? "(180/Math.PI*" : "(1*"}Math.$1(`
      )
      .replaceAll(
        /(?: )(sin|cos|tan)/g,
        `Math.$1(${state.degrees ? `Math.PI/180*` : `1*`}`
      )
      .replaceAll(/(?:log)\(([^)]*)(\)|)/g, "Math.log10($1)")
      .replaceAll(/(?:ln)\(([^)]*)(\)|)/g, " Math.log($1)")
      .replaceAll(")(", ")*(")
      .replaceAll(/(\d+|\))Math/g, "$1*Math")
      .replaceAll(")Math", ")*Math");

    const openBrackets = parsedInput.match(/\(/g)?.length || 0;
    const closeBrackets = parsedInput.match(/\)/g)?.length || 0;

    const diffBrackets = openBrackets - closeBrackets;
    if (diffBrackets > 0) parsedInput += ")".repeat(diffBrackets);

    value = String(Math.round(eval(parsedInput) * 10 ** 13) / 10 ** 13);

    return { value, parsedInput, error: false };
  } catch (error) {
    return {
      value: "Syntax Error",
      parsedInput,
      error: true,
    };
  }
};
