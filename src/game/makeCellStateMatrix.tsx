type CellStateFn = (lineIdx: number, rowIdx: number) => boolean;

export function makeCellStateMatrix(lineCount: number, rowCount: number, cellStateFn: CellStateFn): boolean[][] {
  const matrix: boolean[][] = [];
  for (let lineIdx = 0; lineIdx < lineCount; lineIdx++) {
    const line: boolean[] = [];
    for (let columnIdx = 0; columnIdx < rowCount; columnIdx++) {
      line[columnIdx] = cellStateFn(lineIdx, columnIdx);
    }
    matrix[lineIdx] = line;
  }
  return matrix;
}

export function makeRandomCellStateMatrix(linecount: number, rowCount: number, aliveRatior: number = 0.5): boolean[][] {
 return makeCellStateMatrix(linecount, rowCount, () => Math.random() < aliveRatior);
}