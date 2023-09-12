import { isFormula } from "../utils/cellUtils";
import CellRange from "./CellRange";
import CellFormatting from "./CellFormatting";
import { NumberFormat } from "../components/Toolbar/constants";

export default class CellData {
  /**
   * Creates an instance of CellData.
   *
   * @param {Object} [obj] - The initial values for the cell data.
   * @param {string} [obj.id] - The ID of the cell.
   * @param {string|number} [obj.value] - The value of the cell.
   * @param {string} [obj.formula] - The formula of the cell (if it contains one).
   * @param {Array<string>} [obj.referenceCells] - The cells referenced in the formula.
   * @param {string} [obj.display] - The formatted display value of the cell.
   * @param {Object} [obj.formatting] - The cell formatting attributes.
   * @param {string} [obj.error] - Any error related to the cell.
   */
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

  /**
   * Retrieves an existing `CellData` instance or creates a new one.
   *
   * @param {CellData|Object} cellData - An existing `CellData` instance or an object with cell data properties.
   * @param {string} id - The ID for the new `CellData` instance if one is created.
   * @returns {CellData} An existing or newly created `CellData` instance.
   */
  static getOrNew(cellData, id) {
    if (cellData instanceof CellData) {
      return cellData;
    }

    return new CellData(cellData || { id });
  }

  /**
   * Retrieves an existing `CellData` instance from state or creates a new one.
   *
   * @param {Object} stateContentData - The state containing cell data instances.
   * @param {string} id - The ID for retrieving or creating a `CellData` instance.
   * @returns {CellData} An existing or newly created `CellData` instance.
   */
  static getOrNew1(stateContentData, id) {
    if (stateContentData[id] instanceof CellData) {
      return stateContentData[id];
    }
    return new CellData({ id });
  }

  /**
   * Determines if the cell contains a formula.
   *
   * @returns {boolean} True if the cell contains a formula, otherwise false.
   */
  get isFormulaCell() {
    return isFormula(this.formula) && this.formula?.length > 0;
  }

  /**
   * Sets the ID of the cell.
   *
   * @param {string} id - The ID to set.
   * @returns {CellData} The current `CellData` instance for chaining.
   */
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

/**
 * Formats a given value based on the specified number formatting options.
 *
 * @param {Number} value - The value to format.
 * @param {Object} formatting - The formatting options object.
 * @param {string} formatting.numberFormat - The desired number format. Can be one of `NumberFormat.GENERAL`, `NumberFormat.NUMBER`, `NumberFormat.CURRENCY`, `NumberFormat.SHORT_DATE`, `NumberFormat.LONG_DATE`, `NumberFormat.TIME`, `NumberFormat.PERCENTAGE`, or `NumberFormat.TEXT`.
 * @param {number} [formatting.decimals] - The number of decimal places to display (relevant for some number formats).
 * @returns {string} The formatted value as a string.
 */
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

/**
 * Processes a given string for matches with a provided regular expression.
 * Extracts and formats matched substrings according to a provided formula.
 *
 * @param {string} str - The input string to process.
 * @param {RegExp} reg - The regular expression to use for matching.
 * @param {Function} formulaCreator - Function to format the matched substrings.
 * @param {undefined | null} zeroValue - What to treat a blank value as.
 * @returns {Array} An array of objects containing the matched formulas and reference cells.
 */
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

/**
 * Replaces cell formulas in a string with their actual values.
 *
 * @param {string} str - The formula string to process.
 * @param {Object} stateContentData - An object containing cell values.
 * @param {*} blankValue - Default value to use when cell value is not found.
 * @returns {string} The processed string with replaced cell values.
 */
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
/**
 * Evaluates common spreadsheet formulas like SUM, AVERAGE, COUNT.
 *
 * @param {string} cellValue - The formula string to evaluate.
 * @returns {Array} An array of objects containing parsed formulas and reference cells.
 */
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

/**
 * Parses and evaluates a formula string. Replaces formulas with actual values and evaluates the resulting expression.
 *
 * @param {string} str - The formula string to evaluate.
 * @param {Object} stateContent - An object containing cell values.
 * @returns {Object} An object containing the evaluated result and reference cells.
 */
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

/**
 * Parses and evaluates an input expression. Supports various mathematical operations and functions.
 *
 * @param {string} input - The mathematical expression to evaluate.
 * @returns {Object} An object containing the evaluated value, parsed input, and any error if occurred.
 */
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

/**
 * Extracts cell references from a formula.
 *
 * @param {string} formula - The formula string to extract cell references from.
 * @returns {Array} An array of cell references.
 */
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

/**
 * Combines cell references from a formula and state-tracked cells.
 * Helps track which cells a formula is dependent on.
 *
 * @param {string} formula - The formula string to extract cell references from.
 * @param {Array} stateFormulaTrackedCells - Previously tracked cell references.
 * @returns {Array} An array of combined cell references.
 */
export function getFormulaTrackedCells(formula, stateFormulaTrackedCells) {
  const referenceCells = getReferenceCells(formula);

  const formulaTrackedCells = [
    ...new Set(referenceCells.concat(stateFormulaTrackedCells)),
  ];
  return formulaTrackedCells;
}
