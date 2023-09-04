import { Calc, MAX_COLUMN, MIN_COLUMN, SheetConfig } from "./constants";

export const getId = (id) => ({
  row: id?.match(/\d+/g)[0],
  column: id?.match(/[A-Z]/g)[0],
  columnCharCode: id?.match(/[A-Z]/g)[0].charCodeAt(0),
});

export const getCellMinMax = (highlighted) => {
  const ids = highlighted.map(getId);
  const columnCharCodes = ids.map((it) => it.columnCharCode);
  const rows = ids.map((it) => Number(it.row));
  const minC = Math.min(...columnCharCodes);
  const maxC = Math.max(...columnCharCodes);
  const minR = Math.min(...rows);
  const maxR = Math.max(...rows);

  return {
    minC,
    maxC,
    minR,
    maxR,
  };
};

export const getNextColumn = (id) => {
  const { row, columnCharCode } = getId(id);
  const nextRow =
    columnCharCode + 1 === MAX_COLUMN
      ? parseInt(row) === SheetConfig.MAX_ROWS
        ? 1
        : +row + 1
      : row;
  return `${
    columnCharCode + 1 === MAX_COLUMN
      ? String.fromCharCode(MIN_COLUMN)
      : String.fromCharCode(columnCharCode + 1)
  }${nextRow}`;
};

export const getNextRow = (id) => {
  const { row, column } = getId(id);
  return `${column}${+row === SheetConfig.MAX_ROWS ? +row : +row + 1}`;
};
export const getPreviousColumn = (id) => {
  const { row, columnCharCode } = getId(id);

  const nextRow =
    columnCharCode === MIN_COLUMN ? (+row === 1 ? row : row - 1) : row;
  return `${
    columnCharCode === MIN_COLUMN
      ? String.fromCharCode(MAX_COLUMN - 1)
      : String.fromCharCode(columnCharCode - 1)
  }${nextRow}`;
};

export const getPreviousRow = (id) => {
  const { row, column } = getId(id);
  return `${column}${+row === 1 ? +row : +row - 1}`;
};

export const evaluateFormula = (stateContent, cell, cellValue) => {
  const simpleReg = /([a-zA-Z]\d+)/gi;
  const simpleFormula = cellValue.matchAll(simpleReg);

  if (simpleReg.exec(cellValue)) {
    const str = [...simpleFormula]
      .map((group) => group[1])
      .reduce(
        (acc, cur) =>
          acc.replace(
            cur,
            `(${parseFloat(stateContent[cur.toUpperCase()]?.value || 0)})`
          ),
        cellValue
      )
      .replace("=", "");

    try {
      const evaluatedValue = evaluateExpression(str);
      return {
        ...stateContent,
        [cell]: {
          formula: cellValue.toUpperCase(),
          value: evaluatedValue.value,
          display: evaluatedValue.value,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        ...stateContent,
        [cell]: {
          formula: cellValue.toUpperCase(),
          value: "Syntax Error",
          display: "Syntax Error",
        },
      };
    }
  }

  const formulaTest = /(SUM|AVG)+(?:\()(\w+):(\w+)\)/g;
  const [string, formula, start, end] = [
    ...cellValue.matchAll(formulaTest),
  ].flat();

  if (string && formula && start && end) {
    const range = Range.create(start, end);
    const value = range.ids.reduce(
      (a, c) => +a + parseFloat(stateContent[c.id]?.value) || 0,
      0
    );
    return {
      ...stateContent,
      [cell]: {
        ...stateContent[cell],
        value,
        display: value,
      },
    };
  }
};

export const evaluateExpression = (input) => {
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
    console.log(error);
    return { value: "Syntax Error", parsedInput, error };
  }
};
