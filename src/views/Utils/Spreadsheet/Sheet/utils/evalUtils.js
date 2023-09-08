import Range from "../models/Range";

// Utility functions
const processMatches = (str, reg, formulaCreator, zeroValue) => {
  const matches = [...str.matchAll(reg)];
  const referenceCells = matches.map(([_, match]) =>
    match
      .split(",")
      .map((it) =>
        it.includes(":")
          ? Range.createFlat(it.split(":")[0], it.split(":")[1]).cellIds
          : it
      )
      .flat()
  );

  return referenceCells.map((it, idx) => ({
    [matches[idx][0]]: formulaCreator(it),
    zeroValue,
    referenceCells,
  }));
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
  let str = cellValue.toUpperCase();

  const sumMatches = processMatches(
    str,
    /(?:SUM)\(([^)]+)\)/gi,
    (it) => `(${it.join("+")})`,
    null
  );

  const avgMatches = processMatches(
    str,
    /(?:AVERAGE)\(([^)]+)\)/gi,
    (it) => `((${it.join("+")})/${it.filter((it) => it !== null).length})`,
    null
  );

  const countMatches = processMatches(
    str,
    /(?:COUNT)\(([^)]+)\)/gi,
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
      [key]: {
        value: replaceFormulaWithValues(
          Object.values(it)[0],
          stateContent,
          it.zeroValue
        ),
        referenceCells: it.referenceCells,
      },
    };
  });

  const evaluatedExpressions = substitutedValues.map((it) => {
    const key = Object.keys(it)[0];
    return {
      [key]: {
        ...evaluateExpression(Object.values(it)[0].value),
        referenceCells: Object.values(it)[0].referenceCells,
      },
    };
  });

  const replacedString = evaluatedExpressions.reduce(
    (acc, cur) => {
      const curKey = Object.keys(cur)[0];
      const curValue = Object.values(cur)[0];
      return {
        stringValue: acc.stringValue.replaceAll(curKey, `(${curValue.value})`),
        referenceCells: [...acc.referenceCells, ...curValue.referenceCells],
      };
    },
    { stringValue: str.toUpperCase(), referenceCells: [] }
  );

  const substitutedString = replaceFormulaWithValues(
    replacedString.stringValue,
    stateContent,
    0
  );

  const finalEvaluation = evaluateExpression(substitutedString);

  return {
    ...finalEvaluation,
    referenceCells: replacedString.referenceCells,
  };
};

export const getUpdatedStateContent = (stateContent, cell, formula) => {
  try {
    // const referenceCells = getReferenceCells(formula);
    const evaluated = evaluate(formula, stateContent);
    return {
      ...stateContent,
      [cell]: {
        ...stateContent[cell],
        formula: formula.toUpperCase(),
        referenceCells: [...new Set(evaluated.referenceCells)].flat(),
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
      .replaceAll(/FLOOR\(/gi, "(Math.floor(")
      .replaceAll(/CEIL\(/gi, "(Math.ceil(")
      .replaceAll(/ROUND\(/gi, "(Math.round(")
      .replaceAll(/PI\(\)/gi, "(Math.PI)")
      .replaceAll(/E\(\)/gi, "(Math.E)")
      .replaceAll(/RND\(\)/gi, `(${Math.random()})`)
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
