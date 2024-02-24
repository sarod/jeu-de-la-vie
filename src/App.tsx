import './App.css'
import { Grille } from './components/Grille';
import { creerGrille, grilleAleatoire } from './jeu/grilleAleatoire';
import { useState, useEffect } from 'react';
import { simuleUnTour } from './jeu/simuleUnTour';
import { basculerCellule } from './jeu/basculerCellule';

function App() {
  const [nbLigne] = useState(50);
  const [nbColonne] = useState(50);
  const [cellules, setCellules] = useState(() => grilleAleatoire(nbLigne, nbColonne));
  const [vitesse, setRange] = useState(1000);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      return;
    }
    const interval = setInterval(() => {
      setCellules(simuleUnTour(cellules));
    },
      2000 - vitesse);
    return () => clearInterval(interval);
  }, [cellules, vitesse, pause]);

  return (
    <>
      <h1>Le Jeu de la vie</h1>
      <div>
        <button onClick={() => setCellules(grilleAleatoire(nbLigne, nbColonne))}>Aléatoire</button>
        <button onClick={() => setCellules(creerGrille(nbLigne, nbColonne, () => false))}>Grille Morte</button>
        <button onClick={() => setCellules(creerGrille(nbLigne, nbColonne, () => true))}>Grille Vivante</button>
        <button onClick={() => setCellules(creerGrille(nbLigne, nbColonne, (idxLigne) => idxLigne % 2 == 0))}>1 Ligne sur 2</button>
        <button onClick={() => setCellules(creerGrille(nbLigne, nbColonne, (_, idxColonne) => idxColonne % 2 == 0))}>1 Colonne sur 2</button>
      </div>
      <div><button onClick={() => setPause(!pause)}>{pause ? "Démarrer" : "Pause"}</button>
        Vitesse: <input type="range"
          onChange={(e) => setRange(Number(e.target.value))}
          min={100}
          max={2000}
          value={vitesse}></input>
      </div>
      <Grille
        cellules={cellules} cellSize={8}
        onCellClick={(idxLigne, idxColonne) => setCellules(basculerCellule(idxLigne, idxColonne, cellules))} />


    </>
  )
}

export default App
