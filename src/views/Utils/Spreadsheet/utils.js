import { MAX_COLUMN, MIN_COLUMN, SheetConfig } from "./constants";
import Cell from "./models/Cell";

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

export const getCellOffset = (cell, offsetX, offsetY) => {
  const offsetRow = +cell.row + offsetY;
  const offsetColumn =
    SheetConfig.COLUMNS[+SheetConfig.COLUMNS.indexOf(cell.column) + offsetX];
  return `${offsetColumn}${offsetRow}`;
};

export const generateClipboardContent = (state) => {
  const content = state.highlighted.rows.map((row) =>
    state.highlighted.columns.map((column) => ({
      value: state.content[`${column}${row}`]?.value || "",
      display: state.content[`${column}${row}`]?.display || "",
      formula: state.content[`${column}${row}`]?.formula || "",
    }))
  );
  const type = "_sheet";
  return JSON.stringify({ type, content });
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
  const simpleReg = /([a-zA-Z]\d+|\d+)/gi;
  const simpleFormulaMatches = [...cellValue.matchAll(simpleReg)].flat();

  if (simpleFormulaMatches.length > 0) {
    const evaluatedValue = simpleFormulaMatches.reduce((acc, cur) => {
      const numericValue = parseFloat(
        stateContent[cur.toUpperCase()]?.value || 0
      );
      return acc.replace(cur, isNaN(cur) ? `(${numericValue})` : cur);
    }, cellValue.replace("=", ""));

    try {
      const evaluatedExpression = evaluateExpression(evaluatedValue);
      return {
        ...stateContent,
        [cell]: {
          formula: cellValue.toUpperCase(),
          value: evaluatedExpression.value,
          display: evaluatedExpression.value,
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
  const formulaMatches = [...cellValue.matchAll(formulaTest)].flat();

  if (formulaMatches.length === 3) {
    const [formula, start, end] = formulaMatches;
    const range = Range.createFlat(start, end);
    const value = range.ids.reduce(
      (acc, current) => acc + parseFloat(stateContent[current.id]?.value) || 0,
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
