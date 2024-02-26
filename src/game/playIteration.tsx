import { copyMatrix } from "./copyMatrix";

function countAliveNeighbours(cellStateMatrix: boolean[][], lineIdx: number, columnIdx: number): number {
  const lineCount = cellStateMatrix.length;
  const rowCount = cellStateMatrix[0].length;
  let idxRight = columnIdx + 1;
  if (idxRight == rowCount) {
    idxRight = 0;
  }
  let idxLeft = columnIdx - 1;
  if (idxLeft == -1) {
    idxLeft = rowCount - 1;
  }
  let idxUp = lineIdx - 1;
  if (idxUp == -1) {
    idxUp = lineCount - 1;
  }
  let idxDown = lineIdx + 1;
  if (idxDown == lineCount) {
    idxDown = 0;
  }

  const cellRight = cellStateMatrix[lineIdx][idxRight] ? 1 : 0;
  const celluleDownRight = cellStateMatrix[idxDown][idxRight] ? 1 : 0;
  const celluleDown = cellStateMatrix[idxDown][columnIdx] ? 1 : 0;
  const celluleDownLeft = cellStateMatrix[idxDown][idxLeft] ? 1 : 0;

  const celluleLeft = cellStateMatrix[lineIdx][idxLeft] ? 1 : 0;
  const celluleUpLeft = cellStateMatrix[idxUp][idxLeft] ? 1 : 0;
  const celluleUp = cellStateMatrix[idxUp][columnIdx] ? 1 : 0;
  const celluleUpRight = cellStateMatrix[idxUp][idxRight] ? 1 : 0;

  const nbVivantes = cellRight + celluleDownRight + celluleDown + celluleDownLeft + celluleLeft
    + celluleUpLeft + celluleUp + celluleUpRight;
  return nbVivantes;
}


function computeNewCellState(vivante: boolean, nombreVoisineVivante: number): boolean {
  let nouveauVivante = false;
  if (vivante && (nombreVoisineVivante == 2 || nombreVoisineVivante == 3)) {
    // Survie
    nouveauVivante = true;
  } else if (!vivante && nombreVoisineVivante == 3) {
    // Naissance
    nouveauVivante = true;
  } else {
    nouveauVivante = false;
  }
  return nouveauVivante;
}


export function playIteration(cellStateMatrix: boolean[][]): boolean[][] {
  const newCellStateMatrix = copyMatrix(cellStateMatrix);

  for (let lineIdx = 0; lineIdx < cellStateMatrix.length; lineIdx++) {
    const ligne = cellStateMatrix[lineIdx];
    for (let columnIdx = 0; columnIdx < ligne.length; columnIdx++) {
      const currentlyAlive = cellStateMatrix[lineIdx][columnIdx];
      const aliveNeighbours = countAliveNeighbours(cellStateMatrix, lineIdx, columnIdx);
      const nouveauVivante = computeNewCellState(currentlyAlive, aliveNeighbours);
      newCellStateMatrix[lineIdx][columnIdx] = nouveauVivante;
    }
  }
  return newCellStateMatrix;
}
