export default class Cell {
  constructor(id) {
    this.id = id;
    const rowMatch = id?.match(/\d+/g);
    const columnMatch = id?.match(/[A-Z]/g);
    const columnCharCodeMatch = id?.match(/[A-Z]/g);
    if (
      !rowMatch ||
      !columnMatch ||
      !columnCharCodeMatch ||
      !rowMatch[0] ||
      !columnMatch[0] ||
      !columnCharCodeMatch[0]
    ) {
      throw new Error(`Invalid cell id: ${id}`);
    }
    this.row = Number(rowMatch[0]);
    this.column = columnMatch[0];
    this.columnCharCode = columnCharCodeMatch[0];
  }
}
