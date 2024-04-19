import { Calc } from "./constants";
import { Coord, Output, State } from "./types";

export const isBetween = (
  value: number,
  low: number,
  high: number
): boolean => {
  return value > 0 ? value > low && value < high : value < low && value > high;
};

export const linearInterpolate = (
  y: number,
  coordLow: Coord,
  coordHigh: Coord
): number => {
  const { x: x0, y: y0 } = coordLow;
  const { x: x1, y: y1 } = coordHigh;
  const x = ((y - y0) * (x1 - x0)) / (y1 - y0) + x0;
  return x;
};

export const evaluateExpression = (state: State): Output => {
  const _input = Calc.OPERATIONS.includes(state.input[state.input.length - 1] as any)
    ? state.input.concat(Calc.ANS)
    : state.input;

  let parsedInput: string = _input.join(""),
    value: string,
    values: Coord[] = [];
  try {
    parsedInput = parsedInput
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll(/((\d+|\w+)|\(([^)]*)(\)))+(?:%)/g, "($&/100)")
      .replaceAll("%", "")
      .replaceAll("²", "**(2)")
      .replaceAll("^", "**")
      .replaceAll(/(\b)e(\b|\B)/g, "(1e0)")
      .replaceAll(/(\d+)(?=\()/g, "$&*")
      .replaceAll(/(\d+)(?=x)/g, "$&*")
      .replaceAll(/(?<=\))(\d+)/g, "*$&")
      .replaceAll(/(?<=\))(\d+)/g, "*$&")
      .replaceAll(
        /(\d+|\))(?=\s*(atan|acos|asin| sin| cos| tan|log|ln|Ans|Rnd|E|π))/g,
        "$&* "
      )
      .replaceAll("Ans", `(${state.answer})`)
      .replaceAll("Rnd", `(Math.random())`)
      .replaceAll("M1", `(${state.memory.M1.value})`)
      .replaceAll("M2", `(${state.memory.M2.value})`)
      .replaceAll("M3", `(${state.memory.M3.value})`)
      .replaceAll("M4", `(${state.memory.M4.value})`)
      .replaceAll("M5", `(${state.memory.M5.value})`)
      .replaceAll("M6", `(${state.memory.M6.value})`)
      .replaceAll("M7", `(${state.memory.M7.value})`)
      .replaceAll("M8", `(${state.memory.M8.value})`)
      .replaceAll(
        /(\d+|x)(!+)/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
      )
      .replaceAll(/(\d+|x)(√\()(\d+|x)/g, "(Math.pow($3, 1/$1))")
      .replaceAll("√(", "(Math.sqrt(")
      .replaceAll("π", "(Math.PI)")
      .replaceAll("E", "(Math.E)")
      .replaceAll("√(", "")
      .replaceAll(
        /\((\d+|x)\)!/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
      )

      .replaceAll(
        /(asin|acos|atan)\(/g,
        `${state.degrees ? "(180/Math.PI*" : "(1*"}Math.$1(`
      )
      .replaceAll(
        /(?: )(sin|cos|tan)\(/g,
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

    if (/x/g.test(parsedInput)) {
      for (
        let x = state.graph.minX;
        x <= state.graph.maxX;
        x += Math.abs(state.graph.maxX - state.graph.minX) / 1000
      ) {
        const parsed = parsedInput.replaceAll("x", String(`(${x})`));

        try {
          const y = Math.round(eval(parsed) * 10 ** 13) / 10 ** 13;
          if (isFinite(y)) {
            values.push({
              x: Number(x.toFixed(4)),
              y,
            } as Coord);
          }
        } catch {}
      }
      return { values, value: "0", parsedInput, error: false };
    } else {
      value = String(Math.round(eval(parsedInput) * 10 ** 13) / 10 ** 13);
      return { values: [], value, parsedInput, error: false };
    }
  } catch (error) {
    return {
      values: [],
      value: "Syntax Error",
      parsedInput,
      error: true,
    };
  }
};
