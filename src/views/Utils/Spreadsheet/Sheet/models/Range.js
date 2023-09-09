import Cell from "./Cell";

export default class Range {
  constructor(cells, ids, rows, columns) {
    this.cells = cells;
    this.cellIds = [...new Set(ids)];
    this.rows = [...new Set(rows)];
    this.columns = [...new Set(columns)];
  }

  static createFlat(start, end) {
    const { minC, maxC, minR, maxR } = Range.getCellMinMax([start, end]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
    for (let col = minC; col <= maxC; col++) {
      for (let row = minR; row <= maxR; row++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        columns.push(column);
        rows.push(row);
        ids.push(id);
        cells.push(new Cell(id));
      }
    }
    // return cells;
    return new Range(cells, ids, rows, columns);
  }

  static create(start, end) {
    const { minC, maxC, minR, maxR } = Range.getCellMinMax([start, end]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
    for (let row = minR; row <= maxR; row++) {
      const createdRow = [];
      const createdIds = [];
      for (let col = minC; col <= maxC; col++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        createdRow.push(new Cell(id));
        columns.push(column);
        rows.push(row);
        createdIds.push(id);
      }
      cells.push(createdRow);
      ids.push(createdIds);
    }
    // return cells;
    return new Range(cells, ids, rows, columns);
  }

  static getFormulaCellsToTrack = (stateContent) => {
    const formulae = Object.keys(stateContent)
      .filter((it) => stateContent[it].formula?.length > 0)
      .map((it) => stateContent[it].formula);

    return [
      ...new Set(
        formulae
          .map((it) => it.match(/([a-z]+[0-9]+):([a-z]+[0-9]+)/gi))
          .filter(Boolean)
          .flat()
          .map(
            (it) => Range.createFlat(it.split(":")[0], it.split(":")[1]).cellIds
          )
          .concat(formulae.map((it) => it.match(/([a-z]+[0-9]+)/gi)))
          .flat()
          .map((it) => stateContent[it]?.value || "")
      ),
    ];
  };

  static createFromCell(startCell, endCell) {
    const { minC, maxC, minR, maxR } = Range.getCellMinMax([
      startCell.id,
      endCell.id,
    ]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
    for (let row = minR; row <= maxR; row++) {
      const createdRow = [];
      const createdIds = [];
      for (let col = minC; col <= maxC; col++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        createdRow.push(new Cell(id));
        columns.push(column);
        rows.push(row);
        createdIds.push(id);
      }
      cells.push(createdRow);
      ids.push(createdIds);
    }
    // return cells;
    return new Range(cells, ids, rows, columns);
  }

  static getCellMinMax = (highlighted) => {
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
}

const getId = (id) => {
  const row = id?.match(/\d+/g);
  const column = id?.match(/[A-Z]/g);
  const columnCharCode = id?.match(/[A-Z]/g);

  if (row && column && columnCharCode)
    return {
      row: row[0],
      column: column[0],
      columnCharCode: columnCharCode[0].charCodeAt(0),
    };
  return {};
};
