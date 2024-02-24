import { creerCopie } from './creerCopie';

export function basculerCellule(idxLigne: number, idxColonne: number, cellules: boolean[][]) {
  const copie = creerCopie(cellules);
  copie[idxLigne][idxColonne] = !copie[idxLigne][idxColonne];
  return copie;
}
