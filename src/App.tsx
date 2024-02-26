import './App.css'
import { Grid } from './components/Grid';
import { makeCellStateMatrix, makeRandomCellStateMatrix } from './game/makeCellStateMatrix';
import { useState, useEffect } from 'react';
import { playIteration } from './game/playIteration';
import { toggleCellState } from './game/toggleCellState';

function App() {
  const [lineCount] = useState(50);
  const [rowCount] = useState(50);
  const [cellStateMatrix, setCellStateMatrix] = useState(() => makeRandomCellStateMatrix(lineCount, rowCount));
  const [vitesse, setVitesse] = useState(1);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      return;
    }
    const interval = setInterval(() => {
      setCellStateMatrix(playIteration(cellStateMatrix));
    },
      1000 / vitesse);
    return () => clearInterval(interval);
  }, [cellStateMatrix, vitesse, pause]);

  return (
    <>
      <h1>Le Jeu de la vie</h1>    
      <div>
        Grille Aéatoire (% vivante):
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => Math.random() < 0.90))}>90%</button>
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => Math.random() < 0.75))}>75%</button>
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => Math.random() < 0.50))}>50%</button>
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => Math.random() < 0.30))}>25%</button>
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => Math.random() < 0.10))}>10%</button>
        <button onClick={() => setCellStateMatrix(makeCellStateMatrix(lineCount, rowCount, () => false))}>0%</button>
      </div>
      <div>
        <label htmlFor="vitesse">
          Vitesse ({vitesse}x):
        </label><input id="vitesse" type="range"
          onChange={(e) => setVitesse(Number(e.target.value))}
          min={0.5}
          max={20}
          step={0.5}
          value={vitesse}></input>
        <button aria-label="Démarrer/Arrêter" title="Démarrer/Arrêter" onClick={() => setPause(!pause)}>{pause ? "▶️" : "⏸️"}</button>
        {pause ? <button aria-label="Démarrer pas a pas" title="Démarrer pas à pas" onClick={() => setCellStateMatrix(playIteration(cellStateMatrix))}>⏯️</button> : ""}

      </div>
      <Grid
        cellules={cellStateMatrix} cellSize={8}
        onCellClick={(idxLigne, idxColonne) => setCellStateMatrix(toggleCellState(cellStateMatrix, idxLigne, idxColonne))} />

    </>
  )
}

export default App
