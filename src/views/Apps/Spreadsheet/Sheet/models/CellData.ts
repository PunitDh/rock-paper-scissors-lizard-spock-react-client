import { cellSorter, isFormula } from "../utils/cellUtils";
import CellRange from "./CellRange";
import CellFormatting from "./CellFormatting";
import { BorderType, NumberFormat } from "../components/Toolbar/constants";
import { isString } from "lodash";
import { isFalsy, isNumber } from "../../../../../utils";
import StateContentData from "./StateContentData";
import { CellFormula, CellValue } from "../types";
import SetExtended, { setOf } from "../../../../../utils/Set";

type CellDataShape = {
  id: string | null;
  value?: CellValue;
  formula?: CellFormula;
  referenceCells?: SetExtended<string>;
  display?: string;
  formatting?: CellFormatting;
  error?: string | null;
};

export default class CellData {
  id: string | null;
  value: CellValue;
  previousValue: CellValue;
  formula: CellFormula;
  previousFormula: CellFormula;
  referenceCells: SetExtended<string>;
  display: string;
  formatting: CellFormatting;
  error: string | null;
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
  constructor({
    id = null,
    value = null,
    formula = null,
    referenceCells = setOf<string>(),
    display = "",
    formatting = new CellFormatting(),
    error = null,
  }: CellDataShape) {
    this.id = id;
    this.value = value;
    this.previousValue = value;
    this.formula = formula;
    this.previousFormula = formula;
    this.referenceCells = Array.isArray(referenceCells)
      ? new SetExtended(referenceCells)
      : referenceCells;
    this.display = display;
    this.formatting = formatting;
    this.error = error;
  }

  /**
   * Retrieves an existing `CellData` instance from state or creates a new one.
   *
   * @param {Object} stateContentData - The state containing cell data instances.
   * @param {string} id - The ID for retrieving or creating a `CellData` instance.
   * @returns {CellData} An existing or newly created `CellData` instance.
   */
  static getOrNew(stateContentData: StateContentData, id: string): CellData {
    if (stateContentData[id] instanceof CellData) {
      return new CellData(stateContentData[id]);
    }
    return new CellData({ ...stateContentData[id], id });
  }

  /**
   * Determines if the cell contains a formula.
   *
   * @returns {boolean} True if the cell contains a formula, otherwise false.
   */
  get isFormulaCell(): boolean {
    return Boolean(isFormula(this.formula) && this.formula?.length! > 0);
  }

  get hasChanged(): Boolean {
    return (
      (Boolean(this?.value && this?.previousValue) &&
        this?.value !== this?.previousValue) ||
      (Boolean(this?.formula && this?.previousFormula) &&
        this?.previousFormula !== this?.formula)
    );
  }

  isNumber() {
    return isNumber(this.value);
  }

  isEmpty() {
    return this.value && String(this.value).trim().length < 1;
  }

  isNotEmpty() {
    return this.value && String(this.value).trim().length > 0;
  }

  /**
   * Sets the ID of the cell.
   *
   * @param {string} id - The ID to set.
   * @returns {CellData} The current `CellData` instance for chaining.
   */
  setId(id: string): CellData {
    this.id = id || this.id || null;
    return this;
  }

  setValue(value: string | null): CellData {
    if (isFormula(value)) {
      const formula = String(value).toUpperCase();
      this.setFormula(formula);
    } else {
      this.previousValue = this.value;
      this.value = value;
      this.setDisplay();
      this.formula = null;
      this.referenceCells = setOf<string>();
    }
    return this;
  }

  setReferenceCells(referenceCells: SetExtended<string>): CellData {
    this.referenceCells = referenceCells;
    return this;
  }

  setFormula(formula: string): CellData {
    this.previousFormula = this.formula;
    this.formula = formula;
    this.referenceCells = getReferenceCells(formula);
    return this;
  }

  setDisplay(): CellData {
    let display: string;
    display = getNumberFormattedDisplay(this.value, this.formatting);
    this.display = display;
    return this;
  }

  setFormatting(formatting: CellFormatting): CellData {
    this.formatting = this.formatting.setFormatting(formatting);
    this.setDisplay();
    return this;
  }

  clearFormatting(): CellData {
    this.formatting = new CellFormatting();
    this.setDisplay();
    return this;
  }

  clearBorderFormatting(): CellData {
    this.formatting.clearBorders();
    return this;
  }

  addBorderFormatting(borderId: string, borderType: BorderType): CellData {
    this.formatting = this.formatting.addBorder(borderId, borderType);
    return this;
  }

  setData(obj: {
    value: string | null;
    id: string;
    formatting: CellFormatting;
  }) {
    if (!obj) return this;
    this.setValue(obj.value);
    this.setId(obj.id);
    this.setFormatting(obj.formatting);
    return this;
  }

  evaluate(stateContentData: StateContentData): CellData {
    if (this.formula) {
      const referenceCells = getReferenceCells(this.formula);
      const evaluated = evaluate(
        this.formula.replace("=", ""),
        stateContentData,
      );

      if (evaluated.error) {
        this.error = evaluated.error;
        // this.referenceCells = [];
      } else {
        this.error = null;
      }
      this.referenceCells = referenceCells;
      this.previousValue = this.value;
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
const getNumberFormattedDisplay = (
  value: CellValue,
  formatting: CellFormatting,
): string => {
  if (isFalsy(value)) return "";
  switch (formatting.numberFormat) {
    case NumberFormat.GENERAL: {
      return String(value);
    }

    case NumberFormat.NUMBER: {
      const parsed = value && parseFloat(String(value));
      if (!isNumber(parsed)) return String(value);
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: formatting.decimals,
        maximumFractionDigits: formatting.decimals,
      }).format(Number(value));
    }

    case NumberFormat.CURRENCY: {
      const parsed = parseFloat(String(value));
      if (isNaN(parsed)) return String(value);
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "AUD",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: formatting.decimals,
        maximumFractionDigits: formatting.decimals,
      }).format(Number(value));
    }

    case NumberFormat.SHORT_DATE: {
      return new Intl.DateTimeFormat(undefined).format(Number(value));
    }

    case NumberFormat.LONG_DATE: {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "long",
      }).format(Number(value));
    }

    case NumberFormat.TIME: {
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(Number(value));
    }

    case NumberFormat.PERCENTAGE: {
      return Number(Number(value) / 100).toLocaleString(undefined, {
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

const processVLookup = (
  str: string,
  reg: RegExp,
  formulaCreator: Function,
  zeroValue: undefined | null | 0,
) => {
  const matches = [...str.matchAll(reg)];
  const referenceCells = matches.map(([_, match]) =>
    match.split(",").map((it) => {
      const [rangeStart, rangeEnd] = it.split(":");
      const range = CellRange.createVerticalSliced(rangeStart, rangeEnd);
      return it.includes(":") ? range.cellIds : it;
    }),
  );

  return referenceCells.map((it, idx) => ({
    [matches[idx][0]]: formulaCreator(it),
    zeroValue,
  }));
};

const processLookup = (
  str: string,
  reg: RegExp,
  formulaCreator: Function,
  zeroValue: undefined | null | 0,
) => {
  const matches = [...str.matchAll(reg)];
  const referenceCells = matches.map(([_, match]) =>
    match
      .split(",")
      .map((it: string) =>
        it.includes(":")
          ? CellRange.createFlat(it.split(":")[0], it.split(":")[1]).cellIds
          : it,
      ),
  );

  return referenceCells.map((it, idx) => ({
    [matches[idx][0]]: formulaCreator(it),
    zeroValue,
  }));
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
const processMatches = (
  str: string,
  reg: RegExp,
  formulaCreator: Function,
  zeroValue: undefined | null | 0,
): Array<any> => {
  const matches = [...str.matchAll(reg)];
  const referenceCells = matches.map(([_, match]) =>
    match
      .split(",")
      .map((it) =>
        it.includes(":")
          ? CellRange.createFlat(it.split(":")[0], it.split(":")[1]).cellIds
          : it,
      )
      .flat(),
  );

  return referenceCells.map((it, idx) => ({
    [matches[idx][0]]: formulaCreator(it),
    zeroValue,
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
const replaceFormulaWithValues = (
  str: string,
  stateContentData: StateContentData,
  blankValue: undefined | null | 0,
): { string: string; referenceCells: SetExtended<string> } => {
  const cellReg = /([A-Z]\d+)/g;
  const cellMatches = [...new Set([...str.matchAll(cellReg)].flat())].sort(
    cellSorter,
  );

  const referenceCells = setOf<string>();

  const string = cellMatches.reduce((acc, cell) => {
    const cellDataValue = stateContentData[cell]?.value;
    referenceCells.add(cell);
    return acc.replaceAll(
      cell,
      isNumber(cellDataValue)
        ? `(${cellDataValue || blankValue})`
        : isString(cellDataValue)
        ? `'${cellDataValue}'`
        : `null`,
    );
  }, str);

  return { string, referenceCells };
};

// Core evaluation functions
/**
 * Evaluates common spreadsheet formulas like SUM, AVERAGE, COUNT.
 *
 * @param {string} cellValue - The formula string to evaluate.
 * @returns {Array} An array of objects containing parsed formulas and reference cells.
 */
const evaluateFormula = (cellValue: string): Array<any> => {
  let str = cellValue.toUpperCase();

  const sumMatches = processMatches(
    str,
    /(?:SUM)\(([^)]+)\)/gi,
    (it: string[]) => `(${it.join("+")})`,
    null,
  );

  const avgMatches = processMatches(
    str,
    /(?:AVERAGE)\(([^)]+)\)/gi,
    (it: string[]) =>
      `((${it.join("+")})/${it.filter((it) => it !== null).length})`,
    null,
  );

  const countMatches = processMatches(
    str,
    /(?:COUNT)\(([^)]+)\)/gi,
    (it: string[]) =>
      `(${it.map((i: string) => `Number(!isNaN(${i}))`).join("+")})`,
    undefined,
  );

  const lookupMatches = processLookup(
    str,
    /(?:\bLOOKUP)\(([^)]+)\)/gi,
    (it: string[][]) =>
      `[${it[2].map((i) => `${i}`).join(",")}][[${it[1]
        .map((i) => `${i}`)
        .join(",")}].findIndex(it => it == ${it[0]})]`,
    null,
  );

  const vLookupMatches = processVLookup(
    str,
    /(?:\bVLOOKUP)\(([^)]+)\)/gi,
    (it: string[][][]) => {
      const cell = it[0];
      const range = `[${it[1].map((it) => `[${it.join(",")}]`).join(",")}]`;
      const colNumber = it[2];
      return `${range}[${colNumber}-1][${range}[0].findIndex(it => it == ${cell})]`;
    },
    null,
  );

  return [
    sumMatches,
    avgMatches,
    countMatches,
    lookupMatches,
    vLookupMatches,
  ].flat();
};

type Evaluated = {
  value: string;
  referenceCells: SetExtended<string>;
  error?: string | undefined;
  parsedInput: string;
};

type ReplacedString = {
  stringValue: string;
  referenceCells: SetExtended<string>;
};

/**
 * Parses and evaluates a formula string. Replaces formulas with actual values and evaluates the resulting expression.
 *
 * @param {string} str - The formula string to evaluate.
 * @param {Object} stateContentData - An object containing cell values.
 * @returns {Object} An object containing the evaluated result and reference cells.
 */
export const evaluate = (
  str: string,
  stateContentData: StateContentData,
): Evaluated => {
  const parsedStrings = evaluateFormula(str);

  const substitutedValues = parsedStrings.map((it) => {
    const key = Object.keys(it)[0];
    const replaced = replaceFormulaWithValues(
      Object.values(it)[0] as string,
      stateContentData,
      it.zeroValue,
    );
    return {
      [key]: {
        value: replaced.string,
        referenceCells: replaced.referenceCells,
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

  const replacedString = evaluatedExpressions.reduce<ReplacedString>(
    (acc, cur) => {
      const curKey = Object.keys(cur)[0] as string;
      const curValue: Evaluated = cur[curKey];
      [...curValue.referenceCells].forEach((cell) => {
        acc.referenceCells.add(cell);
      });
      return {
        stringValue: acc.stringValue.replaceAll(
          curKey,
          isNaN(parseFloat(curValue.value))
            ? `"${curValue.value}"`
            : `(${curValue.value})`,
        ),
        referenceCells: acc.referenceCells,
      };
    },
    {
      stringValue: str.toUpperCase(),
      referenceCells: setOf<string>(),
    },
  );

  const substitutedString = replaceFormulaWithValues(
    replacedString.stringValue,
    stateContentData,
    0,
  );

  const finalEvaluation: EvaluatedString = evaluateExpression(
    substitutedString.string,
  );

  return {
    value: finalEvaluation.value,
    parsedInput: finalEvaluation.parsedInput,
    error: finalEvaluation.error,
    referenceCells: replacedString.referenceCells.mergeWith(
      substitutedString.referenceCells,
    ),
  };
};

type EvaluatedString = {
  value: string;
  parsedInput: string;
  error?: string;
};

/**
 * Parses and evaluates an input expression. Supports various mathematical operations and functions.
 *
 * @param {string} input - The mathematical expression to evaluate.
 * @returns {Object} An object containing the evaluated value, parsed input, and any error if occurred.
 */
const evaluateExpression = (input: string): EvaluatedString => {
  let parsedInput: string = input;
  let value: string;

  try {
    parsedInput = input
      .replaceAll("%", "/100")
      .replaceAll("^", "**")
      // .replaceAll(/(\b)e(\b|\B)/g, "1e0")
      .replaceAll(/(\d+)(?=\()/g, "$&*")
      .replaceAll(/(?<=\))(\d+)/g, "*$&")
      .replaceAll(
        /(\d+|\))(?=\s*(atan|acos|asin|sin|cos|tan|log|ln|Rnd|E|π))/gi,
        "$&* ",
      )
      .replaceAll(
        /(\d+)(!+)/g,
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))",
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
        "(Array($1).fill(0).map((_,i)=>i+1).reduce((a,c)=>a*c,1))",
      )
      .replaceAll(/(asin|acos|atan)/gi, `Math.$1(`)
      .replaceAll(/(sin|cos|tan)/gi, `Math.$1(`)
      .replaceAll(/(?:log)\(([^)]*)(\)|)/g, "Math.log10($1)")
      .replaceAll(/(?:ln)\(([^)]*)(\)|)/g, " Math.log($1)")
      .replaceAll(")(", ")*(")
      .replaceAll(/(\d+|\))Math/g, "$1*Math")
      .replaceAll(")Math", ")*Math");

    const openBrackets: number = parsedInput.match(/\(/g)?.length || 0;
    const closeBrackets: number = parsedInput.match(/\)/g)?.length || 0;
    const diffBrackets: number = openBrackets - closeBrackets;

    if (diffBrackets > 0) parsedInput += ")".repeat(diffBrackets);

    value = eval(parsedInput);

    if (parsedInput === "null") value = "0";
    // value = String(Math.round(eval(parsedInput) * 10 ** 13) / 10 ** 13);

    return { value, parsedInput };
  } catch (error: unknown) {
    return { value: "Syntax Error", parsedInput, error: error as string };
  }
};

/**
 * Extracts cell references from a formula.
 *
 * @param {string} formula - The formula string to extract cell references from.
 * @returns {Array} An array of cell references.
 */
export function getReferenceCells(formula: string): SetExtended<string> {
  const cells = formula.toUpperCase().match(/([a-z]+[0-9]+)/gi) || [];
  const cellRanges =
    formula.toUpperCase().match(/([a-z]+[0-9]+):([a-z]+[0-9]+)/gi) || [];

  // Expand cell ranges into individual cells
  const expandedRanges = cellRanges
    .map((range: string) => {
      const [start, end] = range.split(":");
      return CellRange.createFlat(start, end).cellIds;
    })
    .flat();

  // Combine all cell references without duplicates
  return setOf<string>(expandedRanges.concat(cells).flat());
}

/**
 * Combines cell references from a formula and state-tracked cells.
 * Helps track which cells a formula is dependent on.
 *
 * @param {string} formula - The formula string to extract cell references from.
 * @param {Array} stateFormulaTrackedCells - Previously tracked cell references.
 * @returns {Array} An array of combined cell references.
 */
export function getFormulaTrackedCells(
  formula: string,
  stateFormulaTrackedCells: SetExtended<string>,
): SetExtended<string> {
  const referenceCells = getReferenceCells(formula);
  const formulaTrackedCells = setOf<string>(
    referenceCells.mergeWith(stateFormulaTrackedCells),
  );
  return formulaTrackedCells;
}
