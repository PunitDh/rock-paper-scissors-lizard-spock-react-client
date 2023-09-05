import Range from "../../models/Range";

// Utility functions
const processMatches = (str, reg, formulaCreator, zeroValue) => {
  const matches = [...str.matchAll(reg)];
  const ranges = matches.map(([_, start, end]) =>
    Range.createFlat(start.toUpperCase(), end.toUpperCase())
  );

  return ranges
    .map((it) => it.ids)
    .map((it, idx) => ({ [matches[idx][0]]: formulaCreator(it), zeroValue }));
};

const replaceFormulaWithValues = (str, stateContent, blankValue) => {
  const cellReg = /([A-Z]\d+)/g;
  const cellMatches = [...new Set([...str.matchAll(cellReg)].flat())].sort(
    (a, b) => {
      const [aLetters, aNumbers] = a.match(/([A-Z]+)(\d+)/).slice(1);
      const [bLetters, bNumbers] = b.match(/([A-Z]+)(\d+)/).slice(1);

      const lettersComparison = bLetters.localeCompare(aLetters);
      if (lettersComparison !== 0) return lettersComparison;

      return parseInt(bNumbers) - parseInt(aNumbers);
    }
  );

  return cellMatches.reduce(
    (acc, cur) =>
      acc.replaceAll(cur, `(${stateContent[cur]?.value || blankValue})`),
    str.replace("=", "")
  );
};

// Core evaluation functions
const evaluateFormula = (cellValue) => {
  let str = cellValue.toUpperCase().replaceAll("^", "**");

  const sumMatches = processMatches(
    str,
    /(?:SUM)\(([a-z]\d+):([a-z]\d+)\)/gi,
    (it) => `(${it.join("+")})`,
    null
  );

  const avgMatches = processMatches(
    str,
    /(?:AVERAGE)\(([a-z]\d+):([a-z]\d+)\)/gi,
    (it) => `((${it.join("+")})/${it.length})`,
    null
  );

  const countMatches = processMatches(
    str,
    /(?:COUNT)\(([a-z]\d+):([a-z]\d+)\)/gi,
    (it) => `(${it.map((i) => `Number(!isNaN(${i}))`).join("+")})`,
    undefined
  );

  return [sumMatches, avgMatches, countMatches].flat();
};

const evaluate = (str, stateContent) => {
  const parsedStrings = evaluateFormula(str);
  const substitutedValues = parsedStrings.map((it) => {
    const key = Object.keys(it)[0];
    return {
      [key]: replaceFormulaWithValues(
        Object.values(it)[0],
        stateContent,
        it.zeroValue
      ),
    };
  });

  const evaluatedExpressions = substitutedValues.map((it) => {
    const key = Object.keys(it)[0];
    return { [key]: evaluateExpression(Object.values(it)[0]) };
  });

  const replacedString = evaluatedExpressions.reduce(
    (acc, cur) =>
      acc.replaceAll(Object.keys(cur)[0], `(${Object.values(cur)[0].value})`),
    str.toUpperCase()
  );

  const substitutedString = replaceFormulaWithValues(
    replacedString,
    stateContent,
    0
  );
  return evaluateExpression(substitutedString);
};

export const updateStateContent = (stateContent, cell, formula) => {
  try {
    const evaluated = evaluate(formula, stateContent);
    return {
      ...stateContent,
      [cell]: {
        formula: formula.toUpperCase(),
        value: evaluated.value,
        display: evaluated.value,
      },
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
