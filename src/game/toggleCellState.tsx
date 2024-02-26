import { copyMatrix } from './copyMatrix';

export function toggleCellState(cellStateMatrix: boolean[][], lineIdx: number, columnIdx: number) {
  const copie = copyMatrix(cellStateMatrix);
  copie[lineIdx][columnIdx] = !copie[lineIdx][columnIdx];
  return copie;
}
