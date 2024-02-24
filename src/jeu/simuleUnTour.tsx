import { creerCopie } from "./creerCopie";
function nombreDeVivantesAutour(cellules: boolean[][], idxLigne: number, idxColonne: number): number {
  const nbLigne = cellules.length;
  const nbColonne = cellules[0].length;
  let idxColonneDroite = idxColonne + 1;
  if (idxColonneDroite == nbColonne) {
    idxColonneDroite = 0;
  }
  let idxColonneGauche = idxColonne - 1;
  if (idxColonneGauche == -1) {
    idxColonneGauche = nbColonne - 1;
  }
  let idxLigneHaut = idxLigne - 1;
  if (idxLigneHaut == -1) {
    idxLigneHaut = nbLigne - 1;
  }
  let idxLigneBas = idxLigne + 1;
  if (idxLigneBas == nbLigne) {
    idxLigneBas = 0;
  }

  const celluleDroite = cellules[idxLigne][idxColonneDroite] ? 1 : 0;
  const celluleBasDroite = cellules[idxLigneBas][idxColonneDroite] ? 1 : 0;
  const celluleBas = cellules[idxLigneBas][idxColonne] ? 1 : 0;
  const celluleBasGauche = cellules[idxLigneBas][idxColonneGauche] ? 1 : 0;

  const celluleGauche = cellules[idxLigne][idxColonneGauche] ? 1 : 0;
  const celluleHautGauche = cellules[idxLigneHaut][idxColonneGauche] ? 1 : 0;
  const celluleHaut = cellules[idxLigneHaut][idxColonne] ? 1 : 0;
  const celluleHautDroite = cellules[idxLigneHaut][idxColonneDroite] ? 1 : 0;

  const nbVivantes = celluleDroite + celluleBasDroite + celluleBas + celluleBasGauche + celluleGauche
    + celluleHautGauche + celluleHaut + celluleHautDroite;
  return nbVivantes;
}
export function simuleUnTour(cellules: boolean[][]): boolean[][] {
  const copie = creerCopie(cellules);

  for (let idxLigne = 0; idxLigne < cellules.length; idxLigne++) {
    const ligne = cellules[idxLigne];
    for (let idxColonne = 0; idxColonne < ligne.length; idxColonne++) {
      const vivante = cellules[idxLigne][idxColonne];
      const nombreVoisineVivante = nombreDeVivantesAutour(cellules, idxLigne, idxColonne);
      const nouveauVivante = calculNouvelEtatCellule(vivante, nombreVoisineVivante);

      //console.log({ idxLigne, idxColonne, vivante, nombreVoisineVivante, nouveauVivante });
      copie[idxLigne][idxColonne] = nouveauVivante;
    }
  }
  return copie;
}

function calculNouvelEtatCellule(vivante: boolean, nombreVoisineVivante: number): boolean {
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
