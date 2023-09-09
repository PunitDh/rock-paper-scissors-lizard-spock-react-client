import CellContent from "../../models/CellContent";
import Range from "../../models/Range";

const evaluateFormula = (cellValue) => {
  let str = cellValue.toUpperCase();

  const processMatches = (reg, formulaCreator) => {
    const matches = [...str.matchAll(reg)];
    const ranges = matches.map(([_, start, end]) =>
      Range.createFlat(start.toUpperCase(), end.toUpperCase())
    );

    const formulas = ranges.map((it) => it.cellIds).map(formulaCreator);

    str = formulas.reduce((a, c, idx) => {
      const key = matches[idx][0];
      return a.replaceAll(key, c);
    }, str);
  };

  const sumReg = /(?:SUM)\(([a-z]\d+):([a-z]\d+)\)/gi;
  processMatches(sumReg, (it) => `(${it.join("+")})`);

  const avgReg = /(?:AVERAGE)\(([a-z]\d+):([a-z]\d+)\)/gi;
  processMatches(avgReg, (it) => `((${it.join("+")})/${it.length})`);

  str = str.replaceAll("^", "**");

  const countReg = /(?:COUNT)\(([a-z]\d+):([a-z]\d+)\)/gi;
  processMatches(
    countReg,
    (it) => `(${it.map((i) => `Number(!isNaN(${i}))`).join("+")})`
  );

  return str;
};

const substituteValues = (str, stateContent) => {
  const cellReg = /([A-Z]\d+)/g;
  const cellMatches = [...new Set([...str.matchAll(cellReg)].flat())].sort(
    (a, b) => {
      const [aLetters, aNumbers] = a.match(/([A-Z]+)(\d+)/).slice(1);
      const [bLetters, bNumbers] = b.match(/([A-Z]+)(\d+)/).slice(1);

      const lettersComparison = bLetters.localeCompare(aLetters);

      if (lettersComparison !== 0) {
        return lettersComparison;
      }

      const aNumber = parseInt(aNumbers);
      const bNumber = parseInt(bNumbers);
      return bNumber - aNumber;
    }
  );

  const substitutedCells = cellMatches.reduce((acc, cur) => {
    return acc.replaceAll(cur, `(${stateContent[cur]?.value})`);
  }, str.replace("=", ""));

  return substitutedCells;
};

export const updateStateContent = (stateContent, cell, formula) => {
  try {
    const parsedString = evaluateFormula(formula);
    const substitutedValues = substituteValues(parsedString, stateContent);
    const evaluatedExpression = evaluateExpression(substitutedValues);
    return {
      ...stateContent,
      [cell]: new CellContent({
        id: cell,
        formula: formula.toUpperCase(),
        value: evaluatedExpression.value,
        display: evaluatedExpression.value,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      ...stateContent,
      [cell]: {
        formula: formula.toUpperCase(),
        value: "Syntax Error",
        display: "Syntax Error",
      },
    };
  }
};

const evaluateExpression = (input) => {
  let parsedInput, value;
  try {
    parsedInput = input
      .replaceAll("%", "/100")
      .replaceAll("^", "**")
      .replaceAll(/(\b)e(\b|\B)/g, "1e0")
      .replaceAll(/(\d+)(?=\()/g, "$&*")
      .replaceAll(/(?<=\))(\d+)/g, "*$&")
      .replaceAll(
        /(\d+|\))(?=\s*(atan|acos|asin|sin|cos|tan|log|ln|Rnd|E|π))/gi,
        "$&* "
      )
      .replaceAll(
        /(\d+)(!+)/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
      )
      .replaceAll(/(\d+)(√\()(\d+)/g, "(Math.pow($3, 1/$1))")
      .replaceAll(/SQRT\(/gi, "(Math.sqrt(")
      .replaceAll(/PI\(\)/gi, "(Math.PI)")
      .replaceAll(/E\(\)/gi, "(Math.E)")
      .replaceAll(/RND\(\)/gi, `(Math.random())`)
      .replaceAll(
        /\((\d+)\)!/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))"
      )
      .replaceAll(/(asin|acos|atan)/gi, `Math.$1(`)
      .replaceAll(/(sin|cos|tan)/gi, `Math.$1(`)
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

    return { value, parsedInput };
  } catch (error) {
    console.log(error, parsedInput);
    return { value: "Syntax Error", parsedInput, error };
  }
};
