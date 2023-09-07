export default class CellContent {
  constructor(obj) {
    if (obj) {
      this.value = obj.value || null;
      this.formula = obj.formula || null;
      this.referenceCells = obj.referenceCells || [];
      this.display = obj.display || null;
      this.formatting = obj.formatting || {};
    } else {
      this.value = null;
      this.display = null;
      this.formula = null;
      this.referenceCells = [];
      this.formatting = {};
    }
  }

  withFormatting(formatting) {
    this.formatting = {
      ...this.formatting,
      ...formatting,
    };
    return this;
  }
}
