export function creerCopie(cellules: boolean[][]) {
  return JSON.parse(JSON.stringify(cellules));
}
