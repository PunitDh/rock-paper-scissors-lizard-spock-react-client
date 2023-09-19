import { toList } from "../../../../../utils/List";
import { Sheet } from "../types";

export const reIndexSheets = (sheets: {
  [key: string]: Sheet;
}): { [key: string]: Sheet } => {
  return toList<Sheet>(Object.values(sheets))
    .sortBy((it) => it.index)
    .reduce((acc, cur, index) => {
      return {
        ...acc,
        [cur.id]: {
          ...cur, // Use the current sheet, not acc[cur.id]
          index: index + 1,
        },
      };
    }, {});
};
