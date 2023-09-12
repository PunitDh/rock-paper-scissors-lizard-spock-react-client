import { isFormula } from "../utils/cellUtils";
import CellRange from "./CellRange";
import CellFormatting from "./CellFormatting";
import { NumberFormat } from "../components/Toolbar/constants";

export default class CellData {
  constructor(obj) {
    if (obj) {
      this.id = obj.id || null;
      this.value = obj.value || null;
      this.formula = obj.formula || null;
      this.referenceCells = obj.referenceCells || [];
      this.display = obj.display || "";
      this.formatting =
        new CellFormatting(obj.formatting) || new CellFormatting();
      this.error = obj.error || null;
    } else {
      this.id = null;
      this.value = null;
      this.display = "";
      this.formula = null;
      this.referenceCells = [];
      this.formatting = new CellFormatting();
      this.error = null;
    }
  }

  static getOrNew(cellData, id) {
    if (cellData instanceof CellData) {
      return cellData;
    }

    return new CellData(cellData || { id });
  }

  static getOrNew1(stateContentData, id) {
    if (stateContentData[id] instanceof CellData) {
      return stateContentData[id];
    }
    return new CellData({ id });
  }

  get isFormulaCell() {
    return isFormula(this.formula) && this.formula?.length > 0;
  }

  setId(id) {
    this.id = id || this.id || null;
    return this;
  }

  setValue(value) {
    if (isFormula(value)) {
      const formula = value.toUpperCase();
      this.setFormula(formula);
    } else {
      this.value = value;
      this.setDisplay();
      this.formula = "";
    }
    return this;
  }

  setReferenceCells(referenceCells) {
    this.referenceCells = referenceCells;
    return this;
  }

  setFormula(formula) {
    this.formula = formula;
    this.referenceCells = getReferenceCells(formula);
    return this;
  }

  setDisplay() {
    let display;
    display = getNumberFormattedDisplay(this.value, this.formatting);
    this.display = display;
    return this;
  }

  setFormatting(formatting) {
    this.formatting = this.formatting.setFormatting(formatting);
    this.setDisplay();
    return this;
  }

  clearFormatting() {
    this.formatting = new CellFormatting();
    return this;
  }

  clearBorderFormatting() {
    this.formatting.clearBorders();
    return this;
  }

  addBorderFormatting(borderId, borderType) {
    this.formatting = this.formatting.addBorder(borderId, borderType);
    return this;
  }

  setData(obj) {
    if (!obj) return this;
    this.setValue(obj.value);
    this.setId(obj.id);
    this.setFormatting(obj.formatting);
    return this;
  }

  evaluate(stateContentData) {
    if (this.formula) {
      const referenceCells = getReferenceCells(this.formula);
      const evaluated = evaluate(this.formula, stateContentData);
      console.log("evaluating formula", this.id);
      if (evaluated.error) {
        this.error = evaluated.error;
        this.referenceCells = [];
      } else {
        this.error = null;
        this.referenceCells = referenceCells.flat();
      }
      this.value = evaluated.value;
      this.setDisplay();
    }
    return this;
  }
}

const getNumberFormattedDisplay = (value, formatting) => {
  if (!value) return "";
  switch (formatting.numberFormat) {
    case NumberFormat.GENERAL: {
      return String(value);
    }

    case NumberFormat.NUMBER: {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) return value;
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: formatting.decimals,
        maximumFractionDigits: formatting.decimals,
      }).format(value);
    }

    case NumberFormat.CURRENCY: {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) return value;
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "AUD",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: formatting.decimals,
        maximumFractionDigits: formatting.decimals,
      }).format(value);
    }

    case NumberFormat.SHORT_DATE: {
      return new Intl.DateTimeFormat(undefined).format(value);
    }

    case NumberFormat.LONG_DATE: {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "long",
      }).format(value);
    }

    case NumberFormat.TIME: {
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(value);
    }

    case NumberFormat.PERCENTAGE: {
      return parseFloat(value / 100).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: formatting.decimals,
      });
    }

    case NumberFormat.TEXT:
    default: {
      return String(value);
    }
  }
};

const processMatches = (str, reg, formulaCreator, zeroValue) => {
  const matches = [...str.matchAll(reg)];
  const referenceCells = matches.map(([_, match]) =>
    match
      .split(",")
      .map((it) =>
        it.includes(":")
          ? CellRange.createFlat(it.split(":")[0], it.split(":")[1]).cellIds
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

const replaceFormulaWithValues = (str, stateContentData, blankValue) => {
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
    (acc, cell) =>
      acc.replaceAll(cell, `(${stateContentData[cell]?.value || blankValue})`),
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

export const evaluate = (str, stateContent) => {
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

export function getReferenceCells(formula) {
  const cells = formula.toUpperCase().match(/([a-z]+[0-9]+)/gi) || [];
  const cellRanges =
    formula.toUpperCase().match(/([a-z]+[0-9]+):([a-z]+[0-9]+)/gi) || [];

  // Expand cell ranges into individual cells
  const expandedRanges = cellRanges
    .map((range) => {
      const [start, end] = range.split(":");
      return CellRange.createFlat(start, end).cellIds;
    })
    .flat();

  // Combine all cell references without duplicates
  return [...new Set(expandedRanges.concat(cells))].flat();
}

export function getFormulaTrackedCells(formula, stateFormulaTrackedCells) {
  const referenceCells = getReferenceCells(formula);

  const formulaTrackedCells = [
    ...new Set(referenceCells.concat(stateFormulaTrackedCells)),
  ];
  return formulaTrackedCells;
}
