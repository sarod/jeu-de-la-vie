export function copyMatrix(cellules: boolean[][]) {
  return JSON.parse(JSON.stringify(cellules));
}
