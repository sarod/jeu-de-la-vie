import { makeCellStateMatrix } from './makeCellStateMatrix';

export function adaptMatrixSize(cellStateMatrix: boolean[][], rowCount: number, columnCount: number): boolean[][] {
  return makeCellStateMatrix(rowCount, columnCount, (rowIdx, columnIdx) => {
    if (rowIdx >= cellStateMatrix.length) {
      return false;
    } else {
      const row = cellStateMatrix[rowIdx];
      if (columnIdx >= row.length) {
        return false;
      } else {
        // Keep existing value
        return row[columnIdx];
      }
    }
  });
}
