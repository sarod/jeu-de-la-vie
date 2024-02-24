type CelluleFn = (idxLigne: number, idxColonne: number) => boolean;

export function creerGrille(nbLignes: number, nbColonnes: number, fonctionCellule: CelluleFn): boolean[][] {
  const grille: boolean[][] = [];
  for (let idxLigne = 0; idxLigne < nbLignes; idxLigne++) {
    const ligne: boolean[] = [];
    for (let idxColonne = 0; idxColonne < nbColonnes; idxColonne++) {
      ligne[idxColonne] = fonctionCellule(idxLigne, idxColonne);
    }
    grille[idxLigne] = ligne;
  }
  return grille;
}

export function grilleAleatoire(nbLignes: number, nbColonnes: number): boolean[][] {
 return creerGrille(nbLignes, nbColonnes, () => Math.random() < 0.5);
}